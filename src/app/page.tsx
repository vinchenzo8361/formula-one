import { Timer, Trophy, TrendingUp } from "lucide-react";
import { getCurrentSchedule, getCurrentDriverStandings } from "@/lib/api";
import Countdown from "@/components/Countdown";

function formatConstructor(name: string) {
  if (name === "RB" || name === "VCARB") return "Racing Bulls";
  return name;
}

export default async function Home() {
  const schedule = await getCurrentSchedule();
  const standings = await getCurrentDriverStandings();
  
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

  const top3Drivers = standings.slice(0, 3);

  return (
    <div className="flex-1 p-8 text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Race Center</h1>
          <p className="text-text-muted text-lg">Your ultimate destination for F1 insights.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Next Race */}
          <section className="bg-panel rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center h-64 border border-gray-100">
            <Timer className="w-10 h-10 text-f1-red mb-4" />
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-text-muted">Next Race</h2>
            <div className="text-3xl font-extrabold mb-1">{nextRace ? nextRace.raceName : 'Season Ended'}</div>
            {nextRace && <Countdown targetDate={nextRaceDateStr} />}
          </section>

          {/* Top 3 Drivers Widget */}
          <section className="bg-panel rounded-2xl p-8 shadow-sm col-span-1 md:col-span-2 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-f1-red" />
              <h2 className="text-lg font-bold tracking-tight">Top 3 Drivers</h2>
            </div>
            <div className="space-y-2">
              {top3Drivers.map((standing) => (
                <div key={standing.Driver.driverId} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-extrabold text-f1-red w-6">{standing.position}</span>
                    <div>
                      <div className="font-semibold text-lg">{standing.Driver.givenName} {standing.Driver.familyName}</div>
                      <div className="text-sm text-text-muted">{formatConstructor(standing.Constructors[0]?.name || "N/A")}</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">{standing.points} <span className="text-xs text-text-muted font-normal ml-1">PTS</span></div>
                </div>
              ))}
              {top3Drivers.length === 0 && (
                 <div className="p-4 text-center text-text-muted">No driver standings available.</div>
              )}
            </div>
          </section>

          {/* Likely to Win Predictor */}
          <section className="bg-panel rounded-2xl p-8 shadow-sm md:col-span-3 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-f1-red" />
              <h2 className="text-lg font-bold tracking-tight">Likely to Win - {nextRace ? nextRace.Circuit.circuitName : 'Next Season'}</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {top3Drivers.map((standing, idx) => {
                const percentages = [45, 30, 15];
                const colors = ['text-f1-red bg-red-100', 'text-blue-600 bg-blue-100', 'text-orange-600 bg-orange-100'];
                return (
                  <div key={standing.Driver.driverId} className="flex-1 bg-gray-50 p-6 rounded-2xl flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${colors[idx] || colors[0]}`}>
                      {percentages[idx] || 5}%
                    </div>
                    <div>
                      <div className="text-lg font-bold">{standing.Driver.givenName} {standing.Driver.familyName}</div>
                      <div className="text-sm text-text-muted">{formatConstructor(standing.Constructors[0]?.name || "N/A")}</div>
                    </div>
                  </div>
                );
              })}
              {top3Drivers.length === 0 && (
                <div className="text-center w-full text-text-muted">No predictions available.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
