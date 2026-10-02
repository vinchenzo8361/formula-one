"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Constructor, Driver, formatTeamName } from "@/lib/api";
import { Search, ChevronDown, Check, Users, Flag, ChevronRight } from "lucide-react";

export default function TeamDriverPicker({ constructors }: { constructors: Constructor[] }) {
  const [selectedConstructor, setSelectedConstructor] = useState<Constructor | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [teamSearch, setTeamSearch] = useState("");
  const [driverSearch, setDriverSearch] = useState("");
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (teamRef.current && !teamRef.current.contains(event.target as Node)) {
        setIsTeamOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedConstructor) {
      setDrivers([]);
      return;
    }
    
    async function fetchDrivers() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/constructors/${selectedConstructor?.constructorId}/drivers.json?limit=500`);
        const data = await res.json();
        const fetchedDrivers = data?.MRData?.DriverTable?.Drivers || [];
        setDrivers(fetchedDrivers);
      } catch (error) {
        console.error(error);
        setDrivers([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDrivers();
  }, [selectedConstructor]);

  const filteredConstructors = constructors.filter(c => 
    formatTeamName(c.name).toLowerCase().includes(teamSearch.toLowerCase()) ||
    c.nationality.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const filteredDrivers = drivers.filter(d => 
    `${d.givenName} ${d.familyName}`.toLowerCase().includes(driverSearch.toLowerCase()) ||
    d.nationality.toLowerCase().includes(driverSearch.toLowerCase())
  );

  return (
    <div className="bg-panel rounded-3xl p-8 shadow-sm border border-gray-200/20 mt-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Driver Explorer</h2>
          <p className="text-text-muted font-medium">Search through history by constructor to find any driver.</p>
        </div>
        <div className="bg-f1-red/10 p-3 rounded-2xl flex items-center justify-center border border-f1-red/20">
          <Users className="w-8 h-8 text-f1-red" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 relative" ref={teamRef}>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3">1. Select a Team</label>
          <div 
            className={`w-full p-4 bg-background border ${isTeamOpen ? 'border-f1-red ring-2 ring-f1-red/20' : 'border-gray-200/20'} rounded-xl cursor-pointer flex items-center justify-between transition-all group`}
            onClick={() => setIsTeamOpen(!isTeamOpen)}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-panel flex items-center justify-center shrink-0 border border-gray-200/20 group-hover:border-f1-red/50">
                <Flag className="w-4 h-4 text-f1-red" />
              </div>
              <span className="font-extrabold text-foreground truncate text-lg">
                {selectedConstructor ? formatTeamName(selectedConstructor.name) : "Choose a Constructor..."}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isTeamOpen ? "rotate-180 text-f1-red" : ""}`} />
          </div>

          {isTeamOpen && (
            <div className="absolute z-20 w-full mt-2 bg-panel border border-gray-200/20 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[400px]">
              <div className="p-3 border-b border-gray-200/20 bg-background/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input 
                    type="text" 
                    className="w-full bg-background border border-gray-200/20 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-f1-red/50 font-medium text-foreground"
                    placeholder="Search teams or nationalities..."
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="overflow-y-auto p-2 space-y-1">
                {filteredConstructors.length === 0 ? (
                  <div className="p-4 text-center text-text-muted font-medium">No teams found.</div>
                ) : (
                  filteredConstructors.map(c => (
                    <div 
                      key={c.constructorId}
                      className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${selectedConstructor?.constructorId === c.constructorId ? 'bg-f1-red/10 border border-f1-red/20' : 'hover:bg-background border border-transparent'}`}
                      onClick={() => {
                        setSelectedConstructor(c);
                        setIsTeamOpen(false);
                        setTeamSearch("");
                        setDriverSearch("");
                      }}
                    >
                      <div>
                        <div className="font-extrabold text-foreground">{formatTeamName(c.name)}</div>
                        <div className="text-xs font-bold text-text-muted uppercase tracking-wider">{c.nationality}</div>
                      </div>
                      {selectedConstructor?.constructorId === c.constructorId && (
                        <Check className="w-5 h-5 text-f1-red" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:flex items-center justify-center lg:col-span-2 pt-6">
          <div className="w-12 h-12 rounded-full bg-background border border-gray-200/20 flex items-center justify-center shadow-sm">
            <ChevronRight className="w-6 h-6 text-text-muted" />
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3">2. Select a Driver</label>
          <div className="bg-background border border-gray-200/20 rounded-2xl overflow-hidden h-[400px] flex flex-col relative shadow-inner">
            {!selectedConstructor ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-text-muted">
                <Flag className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-bold text-lg mb-1">Waiting for team selection</p>
                <p className="text-sm">Choose a team to see their historical driver lineup.</p>
              </div>
            ) : loading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <p className="font-bold text-text-muted animate-pulse">Loading drivers for {formatTeamName(selectedConstructor.name)}...</p>
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-gray-200/20 bg-panel">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input 
                      type="text" 
                      className="w-full bg-background border border-gray-200/20 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-f1-red font-medium text-foreground"
                      placeholder={`Search ${drivers.length} drivers...`}
                      value={driverSearch}
                      onChange={(e) => setDriverSearch(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-panel/30">
                  {filteredDrivers.length === 0 ? (
                    <div className="text-center p-8 text-text-muted font-medium bg-background rounded-xl border border-gray-200/10">
                      No drivers match your search.
                    </div>
                  ) : (
                    filteredDrivers.map(driver => (
                      <Link 
                        href={`/drivers/${driver.driverId}`} 
                        key={driver.driverId}
                        className="group block p-4 bg-background rounded-xl border border-gray-200/20 hover:border-f1-red hover:shadow-md transition-all relative overflow-hidden"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-extrabold text-foreground text-lg mb-1 group-hover:text-f1-red transition-colors">
                              {driver.givenName} {driver.familyName}
                            </div>
                            <div className="text-xs font-bold text-text-muted uppercase tracking-widest">
                              {driver.nationality}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-f1-red transition-colors" />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
