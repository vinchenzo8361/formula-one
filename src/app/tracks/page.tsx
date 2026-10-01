"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation2, Target, Calendar, Map, Activity, Flag, Clock } from "lucide-react";
import TrackMap from "@/components/TrackMap";

interface Circuit {
  circuitId: string;
  circuitName: string;
  Location: {
    locality: string;
    country: string;
  };
}

const mockStats: Record<string, any> = {
  monza: { elevation: '42.5m', length: '5.793 km', laps: 53, fastestLap: '1:21.046 (Barrichello, 2004)', topSpeed: '362 km/h' },
  spa: { elevation: '102.2m', length: '7.004 km', laps: 44, fastestLap: '1:46.286 (Bottas, 2018)', topSpeed: '350 km/h' },
  silverstone: { elevation: '11.3m', length: '5.891 km', laps: 52, fastestLap: '1:27.097 (Verstappen, 2020)', topSpeed: '330 km/h' },
  monaco: { elevation: '42m', length: '3.337 km', laps: 78, fastestLap: '1:12.909 (Hamilton, 2021)', topSpeed: '290 km/h' },
  generic: { elevation: '15m', length: '5.000 km', laps: 50, fastestLap: '1:30.000', topSpeed: '320 km/h' }
};

export default function TracksPage() {
  const [year, setYear] = useState<number>(2023);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCircuits() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/circuits.json`);
        const data = await res.json();
        const circuitsData = data.MRData.CircuitTable.Circuits;
        setCircuits(circuitsData);
        setSelectedCircuit(circuitsData[0] || null);
      } catch (error) {
        console.error("Failed to fetch circuits:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCircuits();
  }, [year]);

  const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

  const stats = selectedCircuit && mockStats[selectedCircuit.circuitId] 
    ? mockStats[selectedCircuit.circuitId] 
    : mockStats.generic;

  return (
    <div className="flex-1 bg-panel min-h-screen text-foreground selection:bg-f1-red selection:text-white">
      {/* Header */}
      <div className="relative bg-black text-white py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-f1-red via-black to-black"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <MapPin className="w-16 h-16 text-f1-red mb-6" />
          <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
            Iconic <span className="text-f1-red">Tracks</span>
          </h1>
          <p className="text-2xl text-gray-300 font-medium max-w-2xl leading-relaxed">
            Mastering the racing line, braking zones, and DRS detection points across the world&apos;s most demanding circuits.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16 space-y-16">
        
        {/* Selectors */}
        <div className="flex flex-col md:flex-row gap-6 bg-background p-6 rounded-3xl border border-gray-200/20 shadow-sm">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Season
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-panel border border-gray-200/20 text-foreground text-lg rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-f1-red"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider flex items-center gap-2">
              <Map className="w-4 h-4" /> Circuit
            </label>
            <select
              value={selectedCircuit?.circuitId || ""}
              onChange={(e) => {
                const circuit = circuits.find(c => c.circuitId === e.target.value);
                if (circuit) setSelectedCircuit(circuit);
              }}
              className="w-full bg-panel border border-gray-200/20 text-foreground text-lg rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-f1-red"
              disabled={loading || circuits.length === 0}
            >
              {loading ? (
                <option>Loading circuits...</option>
              ) : (
                circuits.map(c => (
                  <option key={c.circuitId} value={c.circuitId}>
                    {c.circuitName} ({c.Location.country})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {selectedCircuit && (
          <div className="space-y-12">
            <div className="border-b-4 border-f1-red pb-4">
              <h2 className="text-5xl font-black uppercase tracking-tight">{selectedCircuit.circuitName}</h2>
              <p className="text-xl text-text-muted mt-2">{selectedCircuit.Location.locality}, {selectedCircuit.Location.country}</p>
            </div>

            {/* Split View */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Normal View */}
              <div className="bg-white p-8 rounded-3xl flex flex-col items-center shadow-sm">
                <h3 className="text-2xl font-bold uppercase text-black mb-8 w-full text-center tracking-tight border-b pb-4">Track Layout</h3>
                <div className="w-full max-w-md text-black">
                  <TrackMap circuitId={selectedCircuit.circuitId} colored={false} />
                </div>
              </div>

              {/* Colored View */}
              <div className="bg-white p-8 rounded-3xl flex flex-col items-center shadow-sm">
                <h3 className="text-2xl font-bold uppercase text-black mb-8 w-full text-center tracking-tight border-b pb-4">Speed Zones</h3>
                <div className="w-full max-w-md text-black">
                  <TrackMap circuitId={selectedCircuit.circuitId} colored={true} />
                </div>
                
                {/* Legend */}
                <div className="flex gap-4 mt-8 w-full justify-center text-sm font-semibold text-black">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div> Throttle
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div> Coast
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div> Brake
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-background border border-gray-200/20 p-8 rounded-3xl shadow-sm">
              <h3 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Circuit Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/10">
                  <Navigation2 className="w-8 h-8 text-f1-red mb-4" />
                  <div className="text-sm text-text-muted font-semibold uppercase tracking-wider mb-1">Length</div>
                  <div className="text-2xl font-bold">{stats.length}</div>
                </div>
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/10">
                  <Activity className="w-8 h-8 text-f1-red mb-4" />
                  <div className="text-sm text-text-muted font-semibold uppercase tracking-wider mb-1">Elevation</div>
                  <div className="text-2xl font-bold">{stats.elevation}</div>
                </div>
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/10">
                  <Flag className="w-8 h-8 text-f1-red mb-4" />
                  <div className="text-sm text-text-muted font-semibold uppercase tracking-wider mb-1">Laps</div>
                  <div className="text-2xl font-bold">{stats.laps}</div>
                </div>
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/10 md:col-span-2 lg:col-span-1">
                  <Target className="w-8 h-8 text-f1-red mb-4" />
                  <div className="text-sm text-text-muted font-semibold uppercase tracking-wider mb-1">Top Speed</div>
                  <div className="text-2xl font-bold">{stats.topSpeed}</div>
                </div>
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/10 md:col-span-3 lg:col-span-1">
                  <Clock className="w-8 h-8 text-f1-red mb-4" />
                  <div className="text-sm text-text-muted font-semibold uppercase tracking-wider mb-1">Fastest Lap</div>
                  <div className="text-xl font-bold truncate" title={stats.fastestLap}>{stats.fastestLap}</div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
