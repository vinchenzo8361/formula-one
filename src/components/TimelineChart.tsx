'use client';

import { useState, useRef, useEffect } from 'react';

const constructorColors: Record<string, string> = {
  red_bull: '#3671C6',
  ferrari: '#E8002D',
  mclaren: '#FF8000',
  mercedes: '#00A19B',
  aston_martin: '#006F62',
  alpine: '#005BB5',
  williams: '#005AFF',
  rb: '#1A2CDE',
  sauber: '#00A000',
  audi: '#00A000',
  haas: '#E6002B',
  cadillac: '#D4AF37',
  kick_sauber: '#00A000'
};

export default function TimelineChart({ graphData }: { graphData: any }) {
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

        const handleWheel = (e: WheelEvent) => {
      // Only hijack vertical scroll (mouse wheel)
      // Trackpads send deltaX for horizontal scrolling natively, so we let that pass through!
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

    const { timeline, drivers } = graphData;
  const maxRank = Math.max(...drivers.flatMap((d: any) => d.history.map((h: any) => h.rank)));
  const numRows = Math.max(drivers.length, maxRank);
  const numRaces = timeline.length;

  const X_OFFSET = 150;
  const X_SPACING = 75;
  const Y_OFFSET = 30;
  const Y_SPACING = 22;

  const svgWidth = X_OFFSET + (numRaces - 1) * X_SPACING + 100;
  const svgHeight = Y_OFFSET + numRows * Y_SPACING + 50;

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar" ref={scrollContainerRef}>
      <svg width={svgWidth} height={svgHeight} className="min-w-full">
        {/* Zebra striping */}
          {Array.from({ length: numRows }).map((_, i) => (
            <rect
              key={`band-${i}`}
              x={0}
              y={Y_OFFSET + (i - 0.5) * Y_SPACING}
              width={svgWidth}
              height={Y_SPACING}
              className={i % 2 === 0 ? "fill-white dark:fill-[#1a1a1a]" : "fill-white dark:fill-[#222]"}
            />
          ))}

        {/* Background Grid - Horizontal Lines */}
        {Array.from({ length: numRows }).map((_, i) => (
          <line
            key={`h-grid-${i}`}
            x1={0}
            y1={Y_OFFSET + i * Y_SPACING}
            x2={svgWidth}
            y2={Y_OFFSET + i * Y_SPACING}
            className="stroke-gray-200 dark:stroke-gray-800"
            strokeWidth="1"
          />
        ))}

        {/* Draw X-axis race names */}
        {timeline.map((race: any, i: number) => {
          const x = X_OFFSET + i * X_SPACING;
          
          let namePart1 = race.raceName;
          let namePart2 = '';
          if (race.raceName.includes('Grand Prix')) {
            namePart1 = race.raceName.split('Grand Prix')[0].trim();
            namePart2 = 'Grand Prix';
          } else if (race.raceName.includes('GP')) {
            namePart1 = race.raceName.split('GP')[0].trim();
            namePart2 = 'GP';
          }

          return (
            <g key={`race-${i}`}>
              <text
                textAnchor="middle"
                fontSize="11"
                className="font-mono uppercase fill-gray-800 dark:fill-gray-400"
              >
                {namePart2 ? (
                  <>
                    <tspan x={x} y={Y_OFFSET - 20}>{namePart1}</tspan>
                    <tspan x={x} y={Y_OFFSET - 8}>{namePart2}</tspan>
                  </>
                ) : (
                  <tspan x={x} y={Y_OFFSET - 15}>{namePart1}</tspan>
                )}
              </text>
              <line
                x1={x}
                y1={Y_OFFSET}
                x2={x}
                y2={svgHeight - 20}
                className="stroke-gray-200 dark:stroke-gray-800"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </g>
          );
        })}

        {/* Draw lines and markers */}
        {drivers.map((driver: any) => {
          const color = constructorColors[driver.constructorId] || '#999';
          const isHovered = hoveredDriver === driver.driverId;
          const isFaded = hoveredDriver !== null && !isHovered;
          const lastHistoryIndex = driver.history.length - 1;

          const points = driver.history.map((h: any, i: number) => {
            const x = X_OFFSET + i * X_SPACING;
            const y = Y_OFFSET + (h.rank - 1) * Y_SPACING;
            return `${x},${y}`;
          }).join(' ');

          return (
            <g 
              key={`driver-${driver.driverId}`}
              onMouseEnter={() => setHoveredDriver(driver.driverId)}
              onMouseLeave={() => setHoveredDriver(null)}
              style={{
                opacity: isFaded ? 0.2 : 1,
                transition: 'opacity 0.2s',
                cursor: 'pointer'
              }}
            >
              <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth={isHovered ? 4 : 2}
                strokeLinejoin="round"
              />
              
              {driver.history.map((h: any, i: number) => {
                const x = X_OFFSET + i * X_SPACING;
                const y = Y_OFFSET + (h.rank - 1) * Y_SPACING;
                return (
                  <circle
                    key={`dot-${i}`}
                    cx={x}
                    cy={y}
                    r={isHovered ? 5.5 : 3.5}
                    fill={color}
                    className="stroke-white dark:stroke-[#111]"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Driver Name on the left (at the start) */}
              <text
                x={X_OFFSET - 20}
                y={Y_OFFSET + (driver.history[0].rank - 1) * Y_SPACING + 4}
                textAnchor="end"
                fontSize="11"
                fontWeight="bold"
                className={isHovered ? "fill-black dark:fill-white" : "fill-gray-800 dark:fill-gray-400"}
              >
                {driver.familyName}
              </text>

              {/* Team Color Box */}
              <rect
                x={X_OFFSET - 15}
                y={Y_OFFSET + (driver.history[0].rank - 1) * Y_SPACING - 6}
                width={8}
                height={8}
                fill={color}
              />

              {/* End Rank text (at the end) */}
              {isHovered && (
                <text
                  x={X_OFFSET + lastHistoryIndex * X_SPACING + 15}
                  y={Y_OFFSET + (driver.history[lastHistoryIndex].rank - 1) * Y_SPACING + 4}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="bold"
                  className="fill-black dark:fill-white"
                >
                  P{driver.history[lastHistoryIndex].rank} ({driver.cumulativePoints} pts)
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}


















