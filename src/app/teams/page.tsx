import { getAllConstructors } from "@/lib/api";
import { Shield } from "lucide-react";
import Link from "next/link";

export default async function TeamsPage() {
  const constructors = await getAllConstructors();

  // Helper to generate a colorful background based on string
  const getColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {constructors.map((constructor) => {
            const bgColor = getColor(constructor.constructorId);
            const initials = constructor.name.substring(0, 2).toUpperCase();
            
            return (
              <Link 
                key={constructor.constructorId} 
                href={`/teams/${constructor.constructorId}`}
                className="bg-panel rounded-3xl p-6 border border-gray-200/20 shadow-sm hover:shadow-md flex flex-col items-center gap-4 transition-all hover:-translate-y-1"
              >
                <div 
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-inner border-4 border-white ring-2 ring-gray-100 transform rotate-45"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className="-rotate-45">{initials}</div>
                </div>
                <div className="text-center mt-2">
                  <div className="text-lg font-extrabold uppercase tracking-tight text-foreground leading-tight mb-1">{constructor.name}</div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-wider">{constructor.nationality}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
