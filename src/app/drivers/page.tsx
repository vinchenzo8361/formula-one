import { getCurrentDriverStandings } from "@/lib/api";
import { Users } from "lucide-react";

export default async function DriversPage() {
  const standings = await getCurrentDriverStandings();

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-10 flex items-center gap-4">
          <Users className="w-12 h-12 text-f1-red" />
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Drivers</h1>
            <p className="text-text-muted text-lg">Current World Championship Standings</p>
          </div>
        </header>

        {standings.length === 0 ? (
          <div className="text-center p-12 bg-panel rounded-xl text-text-muted border border-gray-800">
            No driver standings available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standings.map((standing) => (
              <div key={standing.Driver.driverId} className="bg-panel rounded-xl p-6 border-t-4 border-f1-red shadow-lg flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="text-4xl font-black text-f1-red w-12">{standing.position}</div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{standing.points}</div>
                    <div className="text-sm font-bold text-text-muted uppercase tracking-widest">PTS</div>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold uppercase tracking-tight">
                    {standing.Driver.givenName} <span className="font-black">{standing.Driver.familyName}</span>
                  </div>
                  <div className="text-text-muted text-lg font-medium">{standing.Constructors[0]?.name || "N/A"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
