import { getAllConstructors, Constructor } from "@/lib/api";
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

  const currentIds = new Set(currentConstructors.map(c => c.constructorId));
  const historicConstructors = allConstructors.filter(c => !currentIds.has(c.constructorId));

  const renderTeamCard = (constructor: Constructor) => {
    return (
      <Link 
        key={constructor.constructorId} 
        href={`/teams/${constructor.constructorId}`}
        className="bg-panel rounded-3xl p-6 border border-gray-200/20 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-4 transition-all hover:-translate-y-1 text-center min-h-[140px]"
      >
        <div className="text-center w-full">
          <div className="text-xl font-extrabold uppercase tracking-tight text-foreground leading-tight mb-2 truncate px-2" title={constructor.name}>{constructor.name}</div>
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

        <section>
          <h2 className="text-3xl font-extrabold tracking-tight mb-6 uppercase italic border-b-2 border-f1-red pb-2 inline-block">Current 2026 Teams</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {currentConstructors.map(renderTeamCard)}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-extrabold tracking-tight mb-6 uppercase italic border-b-2 border-text-muted pb-2 inline-block mt-8">Historic Teams</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 auto-rows-fr">
            {historicConstructors.map(renderTeamCard)}
          </div>
        </section>
      </div>
    </div>
  );
}
