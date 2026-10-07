import TimelineChart from '@/components/TimelineChart';

export default async function TimelinePage() {
  // Fetch qualifying data for the base drivers
  const qualiRes = await fetch('https://api.jolpi.ca/ergast/f1/current/1/qualifying.json', { next: { revalidate: 3600 } });
  if (!qualiRes.ok) return <div className='container p-8'>API Error. Please try again later.</div>;
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
  if (!scheduleRes.ok) return <div className='container p-8'>API Error. Please try again later.</div>;
  const scheduleData = await scheduleRes.json();
  const allRaces = scheduleData.MRData.RaceTable.Races;

  // Filter for completed races and fetch their individual results sequentially to avoid rate limiting
  const completedRacesMeta = allRaces.filter((r: any) => new Date(r.date) < new Date());
  
        const completedRaces = [];
  for (const r of completedRacesMeta) {
    try {
      let response = await fetch('https://api.jolpi.ca/ergast/f1/current/' + r.round + '/driverStandings.json', { next: { revalidate: 3600 } });
      if (!response.ok) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        response = await fetch('https://api.jolpi.ca/ergast/f1/current/' + r.round + '/driverStandings.json', { next: { revalidate: 3600 } });
      }
      if (response.ok) {
        const text = await response.text();
        try {
          const res = JSON.parse(text);
          if (res?.MRData?.StandingsTable?.StandingsLists?.[0]) {
            completedRaces.push({
              round: r.round,
              raceName: r.raceName,
              DriverStandings: res.MRData.StandingsTable.StandingsLists[0].DriverStandings
            });
          }
        } catch (err) {
          console.warn('JSON parse failed for round ' + r.round);
        }
      } else {
        console.warn('Failed to fetch round ' + r.round);
      }
    } catch (err) {
      console.warn('Network error for round ' + r.round);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
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

  for (const race of completedRaces) {
    const roundNum = parseInt(race.round, 10);
    raceTimeline.push({ round: roundNum, raceName: race.raceName });

    for (const standing of race.DriverStandings) {
      const dId = standing.Driver.driverId;
      if (driversMap.has(dId)) {
        const driverData = driversMap.get(dId);
        driverData.cumulativePoints = parseFloat(standing.points);
        driverData.history.push({
          round: roundNum,
          raceName: race.raceName,
          rank: parseInt(standing.position, 10),
          points: driverData.cumulativePoints
        });
      }
    }
    
    // For any base driver who didn't appear in the standings (e.g., replaced or DNS), copy their last rank and points
    for (const driverData of driversMap.values()) {
      if (driverData.history.length < raceTimeline.length) {
        const lastHistory = driverData.history[driverData.history.length - 1];
        driverData.history.push({
          round: roundNum,
          raceName: race.raceName,
          rank: lastHistory.rank,
          points: driverData.cumulativePoints
        });
      }
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




