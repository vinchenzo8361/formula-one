import { getDriverResultsByYear, getDriverSeasons, getHistoricalDriverStandings } from "@/lib/api";
import { DRIVER_DATA } from "@/lib/staticData";
import YearSelector from "@/components/YearSelector";
import { User, Flag, Trophy, AlertTriangle } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function DriverDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ driverId: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const driverId = resolvedParams.driverId;
  const activeYears = await getDriverSeasons(driverId);
  const currentYear = new Date().getFullYear();
  const yearStr = resolvedSearchParams.year || (activeYears.length > 0 ? activeYears[0].toString() : currentYear.toString());
  const year = parseInt(yearStr, 10) || currentYear;

  const results = await getDriverResultsByYear(driverId, year);
  const standings = await getHistoricalDriverStandings(year);
  const finalStanding = standings.find(s => s.Driver.driverId === driverId);
  
  // Extract driver info from the first result if available, or from standing
  let driverInfo: any = { givenName: driverId, familyName: "", nationality: "Unknown", dateOfBirth: "Unknown", url: "#" };
  if (finalStanding) {
    driverInfo = finalStanding.Driver;
  } else if (results.length > 0 && results[0].Results && results[0].Results.length > 0) {
    driverInfo = results[0].Results[0].Driver;
  }

  const staticData = DRIVER_DATA[driverId];
  
  const blurb = staticData?.blurb || `Born on ${driverInfo.dateOfBirth}, this ${driverInfo.nationality} driver has made significant contributions to motorsport. Read more about their career on their official Wikipedia page.`;

  return (
    <div className="flex-1 p-8 text-foreground bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link href="/drivers" className="text-text-muted hover:text-f1-red text-sm font-bold uppercase tracking-wider mb-4 inline-block">
          &larr; Back to Drivers
        </Link>
        
        {/* Header Profile Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-4 border-f1-red shadow-sm">
              <User className="w-12 h-12 text-f1-red" />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 capitalize italic">
                {driverInfo.givenName} {driverInfo.familyName}
              </h1>
              <p className="text-text-muted text-lg font-medium">Driver Profile & History</p>
            </div>
          </div>
          <Suspense fallback={<div className="h-16 w-64 bg-gray-100 animate-pulse rounded-2xl border border-gray-100"></div>}>
            <YearSelector currentYear={currentYear} validYears={activeYears} />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Results Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Final Standing Block */}
            {finalStanding && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-around">
                <div className="text-center">
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Championship Pos</div>
                  <div className="text-4xl font-black text-f1-red">P{finalStanding.position}</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Total Points</div>
                  <div className="text-4xl font-black">{finalStanding.points}</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Wins</div>
                  <div className="text-4xl font-black">{finalStanding.wins}</div>
                </div>
              </div>
            )}

            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Flag className="w-6 h-6 text-f1-red" />
                <h2 className="text-2xl font-bold tracking-tight">{year} Race Results</h2>
              </div>

              {results.length === 0 ? (
                <div className="text-center p-12 text-text-muted font-medium bg-gray-50 rounded-2xl">
                  No results found for this driver in {year}.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-100 text-xs uppercase tracking-widest text-text-muted">
                        <th className="pb-4 font-bold px-4">Round</th>
                        <th className="pb-4 font-bold px-4">Race</th>
                        <th className="pb-4 font-bold px-4 text-center">Grid</th>
                        <th className="pb-4 font-bold px-4 text-center">Pos</th>
                        <th className="pb-4 font-bold px-4 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {results.map((race) => {
                        const result = race.Results?.[0];
                        return (
                          <tr key={race.round} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 text-gray-500 font-bold">
                              {race.round}
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-gray-900">{race.raceName}</div>
                            </td>
                            <td className="py-4 px-4 text-center text-gray-500 font-medium">
                              {result?.grid || "-"}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="font-extrabold text-gray-900 text-lg">{result?.position || "-"}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-bold text-lg text-f1-red">{result?.points || "0"}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Static Data */}
          <div className="space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-f1-red" /> Biography
              </h3>
              <p className="text-gray-700 leading-relaxed font-medium mb-4">{blurb}</p>
              {driverInfo.url && driverInfo.url !== "#" && (
                <a href={driverInfo.url} target="_blank" rel="noopener noreferrer" className="text-f1-red hover:underline font-bold text-sm uppercase tracking-widest">
                  View Wikipedia &rarr;
                </a>
              )}
            </section>

            {staticData && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl font-black text-gray-900 mb-1">{staticData.dnfCount}</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">Career DNFs</div>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl font-black text-gray-900 mb-1">{staticData.dqCount}</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">Career DQs</div>
                  </div>
                </div>

                {staticData.fines && staticData.fines.length > 0 && (
                  <section className="bg-red-50 rounded-3xl p-8 shadow-sm border border-red-100">
                    <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2 text-red-900">
                      <AlertTriangle className="w-5 h-5 text-red-600" /> Notable Fines
                    </h3>
                    <div className="space-y-4">
                      {staticData.fines.map((fine, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
                          <div className="font-black text-red-600 text-lg mb-1">{fine.amount}</div>
                          <div className="text-sm text-red-900 font-medium">{fine.reason}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {standings.length > 0 && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-f1-red" /> {year} Top 10 Standings
                </h3>
                <div className="space-y-3">
                  {standings.slice(0, 10).map((s) => (
                    <div key={s.Driver.driverId} className={`flex items-center justify-between p-3 rounded-xl ${s.Driver.driverId === driverId ? 'bg-red-50 border border-red-100' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="font-black text-gray-400 w-6 text-center">{s.position}</div>
                        <Link href={`/drivers/${s.Driver.driverId}`} className="font-bold text-gray-900 hover:text-f1-red">
                          {s.Driver.givenName} {s.Driver.familyName}
                        </Link>
                      </div>
                      <div className="font-black text-f1-red">{s.points}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
