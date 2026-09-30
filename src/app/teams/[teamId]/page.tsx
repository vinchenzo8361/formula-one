import { getConstructorResultsByYear, getConstructorSeasons, getConstructorStandingsHistory, getConstructorDrivers } from "@/lib/api";
import { TEAM_DATA } from "@/lib/staticData";
import YearSelector from "@/components/YearSelector";
import { Shield, Flag, Trophy, Clock, Users } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function TeamDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ teamId: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const teamId = resolvedParams.teamId;
  const activeYears = await getConstructorSeasons(teamId);
  const currentYear = new Date().getFullYear();
  const yearStr = resolvedSearchParams.year || (activeYears.length > 0 ? activeYears[0].toString() : currentYear.toString());
  const year = parseInt(yearStr, 10) || currentYear;

  const results = await getConstructorResultsByYear(teamId, year);
  const standingsHistory = await getConstructorStandingsHistory(teamId);
  const allDrivers = await getConstructorDrivers(teamId);
  
  // Calculate total points and wins for the year from the results
  let totalPoints = 0;
  let wins = 0;
  
  // Extract drivers who raced for them this year
  const driverNames = new Set<string>();

  results.forEach(race => {
    race.Results?.forEach(result => {
      totalPoints += parseFloat(result.points) || 0;
      if (result.position === "1") wins += 1;
      driverNames.add(`${result.Driver.givenName} ${result.Driver.familyName}`);
    });
  });

  let allTimePoints = 0;
  let championships = 0;
  standingsHistory.forEach(list => {
    list.ConstructorStandings?.forEach(standing => {
      allTimePoints += parseFloat(standing.points) || 0;
      if (standing.position === "1") championships += 1;
    });
  });
  
  let teamInfo: any = { name: teamId.replace('_', ' '), nationality: "Unknown", url: "#" };
  if (standingsHistory.length > 0 && standingsHistory[0].ConstructorStandings && standingsHistory[0].ConstructorStandings.length > 0) {
    teamInfo = standingsHistory[0].ConstructorStandings[0].Constructor;
  }

  const staticData = TEAM_DATA[teamId] || TEAM_DATA[teamId.replace('_', '')] || null;
  const blurb = staticData?.blurb || `This ${teamInfo.nationality} constructor has been a part of Formula 1 history. Read more about their legacy on their official Wikipedia page.`;

  return (
    <div className="flex-1 p-8 text-foreground bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link href="/teams" className="text-text-muted hover:text-f1-red text-sm font-bold uppercase tracking-wider mb-4 inline-block">
          &larr; Back to Teams
        </Link>
        
        {/* Header Profile Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-4 border-f1-red shadow-sm">
              <Shield className="w-12 h-12 text-f1-red" />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 capitalize italic text-gray-900">
                {teamInfo.name}
              </h1>
              <p className="text-text-muted text-lg font-medium">Constructor Profile</p>
            </div>
          </div>
          <Suspense fallback={<div className="h-16 w-64 bg-gray-100 animate-pulse rounded-2xl border border-gray-100"></div>}>
            <YearSelector currentYear={currentYear} validYears={activeYears} />
          </Suspense>
        </div>

        {/* Extended Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <Trophy className="w-10 h-10 text-f1-red" />
            <div>
              <div className="text-sm font-bold text-text-muted uppercase tracking-widest">Championships</div>
              <div className="text-3xl font-black text-gray-900">{championships}</div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <Shield className="w-10 h-10 text-f1-red" />
            <div>
              <div className="text-sm font-bold text-text-muted uppercase tracking-widest">All-Time Points</div>
              <div className="text-3xl font-black text-gray-900">{allTimePoints.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <Users className="w-10 h-10 text-f1-red" />
            <div>
              <div className="text-sm font-bold text-text-muted uppercase tracking-widest">Total Drivers</div>
              <div className="text-3xl font-black text-gray-900">{allDrivers.length}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Results Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Final Standing Block */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="text-center w-full sm:w-auto">
                <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">{year} Points</div>
                <div className="text-5xl font-black text-f1-red">{totalPoints}</div>
              </div>
              <div className="hidden sm:block h-16 w-px bg-gray-200"></div>
              <div className="text-center w-full sm:w-auto border-t sm:border-0 border-gray-100 pt-4 sm:pt-0">
                <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1 flex justify-center items-center gap-2">
                  <Trophy className="w-4 h-4" /> {year} Wins
                </div>
                <div className="text-5xl font-black text-gray-900">{wins}</div>
              </div>
              <div className="hidden sm:block h-16 w-px bg-gray-200"></div>
              <div className="text-center w-full sm:w-auto border-t sm:border-0 border-gray-100 pt-4 sm:pt-0">
                <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-2">{year} Drivers</div>
                <div className="flex flex-col gap-1">
                  {Array.from(driverNames).map(name => (
                    <div key={name} className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{name}</div>
                  ))}
                  {driverNames.size === 0 && <span className="text-gray-400 font-medium">N/A</span>}
                </div>
              </div>
            </div>

            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Flag className="w-6 h-6 text-f1-red" />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{year} Race Results</h2>
              </div>

              {results.length === 0 ? (
                <div className="text-center p-12 text-text-muted font-medium bg-gray-50 rounded-2xl">
                  No results found for this team in {year}.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-100 text-xs uppercase tracking-widest text-text-muted">
                        <th className="pb-4 font-bold px-4">Round</th>
                        <th className="pb-4 font-bold px-4">Race</th>
                        <th className="pb-4 font-bold px-4">Driver</th>
                        <th className="pb-4 font-bold px-4 text-center">Pos</th>
                        <th className="pb-4 font-bold px-4 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {results.flatMap((race) => 
                        (race.Results || []).map(result => (
                          <tr key={`${race.round}-${result.Driver.driverId}`} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 text-gray-500 font-bold">
                              {race.round}
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-gray-900">{race.raceName}</div>
                            </td>
                            <td className="py-4 px-4 font-medium text-gray-700">
                              <Link href={`/drivers/${result.Driver.driverId}`} className="hover:text-f1-red transition-colors">
                                {result.Driver.familyName}
                              </Link>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="font-extrabold text-gray-900 text-lg">{result?.position || "-"}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-bold text-lg text-f1-red">{result?.points || "0"}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Static Data */}
          <div className="space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2 text-gray-900">
                <Shield className="w-5 h-5 text-f1-red" /> Team Overview
              </h3>
              <p className="text-gray-700 leading-relaxed font-medium mb-4">{blurb}</p>
              {teamInfo.url && teamInfo.url !== "#" && (
                <a href={teamInfo.url} target="_blank" rel="noopener noreferrer" className="text-f1-red hover:underline font-bold text-sm uppercase tracking-widest block mb-4">
                  View Wikipedia &rarr;
                </a>
              )}
              {staticData?.history && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-900 font-bold mb-2">
                    <Clock className="w-4 h-4 text-f1-red" /> Legacy
                  </div>
                  <p className="text-sm text-gray-600 font-medium italic">{staticData.history}</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
