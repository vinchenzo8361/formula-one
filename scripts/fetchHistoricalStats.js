const fs = require('fs');
const https = require('https');

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

async function fetchJson(url, retries = 3) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        if (retries > 0) {
          console.log(`Retrying ${url} (${res.statusCode})`);
          setTimeout(() => {
            fetchJson(url, retries - 1).then(resolve).catch(reject);
          }, 1000);
          return;
        }
        return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', err => {
      if (retries > 0) {
        setTimeout(() => {
          fetchJson(url, retries - 1).then(resolve).catch(reject);
        }, 1000);
      } else {
        reject(err);
      }
    });
  });
}

const drivers = {};
const constructors = {};

function initDriver(id) {
  if (!drivers[id]) drivers[id] = { wins: 0, podiums: 0, points: 0, championships: 0 };
}
function initConstructor(id) {
  if (!constructors[id]) constructors[id] = { wins: 0, podiums: 0, points: 0, championships: 0 };
}

(async () => {
  console.log('Fetching historical results for Wins and Podiums...');
  let offset = 0;
  while(true) {
    const data = await fetchJson(`${BASE_URL}/results.json?limit=100&offset=${offset}`);
    const races = data.MRData.RaceTable.Races;
    if (!races || races.length === 0) break;
    for (const race of races) {
      if (parseInt(race.season) > 2025) continue;
      for (const res of race.Results) {
        const dId = res.Driver.driverId;
        const cId = res.Constructor.constructorId;
        initDriver(dId);
        initConstructor(cId);
        
        if (res.position === '1') {
          drivers[dId].wins += 1;
          constructors[cId].wins += 1;
        } else if (res.position === '2' || res.position === '3') {
          drivers[dId].podiums += 1;
          constructors[cId].podiums += 1;
        }
      }
    }
    offset += 100;
    console.log(`Results: ${Math.min(offset, parseInt(data.MRData.total))} / ${data.MRData.total}`);
    if (offset >= parseInt(data.MRData.total)) break;
  }

  console.log('Fetching final standings for Points and Championships...');
  for (let year = 1950; year <= 2025; year++) {
    console.log(`Processing year ${year}...`);
    const dData = await fetchJson(`${BASE_URL}/${year}/driverStandings.json`);
    const dLists = dData.MRData.StandingsTable.StandingsLists;
    if (dLists && dLists.length > 0) {
      for (const standing of dLists[0].DriverStandings) {
        const dId = standing.Driver.driverId;
        initDriver(dId);
        drivers[dId].points += parseFloat(standing.points) || 0;
        if (standing.position === '1') {
          drivers[dId].championships += 1;
        }
      }
    }
    
    if (year >= 1958) {
      const cData = await fetchJson(`${BASE_URL}/${year}/constructorStandings.json`);
      const cLists = cData.MRData.StandingsTable.StandingsLists;
      if (cLists && cLists.length > 0) {
        for (const standing of cLists[0].ConstructorStandings) {
          const cId = standing.Constructor.constructorId;
          initConstructor(cId);
          constructors[cId].points += parseFloat(standing.points) || 0;
          if (standing.position === '1') {
            constructors[cId].championships += 1;
          }
        }
      }
    }
  }

  // Round points to 1 decimal to fix floating point math
  for (const d of Object.values(drivers)) d.points = Math.round(d.points * 10) / 10;
  for (const c of Object.values(constructors)) c.points = Math.round(c.points * 10) / 10;

  fs.writeFileSync('src/lib/historicalData.json', JSON.stringify({ drivers, constructors }, null, 2));
  console.log('Saved to src/lib/historicalData.json');
})();
