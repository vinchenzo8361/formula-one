"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function YearSelector({ currentYear }: { currentYear: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedYear = searchParams.get("year") || currentYear.toString();

  const currentYearNumber = new Date().getFullYear();
  // Array from current year down to 1950
  const years = Array.from({ length: currentYearNumber - 1950 + 1 }, (_, i) => currentYearNumber - i);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    router.push(`?year=${year}`);
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <label htmlFor="year-select" className="font-semibold text-gray-700 whitespace-nowrap">Select Season:</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-f1-red focus:border-f1-red block w-full p-2.5 min-w-[120px] cursor-pointer"
      >
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}
