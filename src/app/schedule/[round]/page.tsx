import { getRaceResults, getQualifyingResults, formatTeamName } from '@/lib/api';
import Link from 'next/link';

export default async function RaceDetailsPage({ params }: { params: Promise<{ round: string }> }) {
  const season = 'current'; // Use current to get the real latest season data
  const resolvedParams = await params;
  const round = resolvedParams.round;

  const [raceResults, qualifyingResults] = await Promise.all([
    getRaceResults(season, round),
    getQualifyingResults(season, round),
  ]);

  const hasResults = raceResults.length > 0;
  const hasQualifying = qualifyingResults.length > 0;

  if (!hasResults && !hasQualifying) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto bg-panel rounded-2xl shadow-sm p-10 border border-gray-200/20">
          <div className="text-4xl mb-4">🏁</div>
          <h1 className="text-2xl font-semibold text-foreground mb-4">It&apos;s not race day yet.</h1>
          <p className="text-text-muted mb-8">The results for Round {round} are not available yet. Check back later!</p>
          <Link href="/schedule" className="inline-block px-6 py-2.5 bg-background hover:bg-panel text-foreground font-medium rounded-full transition-colors">
            &larr; Back to Schedule
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/schedule" className="inline-flex items-center text-text-muted hover:text-foreground font-medium text-sm transition-colors bg-background hover:bg-panel px-4 py-2 rounded-full">
          &larr; Back to Schedule
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-8">Round {round} Results</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Race Results Section */}
        <section className="bg-panel rounded-3xl shadow-sm border border-gray-200/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200/20">
            <h2 className="text-xl font-semibold text-foreground">Race Results</h2>
          </div>
          <div className="overflow-x-auto">
            {hasResults ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-medium text-text-muted uppercase tracking-wider border-b border-gray-200/20 bg-background/30">
                    <th className="py-4 px-6">Pos</th>
                    <th className="py-4 px-6">Driver</th>
                    <th className="py-4 px-6">Constructor</th>
                    <th className="py-4 px-6 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/20">
                  {raceResults.map((res) => (
                    <tr key={res.number} className="hover:bg-background/50 transition-colors">
                      <td className="py-4 px-6 text-foreground font-medium">{res.position}</td>
                      <td className="py-4 px-6 text-foreground">
                        <Link href={`/drivers/${res.Driver.driverId}`} className="hover:text-f1-red transition-colors">
                          <span className="hidden sm:inline">{res.Driver.givenName} </span>
                          <span className="font-semibold">{res.Driver.familyName}</span>
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-text-muted text-sm">
                        {formatTeamName(res.Constructor.name)}
                      </td>
                      <td className="py-4 px-6 text-foreground font-semibold text-right">{res.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-text-muted">Race results pending.</div>
            )}
          </div>
        </section>

        {/* Qualifying Results Section */}
        <section className="bg-panel rounded-3xl shadow-sm border border-gray-200/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200/20">
            <h2 className="text-xl font-semibold text-foreground">Qualifying</h2>
          </div>
          <div className="overflow-x-auto">
            {hasQualifying ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-medium text-text-muted uppercase tracking-wider border-b border-gray-200/20 bg-background/30">
                    <th className="py-4 px-6">Pos</th>
                    <th className="py-4 px-6">Driver</th>
                    <th className="py-4 px-6">Constructor</th>
                    <th className="py-4 px-6 text-right">Q3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/20">
                  {qualifyingResults.map((res) => (
                    <tr key={res.number} className="hover:bg-background/50 transition-colors">
                      <td className="py-4 px-6 text-foreground font-medium">{res.position}</td>
                      <td className="py-4 px-6 text-foreground">
                        <Link href={`/drivers/${res.Driver.driverId}`} className="hover:text-f1-red transition-colors">
                          <span className="hidden sm:inline">{res.Driver.givenName} </span>
                          <span className="font-semibold">{res.Driver.familyName}</span>
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-text-muted text-sm">
                        {formatTeamName(res.Constructor.name)}
                      </td>
                      <td className="py-4 px-6 text-text-muted text-sm font-mono text-right">
                        {res.Q3 || res.Q2 || res.Q1 || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-text-muted">Qualifying results pending.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
