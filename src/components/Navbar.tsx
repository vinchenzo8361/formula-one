import Link from 'next/link';
import { Flag, Users, Shield, Trophy, CalendarDays } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-panel border-b-2 border-f1-red text-white py-4 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-f1-red font-bold text-2xl tracking-tighter">
          <Flag className="w-7 h-7" />
          <span>FORMULA NEXT</span>
        </Link>
      </div>
      <div className="flex gap-8 font-semibold uppercase text-sm tracking-widest text-text-muted">
        <Link href="/drivers" className="flex items-center gap-2 hover:text-white transition-colors">
          <Users className="w-4 h-4 text-f1-red" />
          Drivers
        </Link>
        <Link href="/teams" className="flex items-center gap-2 hover:text-white transition-colors">
          <Shield className="w-4 h-4 text-f1-red" />
          Teams
        </Link>
        <Link href="/standings" className="flex items-center gap-2 hover:text-white transition-colors">
          <Trophy className="w-4 h-4 text-f1-red" />
          Standings
        </Link>
        <Link href="/schedule" className="flex items-center gap-2 hover:text-white transition-colors">
          <CalendarDays className="w-4 h-4 text-f1-red" />
          Schedule
        </Link>
      </div>
    </nav>
  );
}
