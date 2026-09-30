import { Timer, Trophy, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-10">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Race Center</h1>
          <p className="text-text-muted text-lg">Your ultimate destination for F1 insights.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Next Race Countdown */}
          <section className="bg-panel rounded-xl p-6 border-t-4 border-f1-red shadow-lg flex flex-col items-center justify-center text-center h-64">
            <Timer className="w-10 h-10 text-f1-red mb-4" />
            <h2 className="text-xl font-bold uppercase tracking-widest mb-2 text-text-muted">Next Race</h2>
            <div className="text-4xl font-black mb-1">MONZA</div>
            <div className="text-f1-red font-bold text-2xl">04 : 12 : 36 : 59</div>
            <div className="text-xs text-text-muted mt-2 tracking-widest uppercase">Days : Hrs : Min : Sec</div>
          </section>

          {/* Top 3 Drivers Widget */}
          <section className="bg-panel rounded-xl p-6 border-t-4 border-f1-red shadow-lg col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-f1-red" />
              <h2 className="text-xl font-bold uppercase tracking-widest text-text-muted">Top 3 Drivers</h2>
            </div>
            <div className="space-y-4">
              {[
                { pos: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 395 },
                { pos: 2, name: "Lando Norris", team: "McLaren", points: 331 },
                { pos: 3, name: "Charles Leclerc", team: "Ferrari", points: 307 },
              ].map((driver) => (
                <div key={driver.pos} className="flex items-center justify-between bg-background p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-f1-red w-6">{driver.pos}</span>
                    <div>
                      <div className="font-bold text-lg">{driver.name}</div>
                      <div className="text-sm text-text-muted">{driver.team}</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">{driver.points} <span className="text-sm text-text-muted font-normal">PTS</span></div>
                </div>
              ))}
            </div>
          </section>

          {/* Likely to Win Predictor */}
          <section className="bg-panel rounded-xl p-6 border-t-4 border-f1-red shadow-lg md:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-f1-red" />
              <h2 className="text-xl font-bold uppercase tracking-widest text-text-muted">Likely to Win - Monza</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-background p-6 rounded-lg border border-gray-800 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-f1-red/20 flex items-center justify-center text-f1-red font-black text-2xl border border-f1-red/50">
                  45%
                </div>
                <div>
                  <div className="text-2xl font-bold">Charles Leclerc</div>
                  <div className="text-text-muted">Ferrari</div>
                </div>
              </div>
              <div className="flex-1 bg-background p-6 rounded-lg border border-gray-800 flex items-center gap-6 opacity-75">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-black text-2xl border border-blue-500/50">
                  30%
                </div>
                <div>
                  <div className="text-2xl font-bold">Max Verstappen</div>
                  <div className="text-text-muted">Red Bull Racing</div>
                </div>
              </div>
              <div className="flex-1 bg-background p-6 rounded-lg border border-gray-800 flex items-center gap-6 opacity-50">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-black text-2xl border border-orange-500/50">
                  15%
                </div>
                <div>
                  <div className="text-2xl font-bold">Lando Norris</div>
                  <div className="text-text-muted">McLaren</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
