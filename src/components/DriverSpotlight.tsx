"use client";

import { useEffect, useState } from "react";
import historicalData from "@/lib/historicalData.json";
import { User, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function DriverSpotlight() {
  const [driver, setDriver] = useState<any>(null);
  const [activeYears, setActiveYears] = useState<string | null>(null);
  const [latestTeam, setLatestTeam] = useState<string | null>(null);

  const pickRandomDriver = () => {
    const driverKeys = Object.keys(historicalData.drivers);
    if (driverKeys.length > 0) {
      const randomKey = driverKeys[Math.floor(Math.random() * driverKeys.length)];
      const data = (historicalData.drivers as any)[randomKey];
      // Format driver name from key: "reg_parnell" -> "Reg Parnell"
      const name = randomKey.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setDriver({ name, driverId: randomKey, ...data });
    }
  };

  useEffect(() => {
    pickRandomDriver();
  }, []);

  useEffect(() => {
    if (!driver?.driverId) return;

    let isMounted = true;
    setActiveYears(null);
    setLatestTeam(null);

    const fetchDetails = async () => {
      try {
        const seasonsRes = await fetch(`https://api.jolpi.ca/ergast/f1/drivers/${driver.driverId}/seasons.json?limit=1000`);
        const seasonsData = await seasonsRes.json();
        const seasons = seasonsData.MRData.SeasonTable.Seasons.map((s: any) => parseInt(s.season));
        
        const constructorsRes = await fetch(`https://api.jolpi.ca/ergast/f1/drivers/${driver.driverId}/constructors.json?limit=1000`);
        const constructorsData = await constructorsRes.json();
        const constructors = constructorsData.MRData.ConstructorTable.Constructors;
        
        if (!isMounted) return;

        if (seasons.length > 0) {
          const minYear = Math.min(...seasons);
          const maxYear = Math.max(...seasons);
          setActiveYears(minYear === maxYear ? `${minYear}` : `${minYear}-${maxYear}`);
        } else {
          setActiveYears("N/A");
        }

        if (constructors.length > 0) {
          setLatestTeam(constructors[constructors.length - 1].name);
        } else {
          setLatestTeam("N/A");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setActiveYears("Error");
          setLatestTeam("Error");
        }
      }
    };

    fetchDetails();

    return () => { isMounted = false; };
  }, [driver?.driverId]);

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
        <div className="text-3xl font-extrabold mb-2 text-foreground uppercase tracking-tight">
          <Link href={`/drivers/${driver.driverId}`} className="hover:text-f1-red transition-colors">
            {driver.name}
          </Link>
        </div>
        <div className="flex justify-center gap-4 text-sm text-text-muted mb-6 font-medium">
          <span>Active: {activeYears || "Loading..."}</span>
          <span>&bull;</span>
          <span>Latest Team: {latestTeam || "Loading..."}</span>
        </div>
        <p className="text-sm text-text-muted mb-6 text-center px-4">
          Known for their exceptional race craft, {driver.name} is a renowned Formula 1 driver who secured {driver.wins} wins and {driver.podiums} podiums throughout their career.
        </p>
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
      <div className="mt-6 flex justify-start">
        <button onClick={pickRandomDriver} className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-background text-foreground hover:bg-gray-200/10 rounded-xl transition-colors border border-gray-200/20">
          <RefreshCw className="w-4 h-4" /> New Driver
        </button>
      </div>
    </section>
  );
}
