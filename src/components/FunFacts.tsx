"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";

export default function FunFacts({ facts }: { facts: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <div className="bg-panel rounded-3xl p-6 shadow-sm border border-gray-200/20">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-f1-red shrink-0 mt-1" />
        <div>
          <span className="font-bold text-f1-red mr-2">Fun Fact:</span>
          <span className="text-foreground font-medium transition-opacity duration-500">{facts[index]}</span>
        </div>
      </div>
    </div>
  );
}
