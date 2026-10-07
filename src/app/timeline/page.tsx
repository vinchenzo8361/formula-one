import TimelineChart from '@/components/TimelineChart';

export default async function TimelinePage() {
  // Fetch qualifying data for the base drivers
  const qualiRes = await fetch('https://api.jolpi.ca/ergast/f1/current/1/qualifying.json', { next: { revalidate: 3600 } });
  const qualiData = await qualiRes.json();
  const qualifyingResults = qualiData.MRData.RaceTable.Races[0].QualifyingResults;

  // Filter out any drivers not in this list, and get their base info
  const baseDrivers = qualifyingResults.map((qr: any) => ({
    driverId: qr.Driver.driverId,
    familyName: qr.Driver.familyName,
    constructorId: qr.Constructor.constructorId,
    qualifyingRank: parseInt(qr.position, 10),
  }));

  // Fetch full schedule
  const scheduleRes = await fetch('https://api.jolpi.ca/ergast/f1/current.json', { next: { revalidate: 3600 } });
  const scheduleData = await scheduleRes.json();
  const allRaces = scheduleData.MRData.RaceTable.Races;

  // Filter for completed races and fetch their individual results sequentially to avoid rate limiting
  const completedRacesMeta = allRaces.filter((r: any) => new Date(r.date) < new Date());
  
  const completedRaces = [];
  for (const r of completedRacesMeta) {
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/current/${r.round}/results.json`, { next: { revalidate: 3600 } }).then(res => res.json());
    if (res.MRData.RaceTable.Races[0]) {
      completedRaces.push(res.MRData.RaceTable.Races[0]);
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const completedRacesMap = new Map();
  for (const race of completedRaces) {
    completedRacesMap.set(parseInt(race.round, 10), race);
  }

  const driversMap = new Map();
  baseDrivers.forEach((d: any) => {
    driversMap.set(d.driverId, {
      ...d,
      cumulativePoints: 0,
      history: [
        { round: 0, raceName: 'Qualifying', rank: d.qualifyingRank, points: 0 }
      ]
    });
  });

  const raceTimeline = [
    { round: 0, raceName: 'Qualifying' }
  ];

  for (const race of allRaces) {
    const roundStr = race.round;
    const roundNum = parseInt(roundStr, 10);
    const raceName = race.raceName;
    raceTimeline.push({ round: roundNum, raceName });

    const completedRace = completedRacesMap.get(roundNum);
    if (completedRace) {
      // Update points for this race
      const results = completedRace.Results;
      for (const res of results) {
        const dId = res.Driver.driverId;
        if (driversMap.has(dId)) {
          const points = parseFloat(res.points);
          const driverData = driversMap.get(dId);
          driverData.cumulativePoints += points;
        }
      }

      // After adding points, determine the rank of all base drivers based on cumulativePoints
      const driversList = Array.from(driversMap.values());
      driversList.sort((a, b) => {
        // Sort by cumulative points descending
        if (b.cumulativePoints !== a.cumulativePoints) {
          return b.cumulativePoints - a.cumulativePoints;
        }
        // Fallback: stable by previous rank
        const aPrevRank = a.history[a.history.length - 1].rank;
        const bPrevRank = b.history[b.history.length - 1].rank;
        return aPrevRank - bPrevRank;
      });

      // Assign new rank
      driversList.forEach((d, index) => {
        const newRank = index + 1;
        d.history.push({
          round: roundNum,
          raceName,
          rank: newRank,
          points: d.cumulativePoints
        });
      });
    }
  }

  const graphData = {
    timeline: raceTimeline,
    drivers: Array.from(driversMap.values())
  };

  return (
    <div className="p-6 h-[calc(100vh-80px)] flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-f1-red uppercase tracking-tighter">Mimi's Timeline</h1>
      <p className="text-text-muted mb-4">Evolution of driver standings starting from the first qualifying session.</p>
      <div className="w-full flex-grow overflow-hidden bg-panel border-2 border-border rounded-xl shadow-lg relative">
        <TimelineChart graphData={graphData} />
      </div>
    </div>
  );
}
