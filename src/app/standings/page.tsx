import { getCurrentDriverStandings } from '@/lib/api';

export default async function StandingsPage() {
  const standings = await getCurrentDriverStandings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Driver Standings</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2">
              <th className="py-3 px-4">Pos</th>
              <th className="py-3 px-4">Driver</th>
              <th className="py-3 px-4">Constructor</th>
              <th className="py-3 px-4">Points</th>
              <th className="py-3 px-4">Wins</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing) => (
              <tr key={standing.Driver.driverId} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-3 px-4 font-semibold">{standing.position}</td>
                <td className="py-3 px-4">
                  {standing.Driver.givenName} {standing.Driver.familyName}
                </td>
                <td className="py-3 px-4">
                  {standing.Constructors.map((c) => c.name).join(', ')}
                </td>
                <td className="py-3 px-4 font-bold">{standing.points}</td>
                <td className="py-3 px-4">{standing.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {standings.length === 0 && (
          <div className="text-center text-gray-500 py-8">No standings available right now.</div>
        )}
      </div>
    </div>
  );
}
