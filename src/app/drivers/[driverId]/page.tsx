import { getDriverResultsByYear } from "@/lib/api";
import YearSelector from "@/components/YearSelector";
import { User, Flag } from "lucide-react";
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
  const currentYear = new Date().getFullYear();
  const yearStr = resolvedSearchParams.year || currentYear.toString();
  const year = parseInt(yearStr, 10) || currentYear;

  const results = await getDriverResultsByYear(driverId, year);
  
  // Extract driver info from the first result if available
  let driverInfo = { givenName: driverId, familyName: "" };
  if (results.length > 0 && results[0].Results && results[0].Results.length > 0) {
    driverInfo = results[0].Results[0].Driver;
  }

  return (
    <div className="flex-1 p-8 text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link href="/drivers" className="text-text-muted hover:text-f1-red text-sm font-semibold uppercase tracking-wider mb-4 inline-block">
          &larr; Back to Drivers
        </Link>
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
              <User className="w-8 h-8 text-f1-red" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-2 capitalize">
                {driverInfo.givenName} {driverInfo.familyName}
              </h1>
              <p className="text-text-muted text-lg">Race Results History</p>
            </div>
          </div>
          <Suspense fallback={<div className="h-16 w-64 bg-gray-100 animate-pulse rounded-2xl border border-gray-100"></div>}>
            <YearSelector currentYear={currentYear} />
          </Suspense>
        </header>

        <section className="bg-panel rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Flag className="w-6 h-6 text-f1-red" />
            <h2 className="text-2xl font-bold tracking-tight">{year} Results</h2>
          </div>

          {results.length === 0 ? (
            <div className="text-center p-12 text-text-muted">
              No results found for this driver in {year}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-sm uppercase tracking-wider text-text-muted">
                    <th className="pb-4 font-semibold px-4">Round</th>
                    <th className="pb-4 font-semibold px-4">Race</th>
                    <th className="pb-4 font-semibold px-4 text-center">Grid</th>
                    <th className="pb-4 font-semibold px-4 text-center">Pos</th>
                    <th className="pb-4 font-semibold px-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {results.map((race) => {
                    const result = race.Results[0];
                    return (
                      <tr key={race.round} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-gray-500 font-medium">
                          {race.round}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-lg">{race.raceName}</div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600">
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
    </div>
  );
}
