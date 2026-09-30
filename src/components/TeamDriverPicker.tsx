"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Constructor, Driver } from "@/lib/api";

export default function TeamDriverPicker({ constructors }: { constructors: Constructor[] }) {
  const [selectedConstructor, setSelectedConstructor] = useState<string>("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedConstructor) {
      setDrivers([]);
      return;
    }
    
    async function fetchDrivers() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/constructors/${selectedConstructor}/drivers.json?limit=500`);
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

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-12">
      <h2 className="text-3xl font-extrabold tracking-tight mb-6">Every Driver in History</h2>
      <div className="mb-8">
        <label htmlFor="constructor-select" className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-2">Select a Constructor</label>
        <select 
          id="constructor-select"
          className="w-full md:w-1/2 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-f1-red outline-none text-gray-900 font-medium"
          value={selectedConstructor} 
          onChange={(e) => setSelectedConstructor(e.target.value)}
        >
          <option value="">-- Choose a Constructor --</option>
          {constructors.map(c => (
            <option key={c.constructorId} value={c.constructorId}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading && <div className="text-text-muted font-medium py-8 text-center bg-gray-50 rounded-2xl">Loading drivers...</div>}
      
      {!loading && drivers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {drivers.map(driver => (
            <Link 
              href={`/drivers/${driver.driverId}`} 
              key={driver.driverId}
              className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-f1-red hover:shadow-md transition-all flex flex-col justify-center"
            >
              <div className="font-extrabold text-gray-900 text-lg leading-tight mb-1">{driver.givenName} {driver.familyName}</div>
              <div className="text-sm font-bold text-text-muted uppercase tracking-widest">{driver.nationality}</div>
            </Link>
          ))}
        </div>
      )}
      
      {!loading && selectedConstructor && drivers.length === 0 && (
        <div className="text-text-muted font-medium py-8 text-center bg-gray-50 rounded-2xl">No drivers found for this constructor.</div>
      )}
    </div>
  );
}
