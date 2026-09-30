"use client";
import { useEffect, useState } from "react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center mt-4">
      <div className="flex flex-col items-center w-12">
        <span className="text-3xl font-bold text-f1-red">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Days</span>
      </div>
      <span className="text-3xl font-bold text-gray-300">:</span>
      <div className="flex flex-col items-center w-12">
        <span className="text-3xl font-bold text-f1-red">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Hrs</span>
      </div>
      <span className="text-3xl font-bold text-gray-300">:</span>
      <div className="flex flex-col items-center w-12">
        <span className="text-3xl font-bold text-f1-red">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Min</span>
      </div>
      <span className="text-3xl font-bold text-gray-300">:</span>
      <div className="flex flex-col items-center w-12">
        <span className="text-3xl font-bold text-f1-red">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Sec</span>
      </div>
    </div>
  );
}
