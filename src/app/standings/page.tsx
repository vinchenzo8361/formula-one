import { getHistoricalDriverStandings } from "@/lib/api";
import YearSelector from "@/components/YearSelector";
import { Trophy } from "lucide-react";
import { Suspense } from "react";

function formatConstructor(name: string) {
  if (name === "RB" || name === "VCARB") return "Racing Bulls";
  return name;
}

export default async function StandingsPage(props: { searchParams: Promise<{ year?: string }> }) {
  const searchParams = await props.searchParams;
  const currentYear = new Date().getFullYear();
  const yearStr = searchParams.year || currentYear.toString();
  const year = parseInt(yearStr, 10) || currentYear;

  const standings = await getHistoricalDriverStandings(year);

  return (
    <div className="flex-1 p-8 text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-f1-red" />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">Driver Standings</h1>
              <p className="text-text-muted text-lg">World Championship History</p>
            </div>
          </div>
          <Suspense fallback={<div className="h-16 w-64 bg-gray-100 animate-pulse rounded-2xl border border-gray-100"></div>}>
            <YearSelector currentYear={currentYear} />
          </Suspense>
        </header>

        <section className="bg-panel rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">{year} Championship</h2>
          </div>

          {standings.length === 0 ? (
            <div className="text-center p-12 text-text-muted">
              No standings found for {year}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-sm uppercase tracking-wider text-text-muted">
                    <th className="pb-4 font-semibold px-4">Pos</th>
                    <th className="pb-4 font-semibold px-4">Driver</th>
                    <th className="pb-4 font-semibold px-4">Constructor</th>
                    <th className="pb-4 font-semibold px-4 text-right">Points</th>
                    <th className="pb-4 font-semibold px-4 text-right">Wins</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {standings.map((standing) => (
                    <tr key={standing.Driver.driverId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 w-16">
                        <span className="font-extrabold text-f1-red text-lg">{standing.position}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold">{standing.Driver.givenName} {standing.Driver.familyName}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {formatConstructor(standing.Constructors[0]?.name || "N/A")}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-lg">
                        {standing.points}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-500 font-medium">
                        {standing.wins}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
