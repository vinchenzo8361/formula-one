import TimelineChart from '@/components/TimelineChart';

  export default async function TimelinePage() {
    // Fetch Race 1 results to establish the official 22 base drivers (bypassing missing qualifying data)
    const baseRes = await fetch('https://api.jolpi.ca/ergast/f1/current/1/results.json', { next: { revalidate: 3600 } });
    if (!baseRes.ok) return <div className='container p-8'>API Error. Please try again later.</div>;
    const baseData = await baseRes.json();
    const race1Results = baseData.MRData.RaceTable.Races[0].Results;
  
        // Establish a strict custom team order for the starting grid column
    const teamOrder = [
      'mercedes', 'ferrari', 'mclaren', 'red_bull', 'rb',
      'alpine', 'haas', 'audi', 'williams', 'aston_martin', 'cadillac'
    ];

    const teamGroups: Record<string, any[]> = {};
    teamOrder.forEach(t => teamGroups[t] = []);

    race1Results.forEach((res: any) => {
      const cId = res.Constructor.constructorId;
      if (teamGroups[cId]) {
        teamGroups[cId].push({
          driverId: res.Driver.driverId,
          familyName: res.Driver.familyName,
          constructorId: cId
        });
      }
    });

    const baseDrivers: any[] = [];
    let initialRank = 1;

    teamOrder.forEach(tId => {
      const drivers = teamGroups[tId];
      // Randomly flip a coin to decide which team driver gets the odd vs even spot
      if (Math.random() > 0.5) drivers.reverse();

      drivers.forEach(d => {
        d.qualifyingRank = initialRank++;
        baseDrivers.push(d);
      });
    });

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
  allRaces.forEach((r: any) => {
    raceTimeline.push({ round: parseInt(r.round, 10), raceName: r.raceName });
  });

  for (const race of completedRaces) {
    const roundNum = parseInt(race.round, 10);

    for (const standing of race.DriverStandings) {
      const dId = standing.Driver.driverId;
      if (driversMap.has(dId)) {
        const driverData = driversMap.get(dId);
        driverData.cumulativePoints = parseFloat(standing.points);
      }
    }
    
    // Re-rank ONLY the official tracked drivers to perfectly lock the grid to exactly 22 places
    const driversList = Array.from(driversMap.values());
    driversList.sort((a, b) => {
      if (b.cumulativePoints !== a.cumulativePoints) {
        return b.cumulativePoints - a.cumulativePoints;
      }
      // Tie-breaker: stable sort using previous rank
      const aPrev = a.history[a.history.length - 1].rank;
      const bPrev = b.history[b.history.length - 1].rank;
      return aPrev - bPrev;
    });

    driversList.forEach((d, index) => {
      d.history.push({
        round: roundNum,
        raceName: race.raceName,
        rank: index + 1,
        points: d.cumulativePoints
      });
    });
  }

  const graphData = {
    timeline: raceTimeline,
    drivers: Array.from(driversMap.values())
  };

  return (
    <div className="p-6 h-[calc(100vh-80px)] flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-f1-red uppercase tracking-tighter">Mimi's Timeline</h1>
      <p className="text-text-muted mb-4">Evolution of driver standings starting from the first qualifying session.</p>
      <div className="w-full flex-grow overflow-hidden bg-white border-2 border-gray-200 rounded-xl shadow-lg relative">
        <TimelineChart graphData={graphData} />
      </div>
    </div>
  );
}










