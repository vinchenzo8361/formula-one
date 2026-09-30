import { getCurrentConstructorStandings } from "@/lib/api";
import { TEAM_DATA } from "@/lib/staticData";
import { Shield, Archive } from "lucide-react";
import Link from "next/link";

export default async function TeamsPage() {
  const standings = await getCurrentConstructorStandings();

  const retiredTeams = Object.entries(TEAM_DATA).filter(([_, data]) => data.isRetired);

  return (
    <div className="flex-1 p-8 text-foreground bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-6">
            <Shield className="w-14 h-14 text-f1-red" />
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 uppercase italic text-gray-900">Teams</h1>
              <p className="text-text-muted text-lg font-medium">Current Constructor Championship Standings</p>
            </div>
          </div>
        </header>

        {standings.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-3xl text-text-muted border border-gray-100 shadow-sm font-medium">
            No constructor standings available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standings.map((standing) => (
              <Link 
                key={standing.Constructor.constructorId} 
                href={`/teams/${standing.Constructor.constructorId}`}
                className="bg-white rounded-3xl p-8 border-l-8 border-f1-red shadow-sm hover:shadow-md flex items-center gap-6 transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-6xl font-black text-f1-red w-16 text-center">{standing.position}</div>
                <div className="flex-1">
                  <div className="text-3xl font-extrabold uppercase tracking-tight text-gray-900">{standing.Constructor.name}</div>
                  <div className="text-sm font-bold text-text-muted mt-1">{standing.Constructor.nationality}</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-gray-900">{standing.points}</div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">PTS</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {retiredTeams.length > 0 && (
          <div className="pt-8 border-t-2 border-gray-200">
            <header className="mb-8 flex items-center gap-4">
              <Archive className="w-8 h-8 text-gray-400" />
              <h2 className="text-3xl font-bold tracking-tight text-gray-600 uppercase italic">Legacy & Retired Teams</h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {retiredTeams.map(([id, data]) => (
                <div key={id} className="bg-gray-100 rounded-3xl p-8 border border-gray-200 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="text-2xl font-extrabold uppercase tracking-tight text-gray-800 mb-2 capitalize">{id.replace('_', ' ')}</div>
                  <p className="text-gray-700 font-medium mb-4">{data.blurb}</p>
                  <p className="text-sm text-gray-500 font-medium italic">{data.history}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
