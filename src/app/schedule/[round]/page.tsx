import { getRaceResults, getQualifyingResults, formatTeamName } from '@/lib/api';
import Link from 'next/link';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

function PositionChange({ grid, position }: { grid: string; position: string }) {
  const g = parseInt(grid, 10);
  const p = parseInt(position, 10);
  
  if (isNaN(g) || isNaN(p) || g === 0) {
    return <span className="inline-flex items-center text-text-muted ml-2 text-xs" title="Started from Pit Lane / Unclassified"><Minus className="w-3 h-3" /></span>;
  }
  
  const diff = g - p;
  
  if (diff > 0) {
    return <span className="inline-flex items-center text-green-500 ml-2 text-xs font-bold"><ArrowUp className="w-3 h-3 mr-0.5" />{diff}</span>;
  } else if (diff < 0) {
    return <span className="inline-flex items-center text-red-500 ml-2 text-xs font-bold"><ArrowDown className="w-3 h-3 mr-0.5" />{Math.abs(diff)}</span>;
  }
  
  return <span className="inline-flex items-center text-text-muted ml-2 text-xs"><Minus className="w-3 h-3" /></span>;
}

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
                      <td className="py-4 px-6 text-foreground flex items-center">
                        <Link href={`/drivers/${res.Driver.driverId}`} className="hover:text-f1-red transition-colors">
                          <span className="hidden sm:inline">{res.Driver.givenName} </span>
                          <span className="font-semibold">{res.Driver.familyName}</span>
                        </Link>
                        <PositionChange grid={res.grid} position={res.position} />
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
