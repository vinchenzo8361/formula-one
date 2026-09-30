import { getRaceResults, getQualifyingResults, formatTeamName } from '@/lib/api';
import Link from 'next/link';

export default async function RaceDetailsPage({ params }: { params: { round: string } }) {
  const season = '2024'; // Currently hardcoded to the active season
  const round = params.round;

  const [raceResults, qualifyingResults] = await Promise.all([
    getRaceResults(season, round),
    getQualifyingResults(season, round),
  ]);

  const hasResults = raceResults.length > 0;
  const hasQualifying = qualifyingResults.length > 0;

  if (!hasResults && !hasQualifying) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-10 border border-gray-100">
          <div className="text-4xl mb-4">🏁</div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">It's not race day yet.</h1>
          <p className="text-gray-500 mb-8">The results for Round {round} are not available yet. Check back later!</p>
          <Link href="/schedule" className="inline-block px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-full transition-colors">
            &larr; Back to Schedule
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/schedule" className="inline-flex items-center text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full">
          &larr; Back to Schedule
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Round {round} Results</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Race Results Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Race Results</h2>
          </div>
          <div className="overflow-x-auto">
            {hasResults ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-50 bg-gray-50/30">
                    <th className="py-4 px-6">Pos</th>
                    <th className="py-4 px-6">Driver</th>
                    <th className="py-4 px-6">Constructor</th>
                    <th className="py-4 px-6 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {raceResults.map((res) => (
                    <tr key={res.number} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">{res.position}</td>
                      <td className="py-4 px-6 text-gray-800">
                        <span className="hidden sm:inline">{res.Driver.givenName} </span>
                        <span className="font-semibold">{res.Driver.familyName}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        {formatTeamName(res.Constructor.name)}
                      </td>
                      <td className="py-4 px-6 text-gray-900 font-semibold text-right">{res.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-400">Race results pending.</div>
            )}
          </div>
        </section>

        {/* Qualifying Results Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Qualifying</h2>
          </div>
          <div className="overflow-x-auto">
            {hasQualifying ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-50 bg-gray-50/30">
                    <th className="py-4 px-6">Pos</th>
                    <th className="py-4 px-6">Driver</th>
                    <th className="py-4 px-6">Constructor</th>
                    <th className="py-4 px-6 text-right">Q3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {qualifyingResults.map((res) => (
                    <tr key={res.number} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">{res.position}</td>
                      <td className="py-4 px-6 text-gray-800">
                        <span className="hidden sm:inline">{res.Driver.givenName} </span>
                        <span className="font-semibold">{res.Driver.familyName}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        {formatTeamName(res.Constructor.name)}
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm font-mono text-right">
                        {res.Q3 || res.Q2 || res.Q1 || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-400">Qualifying results pending.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
