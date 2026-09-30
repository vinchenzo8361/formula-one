import { getDriverResultsByYear, getDriverSeasons, getHistoricalDriverStandings, getAllDriverResults, getAllDriverStandings } from "@/lib/api";
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

  const [results, standings, allResults, allStandings] = await Promise.all([
    getDriverResultsByYear(driverId, year),
    getHistoricalDriverStandings(year),
    getAllDriverResults(driverId),
    getAllDriverStandings(driverId)
  ]);
  const finalStanding = standings.find(s => s.Driver.driverId === driverId);
  
  // Extract driver info from the first result if available, or from standing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let driverInfo: any = { givenName: driverId, familyName: "", nationality: "Unknown", dateOfBirth: "Unknown", url: "#" };
  if (finalStanding) {
    driverInfo = finalStanding.Driver;
  } else if (allResults.length > 0 && allResults[0].Results && allResults[0].Results.length > 0) {
    driverInfo = allResults[0].Results[0].Driver;
  } else if (results.length > 0 && results[0].Results && results[0].Results.length > 0) {
    driverInfo = results[0].Results[0].Driver;
  }

  // Calculate advanced stats
  let totalChampionshipWins = 0;
  for (const list of allStandings) {
    if (list.DriverStandings && list.DriverStandings[0].position === "1") {
      totalChampionshipWins++;
    }
  }

  let totalPoints = 0;
  let totalRaceWins = 0;
  let totalPodiums = 0;

  for (const race of allResults) {
    const res = race.Results?.[0];
    if (res) {
      totalPoints += parseFloat(res.points || "0");
      if (res.position === "1") totalRaceWins++;
      if (res.position === "1" || res.position === "2" || res.position === "3") totalPodiums++;
    }
  }

  const staticData = DRIVER_DATA[driverId];
  
  const funFact = `Fun Fact: ${driverInfo.givenName} is from ${driverInfo.nationality} and was born on ${driverInfo.dateOfBirth}. Over their illustrious career, they have scored a massive ${totalPoints} points!`;
  const blurb = staticData?.blurb ? `${staticData.blurb}\n\n${funFact}` : `Born on ${driverInfo.dateOfBirth}, this ${driverInfo.nationality} driver has made significant contributions to motorsport. Read more about their career on their official Wikipedia page.\n\n${funFact}`;

  return (
    <div className="flex-1 p-8 text-foreground bg-background min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link href="/drivers" className="text-text-muted hover:text-f1-red text-sm font-bold uppercase tracking-wider mb-4 inline-block">
          &larr; Back to Drivers
        </Link>
        
        {/* Header Profile Section */}
        <div className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center border-4 border-f1-red shadow-sm">
              <User className="w-12 h-12 text-f1-red" />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 capitalize italic">
                {driverInfo.givenName} {driverInfo.familyName}
              </h1>
              <p className="text-text-muted text-lg font-medium">Driver Profile & History</p>
            </div>
          </div>
          <Suspense fallback={<div className="h-16 w-64 bg-panel animate-pulse rounded-2xl border border-gray-200/20"></div>}>
            <YearSelector currentYear={currentYear} validYears={activeYears} />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Results Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Final Standing Block */}
            {finalStanding && (
              <div className="bg-panel rounded-3xl p-6 shadow-sm border border-gray-200/20 flex items-center justify-around">
                <div className="text-center">
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Championship Pos</div>
                  <div className="text-4xl font-black text-f1-red">P{finalStanding.position}</div>
                </div>
                <div className="h-12 w-px bg-gray-200/20"></div>
                <div className="text-center">
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Total Points</div>
                  <div className="text-4xl font-black">{finalStanding.points}</div>
                </div>
                <div className="h-12 w-px bg-gray-200/20"></div>
                <div className="text-center">
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Wins</div>
                  <div className="text-4xl font-black">{finalStanding.wins}</div>
                </div>
              </div>
            )}

            <section className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20">
              <div className="flex items-center gap-3 mb-6">
                <Flag className="w-6 h-6 text-f1-red" />
                <h2 className="text-2xl font-bold tracking-tight">{year} Race Results</h2>
              </div>

              {results.length === 0 ? (
                <div className="text-center p-12 text-text-muted font-medium bg-background rounded-2xl">
                  No results found for this driver in {year}.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200/20 text-xs uppercase tracking-widest text-text-muted">
                        <th className="pb-4 font-bold px-4">Round</th>
                        <th className="pb-4 font-bold px-4">Race</th>
                        <th className="pb-4 font-bold px-4 text-center">Grid</th>
                        <th className="pb-4 font-bold px-4 text-center">Pos</th>
                        <th className="pb-4 font-bold px-4 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/20">
                      {results.map((race) => {
                        const result = race.Results?.[0];
                        return (
                          <tr key={race.round} className="hover:bg-background transition-colors">
                            <td className="py-4 px-4 text-text-muted font-bold">
                              {race.round}
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-foreground">{race.raceName}</div>
                            </td>
                            <td className="py-4 px-4 text-center text-text-muted font-medium">
                              {result?.grid || "-"}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="font-extrabold text-foreground text-lg">{result?.position || "-"}</span>
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
            <section className="bg-panel rounded-3xl p-6 shadow-sm border border-gray-200/20">
              <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-f1-red" /> Career Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-background p-3 rounded-xl">
                  <div className="text-2xl font-black text-foreground">{totalChampionshipWins}</div>
                  <div className="text-xs font-bold text-text-muted uppercase">Championships</div>
                </div>
                <div className="text-center bg-background p-3 rounded-xl">
                  <div className="text-2xl font-black text-foreground">{totalRaceWins}</div>
                  <div className="text-xs font-bold text-text-muted uppercase">Race Wins</div>
                </div>
                <div className="text-center bg-background p-3 rounded-xl">
                  <div className="text-2xl font-black text-foreground">{totalPodiums}</div>
                  <div className="text-xs font-bold text-text-muted uppercase">Podiums</div>
                </div>
                <div className="text-center bg-background p-3 rounded-xl">
                  <div className="text-2xl font-black text-foreground">{totalPoints}</div>
                  <div className="text-xs font-bold text-text-muted uppercase">Total Points</div>
                </div>
              </div>
            </section>

            <section className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20">
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-f1-red" /> Biography
              </h3>
              <p className="text-foreground leading-relaxed font-medium mb-4">{blurb}</p>
              {driverInfo.url && driverInfo.url !== "#" && (
                <a href={driverInfo.url} target="_blank" rel="noopener noreferrer" className="text-f1-red hover:underline font-bold text-sm uppercase tracking-widest">
                  View Wikipedia &rarr;
                </a>
              )}
            </section>

            {staticData && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-panel rounded-3xl p-6 shadow-sm border border-gray-200/20 text-center">
                    <div className="text-4xl font-black text-foreground mb-1">{staticData.dnfCount}</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">Career DNFs</div>
                  </div>
                  <div className="bg-panel rounded-3xl p-6 shadow-sm border border-gray-200/20 text-center">
                    <div className="text-4xl font-black text-foreground mb-1">{staticData.dqCount}</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">Career DQs</div>
                  </div>
                </div>

                {staticData.fines && staticData.fines.length > 0 && (
                  <section className="bg-f1-red/10 rounded-3xl p-8 shadow-sm border border-f1-red/20">
                    <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2 text-f1-red">
                      <AlertTriangle className="w-5 h-5 text-f1-red" /> Notable Fines
                    </h3>
                    <div className="space-y-4">
                      {staticData.fines.map((fine, idx) => (
                        <div key={idx} className="bg-panel p-4 rounded-xl shadow-sm border border-f1-red/20">
                          <div className="font-black text-f1-red text-lg mb-1">{fine.amount}</div>
                          <div className="text-sm text-foreground font-medium">{fine.reason}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {standings.length > 0 && (
              <section className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20">
                <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-f1-red" /> {year} Top 10 Standings
                </h3>
                <div className="space-y-3">
                  {standings.slice(0, 10).map((s) => (
                    <div key={s.Driver.driverId} className={`flex items-center justify-between p-3 rounded-xl border border-transparent transition-colors ${s.Driver.driverId === driverId ? 'bg-f1-red/10 border-f1-red/20' : 'bg-background hover:border-gray-200/20'}`}>
                      <div className="flex items-center gap-3">
                        <div className="font-black text-text-muted w-6 text-center">{s.position}</div>
                        <Link href={`/drivers/${s.Driver.driverId}`} className="font-bold text-foreground hover:text-f1-red">
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
