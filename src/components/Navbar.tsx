import Link from 'next/link';
import { Users, Shield, Trophy, CalendarDays, Newspaper } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-panel border-b-2 border-f1-red text-foreground py-4 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-f1-red font-bold text-2xl tracking-tighter">
          <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L10 90 L35 90 L50 60 L65 90 L90 90 Z" />
          </svg>
          <span>APEX F1</span>
        </Link>
      </div>
      <div className="flex gap-8 font-semibold uppercase text-sm tracking-widest text-text-muted">
        <Link href="/drivers" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Users className="w-4 h-4 text-f1-red" />
          Drivers
        </Link>
        <Link href="/teams" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Shield className="w-4 h-4 text-f1-red" />
          Teams
        </Link>
        <Link href="/standings" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Trophy className="w-4 h-4 text-f1-red" />
          Standings
        </Link>
        <Link href="/spotlight" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Newspaper className="w-4 h-4 text-f1-red" />
          Spotlight
        </Link>
        <Link href="/schedule" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <CalendarDays className="w-4 h-4 text-f1-red" />
          Schedule
        </Link>
        <Link href="/library" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <svg className="w-4 h-4 text-f1-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          Library
        </Link>
        <Link href="/tracks" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <svg className="w-4 h-4 text-f1-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Tracks
        </Link>
        <Link href="/quiz" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <svg className="w-4 h-4 text-f1-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Quiz
        </Link>
        <Link href="/timeline" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <div className="flex flex-col items-center leading-none text-[10px] sm:text-xs"><span>Mimi's</span><span>Timeline</span></div>
        </Link>
        
        <ThemeToggle />
      </div>
    </nav>
  );
}

