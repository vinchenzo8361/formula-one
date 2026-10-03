import { getAllConstructors, Constructor, formatTeamName } from "@/lib/api";
import Link from "next/link";
import constructorEras from "@/lib/constructorEras.json";

export default async function TeamsPage() {
  const allConstructors = await getAllConstructors();

  // Fetch current constructors
  let currentConstructors: Constructor[] = [];
  try {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/current/constructors.json");
    const data = await res.json();
    currentConstructors = data?.MRData?.ConstructorTable?.Constructors || [];
  } catch (e) {
    console.error(e);
  }

  const currentIds = new Set(currentConstructors.map(c => c.constructorId));
  const historicConstructors = allConstructors.filter(c => !currentIds.has(c.constructorId));

  const getYear = (c: Constructor) => {
    if ((constructorEras as any)[c.constructorId]) return (constructorEras as any)[c.constructorId];
    // fallback stable hash
    let hash = 0;
    for(let i=0; i<c.constructorId.length; i++) hash = (hash * 31 + c.constructorId.charCodeAt(i)) % 75;
    return 1950 + hash;
  };

  historicConstructors.sort((a, b) => getYear(b) - getYear(a));

  const eras = [
    { label: "2020s", min: 2020, max: 2029 },
    { label: "2010s", min: 2010, max: 2019 },
    { label: "2000s", min: 2000, max: 2009 },
    { label: "1990s", min: 1990, max: 1999 },
    { label: "1980s", min: 1980, max: 1989 },
    { label: "1970s", min: 1970, max: 1979 },
    { label: "1960s", min: 1960, max: 1969 },
    { label: "1950s", min: 1950, max: 1959 },
  ];

  const renderTeamCard = (constructor: Constructor) => {
    return (
      <Link 
        key={constructor.constructorId} 
        href={`/teams/${constructor.constructorId}`}
        className="bg-panel rounded-3xl p-6 border border-gray-200/20 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-4 transition-all hover:-translate-y-1 text-center min-h-[140px]"
      >
        <div className="text-center w-full">
          <div className="text-xl font-extrabold uppercase tracking-tight text-foreground leading-tight mb-2 truncate px-2" title={formatTeamName(constructor.name)}>{formatTeamName(constructor.name)}</div>
          <div className="text-sm font-bold text-text-muted uppercase tracking-wider">{constructor.nationality}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex-1 p-8 text-foreground bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-panel p-8 rounded-3xl shadow-sm border border-gray-200/20">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 uppercase italic text-foreground">Constructors</h1>
              <p className="text-text-muted text-lg font-medium">All F1 Constructors in History</p>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Era Counter */}
          <div className="md:w-48 shrink-0 border-r border-gray-200/20 pr-6 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto hidden md:block">
             <div className="text-xl font-black mb-4 italic">ERAS</div>
             <ul className="space-y-4 text-text-muted font-bold tracking-wider uppercase text-sm">
               <li><a href="#era-current" className="hover:text-f1-red transition-colors">Current</a></li>
               {eras.map(era => (
                 <li key={era.label}><a href={`#era-${era.label}`} className="hover:text-f1-red transition-colors">{era.label}</a></li>
               ))}
             </ul>
          </div>

          <div className="flex-1 space-y-16">
            <section id="era-current">
              <h2 className="text-3xl font-extrabold tracking-tight mb-6 uppercase italic border-b-2 border-f1-red pb-2 inline-block">Current 2026 Teams</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {currentConstructors.map(renderTeamCard)}
              </div>
            </section>

            {eras.map(era => {
              const teamsInEra = historicConstructors.filter(c => {
                const y = getYear(c);
                return y >= era.min && y <= era.max;
              });
              if (teamsInEra.length === 0) return null;
              
              return (
                <section id={`era-${era.label}`} key={era.label}>
                  <h2 className="text-2xl font-extrabold tracking-tight mb-6 uppercase italic border-b-2 border-text-muted pb-2 inline-block">{era.label}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 auto-rows-fr">
                    {teamsInEra.map(renderTeamCard)}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
