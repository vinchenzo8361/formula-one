import { getCurrentSchedule } from '@/lib/api';
import Link from 'next/link';

export default async function SchedulePage() {
  const schedule = await getCurrentSchedule();
  const now = new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Race Schedule</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schedule.map((race) => {
          const raceDate = race.time ? new Date(`${race.date}T${race.time}`) : new Date(race.date);
          const isCompleted = raceDate < now;

          return (
            <Link key={race.round} href={`/schedule/${race.round}`} className="block bg-panel border border-gray-200/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-f1-red font-bold uppercase tracking-widest">Round {race.round}</div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                  {isCompleted ? 'Completed' : 'Upcoming'}
                </div>
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tight mb-1">{race.raceName}</h2>
              <div className="text-text-muted mb-4">{race.Circuit.circuitName}</div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Date:</span>
                <span>{new Date(race.date).toLocaleDateString()}</span>
              </div>
              {race.time && (
                <div className="flex justify-between text-sm mt-1">
                  <span className="font-medium">Time:</span>
                  <span>{new Date(`${race.date}T${race.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
      {schedule.length === 0 && (
        <div className="text-center text-text-muted">No schedule available right now.</div>
      )}
    </div>
  );
}
