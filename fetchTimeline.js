const fs = require('fs');
async function run() {
  try {
    const scheduleRes = await fetch('https://api.jolpi.ca/ergast/f1/current.json');
    const scheduleData = await scheduleRes.json();
    const allRaces = scheduleData.MRData.RaceTable.Races;
    const completedRacesMeta = allRaces.filter(r => new Date(r.date) < new Date());
    
    const completedRaces = [];
    for (const r of completedRacesMeta) {
      let response = await fetch('https://api.jolpi.ca/ergast/f1/current/' + r.round + '/driverStandings.json');
      if (!response.ok) {
        await new Promise(res => setTimeout(res, 2000));
        response = await fetch('https://api.jolpi.ca/ergast/f1/current/' + r.round + '/driverStandings.json');
      }
      if (response.ok) {
        const text = await response.text();
        const res = JSON.parse(text);
        if (res?.MRData?.StandingsTable?.StandingsLists?.[0]) {
          completedRaces.push({
            round: r.round,
            raceName: r.raceName,
            DriverStandings: res.MRData.StandingsTable.StandingsLists[0].DriverStandings
          });
          console.log('Fetched ' + r.raceName);
        }
      }
      await new Promise(res => setTimeout(res, 500)); // be nice to api
    }
    
    fs.mkdirSync('src/data', { recursive: true });
    fs.writeFileSync('src/data/timelineStandings2026.json', JSON.stringify(completedRaces, null, 2));
    console.log('Successfully saved to src/data/timelineStandings2026.json');
  } catch(e) {
    console.error(e);
  }
}
run();
