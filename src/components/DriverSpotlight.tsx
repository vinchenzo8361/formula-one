"use client";

import { useEffect, useState } from "react";
import historicalData from "@/lib/historicalData.json";
import { User } from "lucide-react";

export default function DriverSpotlight() {
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    const driverKeys = Object.keys(historicalData.drivers);
    if (driverKeys.length > 0) {
      const randomKey = driverKeys[Math.floor(Math.random() * driverKeys.length)];
      const data = (historicalData.drivers as any)[randomKey];
      // Format driver name from key: "reg_parnell" -> "Reg Parnell"
      const name = randomKey.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setDriver({ name, ...data });
    }
  }, []);

  if (!driver) return (
    <section className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20 flex flex-col justify-center min-h-[300px] col-span-1">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-f1-red" />
        <h2 className="text-xl font-bold tracking-tight">Driver Spotlight</h2>
      </div>
      <div className="flex-1 flex items-center justify-center text-text-muted">
        Loading...
      </div>
    </section>
  );

  return (
    <section className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20 flex flex-col col-span-1">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-f1-red" />
        <h2 className="text-xl font-bold tracking-tight">Driver Spotlight</h2>
      </div>
      <div className="text-center flex-1 flex flex-col justify-center">
        <div className="text-3xl font-extrabold mb-8 text-foreground uppercase tracking-tight">{driver.name}</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-2xl border border-gray-200/20 transition-transform hover:-translate-y-1">
            <div className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Wins</div>
            <div className="text-3xl font-black text-f1-red">{driver.wins}</div>
          </div>
          <div className="bg-background p-4 rounded-2xl border border-gray-200/20 transition-transform hover:-translate-y-1">
            <div className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Podiums</div>
            <div className="text-3xl font-black text-f1-red">{driver.podiums}</div>
          </div>
          <div className="bg-background p-4 rounded-2xl border border-gray-200/20 transition-transform hover:-translate-y-1">
            <div className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Points</div>
            <div className="text-3xl font-black text-f1-red">{driver.points}</div>
          </div>
          <div className="bg-background p-4 rounded-2xl border border-gray-200/20 transition-transform hover:-translate-y-1">
            <div className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Titles</div>
            <div className="text-3xl font-black text-f1-red">{driver.championships}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
