"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function TeamsSidebar({ eras }: { eras: { label: string }[] }) {
  const sectionIds = ['era-current', ...eras.map(e => `era-${e.label}`)];
  const activeSection = useScrollSpy(sectionIds, 100);

  return (
    <div className="md:w-48 shrink-0 border-r border-gray-200/20 pr-6 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto hidden md:block">
      <div className="text-xl font-black mb-4 italic">ERAS</div>
      <ul className="space-y-4 text-text-muted font-bold tracking-wider uppercase text-sm">
        <li>
          <a 
            href="#era-current" 
            className={`transition-colors block ${activeSection === 'era-current' ? 'text-f1-red border-l-2 border-f1-red pl-2' : 'hover:text-f1-red border-l-2 border-transparent pl-2'}`}
          >
            Current
          </a>
        </li>
        {eras.map(era => (
          <li key={era.label}>
            <a 
              href={`#era-${era.label}`} 
              className={`transition-colors block ${activeSection === `era-${era.label}` ? 'text-f1-red border-l-2 border-f1-red pl-2' : 'hover:text-f1-red border-l-2 border-transparent pl-2'}`}
            >
              {era.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
