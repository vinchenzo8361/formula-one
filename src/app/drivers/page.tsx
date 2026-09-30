import { getCurrentDriverStandings, getAllConstructors } from "@/lib/api";
import { Users } from "lucide-react";
import Link from "next/link";
import TeamDriverPicker from "@/components/TeamDriverPicker";

function formatConstructor(name: string) {
  if (name === "RB" || name === "VCARB") return "Racing Bulls";
  return name;
}

export default async function DriversPage() {
  const standings = await getCurrentDriverStandings();
  const constructors = await getAllConstructors();

  return (
    <div className="flex-1 p-8 text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-10 flex items-center gap-4">
          <Users className="w-12 h-12 text-f1-red" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Drivers</h1>
            <p className="text-text-muted text-lg">Current World Championship Standings</p>
          </div>
        </header>

        {standings.length === 0 ? (
          <div className="text-center p-12 bg-panel rounded-2xl text-text-muted border border-gray-200/20 shadow-sm">
            No driver standings available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standings.map((standing) => (
              <Link 
                href={`/drivers/${standing.Driver.driverId}`} 
                key={standing.Driver.driverId}
                className="bg-panel rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-200/20 flex flex-col gap-4 transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div className="text-4xl font-extrabold text-f1-red w-12">{standing.position}</div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{standing.points}</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">PTS</div>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight">
                    {standing.Driver.givenName} <span className="font-extrabold">{standing.Driver.familyName}</span>
                  </div>
                  <div className="text-text-muted text-lg font-medium">
                    {formatConstructor(standing.Constructors[0]?.name || "N/A")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <TeamDriverPicker constructors={constructors} />
      </div>
    </div>
  );
}
