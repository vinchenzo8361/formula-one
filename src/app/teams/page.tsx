import { getAllConstructors, Constructor } from "@/lib/api";
import { Shield } from "lucide-react";
import Link from "next/link";

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

  // To find teams active from 2000 onwards, we can fetch constructors for each year from 2000 to 2024
  // We'll do this in parallel.
  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
  const activeSince2000 = new Set<string>();
  
  try {
    const responses = await Promise.all(
      years.map(year => fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors.json`).then(r => r.json()).catch(() => null))
    );
    responses.forEach(data => {
      const constructors = data?.MRData?.ConstructorTable?.Constructors || [];
      constructors.forEach((c: Constructor) => activeSince2000.add(c.constructorId));
    });
  } catch (e) {
    console.error(e);
  }

  const currentIds = new Set(currentConstructors.map(c => c.constructorId));
  const historicConstructors = allConstructors.filter(c => !currentIds.has(c.constructorId));

  // Helper to generate a colorful background based on string
  const getColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const renderTeamCard = (constructor: Constructor) => {
    const isPost2000 = activeSince2000.has(constructor.constructorId);
    const bgColor = getColor(constructor.constructorId);
    const initials = constructor.name.substring(0, 2).toUpperCase();

    return (
      <Link 
        key={constructor.constructorId} 
        href={`/teams/${constructor.constructorId}`}
        className="bg-panel rounded-3xl p-6 border border-gray-200/20 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-4 transition-all hover:-translate-y-1 text-center h-full"
      >
        {isPost2000 && (
          <div 
            className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-inner border-4 border-white ring-2 ring-gray-100 transform rotate-45 mb-2"
            style={{ backgroundColor: bgColor }}
          >
            <div className="-rotate-45">{initials}</div>
          </div>
        )}
        <div className="text-center">
          <div className="text-lg font-extrabold uppercase tracking-tight text-foreground leading-tight mb-1">{constructor.name}</div>
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider">{constructor.nationality}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex-1 p-8 text-foreground bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-panel p-8 rounded-3xl shadow-sm border border-gray-200/20">
          <div className="flex items-center gap-6">
            <Shield className="w-14 h-14 text-f1-red" />
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 uppercase italic text-foreground">Constructors</h1>
              <p className="text-text-muted text-lg font-medium">All F1 Constructors in History</p>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-3xl font-extrabold tracking-tight mb-6 uppercase italic border-b-2 border-f1-red pb-2 inline-block">Current 2024 Teams</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {currentConstructors.map(renderTeamCard)}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-extrabold tracking-tight mb-6 uppercase italic border-b-2 border-text-muted pb-2 inline-block mt-8">Historic Teams</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {historicConstructors.map(renderTeamCard)}
          </div>
        </section>
      </div>
    </div>
  );
}
