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

  // Top 5 drivers instead of Top 3
  const top5Drivers = standings.slice(0, 5);

  return (
    <div 
      className="flex-1 p-8 text-foreground min-h-screen"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, #f8f8f8 25%, transparent 25%, transparent 75%, #f8f8f8 75%, #f8f8f8), repeating-linear-gradient(45deg, #f8f8f8 25%, #f4f4f4 25%, #f4f4f4 75%, #f8f8f8 75%, #f8f8f8)`,
        backgroundPosition: `0 0, 20px 20px`,
        backgroundSize: `40px 40px`,
        backgroundColor: `#f4f4f4`
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <header className="mb-10 bg-white/90 backdrop-blur p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-2 uppercase italic text-f1-red">Race Center</h1>
            <p className="text-gray-600 text-lg font-medium">Your ultimate destination for F1 insights.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Enlarge Next Race */}
          <section className="bg-panel rounded-3xl p-12 shadow-md flex flex-col items-center justify-center text-center col-span-1 md:col-span-3 border border-gray-100 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-f1-red" />
            <Timer className="w-12 h-12 text-f1-red mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-text-muted">Next Race</h2>
            <div className="text-6xl font-extrabold mb-6 uppercase italic tracking-tighter text-gray-900">{nextRace ? nextRace.raceName : 'Season Ended'}</div>
            {nextRace && <Countdown targetDate={nextRaceDateStr} />}
          </section>

          {/* Top 5 Drivers Widget */}
          <section className="bg-white rounded-3xl p-8 shadow-sm col-span-1 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-f1-red" />
              <h2 className="text-xl font-bold tracking-tight">Top 5 Drivers</h2>
            </div>
            <div className="space-y-3">
              {top5Drivers.map((standing) => (
                <div key={standing.Driver.driverId} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-extrabold text-f1-red w-5 text-center">{standing.position}</span>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{standing.Driver.familyName}</div>
                      <div className="text-xs text-text-muted uppercase font-bold tracking-wider">{formatConstructor(standing.Constructors[0]?.name || "N/A")}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{standing.points}</div>
                </div>
              ))}
              {top5Drivers.length === 0 && (
                 <div className="p-4 text-center text-text-muted">No driver standings available.</div>
              )}
            </div>
          </section>

          {/* Likely to Win Predictor */}
          <section className="bg-white rounded-3xl p-8 shadow-sm col-span-1 md:col-span-2 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-f1-red" />
              <h2 className="text-xl font-bold tracking-tight">Likely to Win Predictor</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {top5Drivers.map((standing, idx) => {
                const percentages = [40, 25, 15, 12, 8];
                const colors = ['text-f1-red bg-red-50 border-red-100', 'text-blue-600 bg-blue-50 border-blue-100', 'text-orange-600 bg-orange-50 border-orange-100', 'text-green-600 bg-green-50 border-green-100', 'text-purple-600 bg-purple-50 border-purple-100'];
                return (
                  <div key={standing.Driver.driverId} className={`p-4 rounded-2xl flex items-center gap-4 border shadow-sm transition-transform hover:-translate-y-1 ${colors[idx] || colors[0]}`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl bg-white shadow-sm`}>
                      {percentages[idx] || 5}%
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{standing.Driver.givenName} {standing.Driver.familyName}</div>
                      <div className="text-xs uppercase tracking-wider font-bold opacity-75">{formatConstructor(standing.Constructors[0]?.name || "N/A")}</div>
                    </div>
                  </div>
                );
              })}
              {top5Drivers.length === 0 && (
                <div className="text-center w-full text-text-muted col-span-2">No predictions available.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
