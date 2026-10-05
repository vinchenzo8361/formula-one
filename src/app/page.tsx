import { Timer, Trophy, TrendingUp } from "lucide-react";
import { getCurrentSchedule, getCurrentDriverStandings, getRaceResults, getCurrentConstructorStandings } from "@/lib/api";
import Countdown from "@/components/Countdown";
import Link from "next/link";

function formatConstructor(name: string) {
  if (name === "RB" || name === "VCARB") return "Racing Bulls";
  return name;
}

export default async function Home() {
  const schedule = await getCurrentSchedule();
  const standings = await getCurrentDriverStandings();
  const constructorStandings = await getCurrentConstructorStandings();

  let lastRaceName = "Latest Race";
  let lastRaceResults: any[] = [];
  try {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/current/last/results.json", { next: { revalidate: 3600 }});
    const data = await res.json();
    const races = data?.MRData?.RaceTable?.Races;
    if (races && races.length > 0) {
      lastRaceName = races[0].raceName;
      lastRaceResults = races[0].Results || [];
    }
  } catch (e) {
    console.error(e);
  }
  
  // Find next race dynamically
  const now = new Date();
  let nextRace = schedule.find(race => {
    const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
    return raceDate > now;
  });

  // If season ended, show the last race
  if (!nextRace && schedule.length > 0) {
    nextRace = schedule[schedule.length - 1];
  }

  const nextRaceDateStr = nextRace ? `${nextRace.date}T${nextRace.time || '00:00:00Z'}` : new Date().toISOString();

  // Top 5 drivers instead of Top 3
  const top5Drivers = standings.slice(0, 5);

  return (
    <div className="flex-1 p-8 text-foreground min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <header className="mb-10 bg-panel/80 backdrop-blur p-8 rounded-3xl shadow-sm border border-gray-200/20 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-2 uppercase italic text-f1-red">Race Center</h1>
            <p className="text-text-muted text-lg font-medium">Your ultimate destination for F1 insights.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Enlarge Next Race */}
          <section className="bg-panel rounded-3xl p-12 shadow-md flex flex-col items-center justify-center text-center col-span-1 md:col-span-3 border border-gray-200/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-f1-red" />
            <Timer className="w-12 h-12 text-f1-red mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-text-muted">Next Race</h2>
            <div className="text-6xl font-extrabold mb-6 uppercase italic tracking-tighter text-foreground">{nextRace ? nextRace.raceName : 'Season Ended'}</div>
            {nextRace && <Countdown targetDate={nextRaceDateStr} />}
          </section>

          {/* Top 5 Drivers Widget */}
          <section className="bg-panel rounded-3xl p-8 shadow-sm col-span-1 border border-gray-200/20">
            <div className="flex items-center gap-3 mb-6">
               <Trophy className="w-6 h-6 text-f1-red" />
               <h2 className="text-xl font-bold tracking-tight">Top 5 Drivers</h2>
            </div>
            <div className="space-y-3">
              {top5Drivers.map((standing) => (
                <div key={standing.Driver.driverId} className="flex items-center justify-between p-3 rounded-2xl hover:bg-background transition-colors border border-transparent hover:border-gray-200/20">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-extrabold text-f1-red w-5 text-center">{standing.position}</span>
                    <div>
                      <Link href={`/drivers/${standing.Driver.driverId}`} className="font-bold text-foreground text-lg hover:text-f1-red transition-colors block">
                        {standing.Driver.familyName}
                      </Link>
                      <div className="text-xs text-text-muted uppercase font-bold tracking-wider">{formatConstructor(standing.Constructors[0]?.name || "N/A")}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-foreground">{standing.points}</div>
                </div>
              ))}
              {top5Drivers.length === 0 && (
                 <div className="p-4 text-center text-text-muted">No driver standings available.</div>
              )}
            </div>
          </section>

          {/* Likely to Win Predictor */}
          <section className="bg-panel rounded-3xl p-8 shadow-sm col-span-1 md:col-span-2 border border-gray-200/20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-f1-red" />
              <h2 className="text-xl font-bold tracking-tight">Likely to Win Predictor</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {top5Drivers.map((standing, idx) => {
                const percentages = [40, 25, 15, 12, 8];
                const colors = ['text-f1-red border-f1-red/20', 'text-blue-500 border-blue-500/20', 'text-orange-500 border-orange-500/20', 'text-green-500 border-green-500/20', 'text-purple-500 border-purple-500/20'];
                return (
                  <div key={standing.Driver.driverId} className={`p-4 rounded-2xl flex items-center gap-4 border shadow-sm transition-transform hover:-translate-y-1 bg-background ${colors[idx] || colors[0]}`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl bg-panel shadow-sm border border-gray-200/20 text-foreground`}>
                      {percentages[idx] || 5}%
                    </div>
                    <div>
                      <Link href={`/drivers/${standing.Driver.driverId}`} className="text-lg font-bold text-foreground hover:text-f1-red transition-colors block">
                        {standing.Driver.givenName} {standing.Driver.familyName}
                      </Link>
                      <div className="text-xs uppercase tracking-wider font-bold opacity-75 text-text-muted">{formatConstructor(standing.Constructors[0]?.name || "N/A")}</div>
                    </div>
                  </div>
                );
              })}
              {top5Drivers.length === 0 && (
                <div className="text-center w-full text-text-muted col-span-2">No predictions available.</div>
              )}
            </div>
          </section>
          {/* Latest Race Results & Constructor Standings */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-5 gap-6">
            <section className="bg-panel rounded-3xl p-8 shadow-sm col-span-1 md:col-span-3 border border-gray-200/20">
              <div className="flex items-center gap-3 mb-6">
                <Timer className="w-6 h-6 text-f1-red" />
                <h2 className="text-xl font-bold tracking-tight">Latest Race: {lastRaceName}</h2>
              </div>
              <div className="space-y-3">
                {lastRaceResults.slice(0, 10).map((result) => (
                  <div key={result.position} className="flex justify-between items-center p-3 rounded-2xl hover:bg-background transition-colors border border-transparent hover:border-gray-200/20">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-extrabold text-f1-red w-5 text-center">{result.position}</span>
                      <div>
                        <Link href={`/drivers/${result.Driver.driverId}`} className="font-bold text-foreground text-lg hover:text-f1-red transition-colors block">
                          {result.Driver.givenName} {result.Driver.familyName}
                        </Link>
                        <div className="text-xs text-text-muted uppercase font-bold tracking-wider">{formatConstructor(result.Constructor.name)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-text-muted font-bold">{result.Time?.time || result.status}</div>
                      <div className="text-sm font-bold text-f1-red">+{result.points} pts</div>
                    </div>
                  </div>
                ))}
                {lastRaceResults.length === 0 && (
                  <div className="p-4 text-center text-text-muted">No race results available.</div>
                )}
              </div>
            </section>
            
            <section className="bg-panel rounded-3xl p-8 shadow-sm col-span-1 md:col-span-2 border border-gray-200/20">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-f1-red" />
                <h2 className="text-xl font-bold tracking-tight">Constructor Standings</h2>
              </div>
              <div className="space-y-3">
                {constructorStandings.map((team) => (
                  <div key={team.position} className="flex justify-between items-center p-3 rounded-2xl hover:bg-background transition-colors border border-transparent hover:border-gray-200/20">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-extrabold text-f1-red w-5 text-center">{team.position}</span>
                      <Link href={`/teams/${team.Constructor.constructorId}`} className="font-bold text-foreground text-lg hover:text-f1-red transition-colors block">
                        {formatConstructor(team.Constructor.name)}
                      </Link>
                    </div>
                    <div className="text-lg font-bold text-foreground">{team.points} pts</div>
                  </div>
                ))}
                {constructorStandings.length === 0 && (
                  <div className="p-4 text-center text-text-muted">No constructor standings available.</div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
