import { getRaceResults, getQualifyingResults, formatTeamName, getRaceInfo, RaceResult } from '@/lib/api';
import Link from 'next/link';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

function generateHighlights(results: RaceResult[]): string[] {
  if (!results || results.length === 0) return [];
  const highlights: string[] = [];

  const winner = results.find(r => r.position === "1");
  if (winner) {
    if (winner.grid === "1") {
      highlights.push(`${winner.Driver.givenName} ${winner.Driver.familyName} dominated from Pole to secure the win.`);
    } else {
      highlights.push(`${winner.Driver.givenName} ${winner.Driver.familyName} took the victory, starting from P${winner.grid}.`);
    }
  }

  let maxPlacesGained = 0;
  let biggestMover = null;
  for (const res of results) {
    const start = parseInt(res.grid, 10);
    const finish = parseInt(res.position, 10);
    if (!isNaN(start) && !isNaN(finish) && start > 0) {
      const gained = start - finish;
      if (gained > maxPlacesGained) {
        maxPlacesGained = gained;
        biggestMover = res;
      }
    }
  }

  if (biggestMover && maxPlacesGained > 0) {
    highlights.push(`${biggestMover.Driver.givenName} ${biggestMover.Driver.familyName} gained ${maxPlacesGained} places to finish P${biggestMover.position}.`);
  }

  const dnfs = results.filter(r => !r.status.includes("Finished") && !r.status.includes("+"));
  if (dnfs.length > 0) {
    highlights.push(`${dnfs.length} driver${dnfs.length > 1 ? 's' : ''} DNF'd due to mechanical failures/crashes.`);
  }

  const p2 = results.find(r => r.position === "2");
  const p3 = results.find(r => r.position === "3");
  if (p2 && p3) {
     highlights.push(`${p2.Driver.familyName} and ${p3.Driver.familyName} rounded out the podium.`);
  }

  if (highlights.length < 3) {
    highlights.push('A thrilling race with intense battles across the grid.');
  }

  return highlights.slice(0, 10);
}

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

  const [raceResults, qualifyingResults, raceInfo] = await Promise.all([
    getRaceResults(season, round),
    getQualifyingResults(season, round),
    getRaceInfo(season, round),
  ]);

  const hasResults = raceResults.length > 0;
  const hasQualifying = qualifyingResults.length > 0;
  const raceName = raceInfo?.raceName || `Round ${round}`;

  if (!hasResults && !hasQualifying) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto bg-panel rounded-2xl shadow-sm p-10 border border-gray-200/20">
          <div className="text-4xl mb-4">🏁</div>
          <h1 className="text-2xl font-semibold text-foreground mb-4">It&apos;s not race day yet.</h1>
          <p className="text-text-muted mb-8">The results for {raceName} are not available yet. Check back later!</p>
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

      <h1 className="text-3xl font-bold text-foreground mb-8">{raceName} Results</h1>

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
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <span className="text-4xl mb-4">⏱️</span>
                <span className="text-lg font-medium text-foreground">Race is happening soon</span>
                <span className="text-sm text-text-muted mt-2">Check back later for the official results.</span>
              </div>
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

      {hasResults && (
        <section className="mt-8 bg-panel rounded-3xl shadow-sm border border-gray-200/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200/20">
            <h2 className="text-xl font-semibold text-foreground">Race Highlights</h2>
          </div>
          <div className="p-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generateHighlights(raceResults).map((highlight, idx) => (
                <li key={idx} className="flex items-start space-x-3 bg-background/50 p-4 rounded-xl border border-gray-200/10">
                  <span className="text-f1-red mt-1 text-lg leading-none">&bull;</span>
                  <span className="text-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
