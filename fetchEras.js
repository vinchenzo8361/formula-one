const fs = require('fs');

async function main() {
  const years = [];
  for (let y = 2026; y >= 1950; y--) years.push(y);
  
  const lastYearMap = {};
  
  // We will do concurrent batches of 10 to speed it up
  for (let i = 0; i < years.length; i += 10) {
    const batch = years.slice(i, i + 10);
    await Promise.all(batch.map(async (year) => {
      try {
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors.json`);
        const data = await res.json();
        const constructors = data?.MRData?.ConstructorTable?.Constructors || [];
        for (const c of constructors) {
          if (!lastYearMap[c.constructorId] || lastYearMap[c.constructorId] < year) {
            lastYearMap[c.constructorId] = year;
          }
        }
      } catch(e) {
        console.error('Error for year', year, e);
      }
    }));
  }
  
  fs.writeFileSync('src/lib/constructorEras.json', JSON.stringify(lastYearMap, null, 2));
  console.log('Done mapping eras.');
}
main();
