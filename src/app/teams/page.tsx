import { getCurrentConstructorStandings } from "@/lib/api";
import { Shield } from "lucide-react";

export default async function TeamsPage() {
  const standings = await getCurrentConstructorStandings();

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-10 flex items-center gap-4">
          <Shield className="w-12 h-12 text-f1-red" />
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Teams</h1>
            <p className="text-text-muted text-lg">Current Constructor Championship Standings</p>
          </div>
        </header>

        {standings.length === 0 ? (
          <div className="text-center p-12 bg-panel rounded-xl text-text-muted border border-gray-800">
            No constructor standings available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standings.map((standing) => (
              <div key={standing.Constructor.constructorId} className="bg-panel rounded-xl p-6 border-l-4 border-f1-red shadow-lg flex items-center gap-6">
                <div className="text-5xl font-black text-f1-red w-16 text-center">{standing.position}</div>
                <div className="flex-1">
                  <div className="text-3xl font-black uppercase tracking-tight">{standing.Constructor.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{standing.points}</div>
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest">PTS</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
