"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function YearSelector({ 
  currentYear,
  validYears 
}: { 
  currentYear: number,
  validYears?: number[] 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedYear = searchParams.get("year") || currentYear.toString();

  const currentYearNumber = new Date().getFullYear();
  let years = validYears;
  if (!years || years.length === 0) {
    years = Array.from({ length: currentYearNumber - 1950 + 1 }, (_, i) => currentYearNumber - i);
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    router.push(`?year=${year}`);
  };

  return (
    <div className="flex items-center gap-4 bg-panel p-4 rounded-2xl shadow-sm border border-gray-200/20">
      <label htmlFor="year-select" className="font-semibold text-foreground whitespace-nowrap">Select Season:</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
        className="bg-background border border-gray-200/20 text-foreground text-sm rounded-xl focus:ring-f1-red focus:border-f1-red block w-full p-2.5 min-w-[120px] cursor-pointer"
      >
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}
