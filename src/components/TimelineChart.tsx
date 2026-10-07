'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const constructorColorsLight: Record<string, string> = {
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

const constructorColorsDark: Record<string, string> = {
  red_bull: '#3671C6',
  ferrari: '#E8002D',
  mclaren: '#FF8000',
  mercedes: '#27F4D2',
  aston_martin: '#229971',
  alpine: '#0093CC',
  williams: '#64C4FF',
  rb: '#6692FF',
  sauber: '#52E252',
  audi: '#52E252',
  haas: '#B6BABD',
  cadillac: '#FFD700',
  kick_sauber: '#52E252'
};

export default function TimelineChart({ graphData }: { graphData: any }) {
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const { timeline, drivers } = graphData;
  const numRows = drivers.length;
  const numRaces = timeline.length;

  const X_OFFSET = 150;
  const X_SPACING = 81;
  const Y_OFFSET = 30;
  const Y_SPACING = 26;

  const svgWidth = X_OFFSET + (numRaces - 1) * X_SPACING + 100;
  const svgHeight = Y_OFFSET + numRows * Y_SPACING + 47;

  // We rely on CSS variables for flawless theme syncing, avoiding hydration bugs entirely.
  // Check globals.css for --tl-* variables.
  
  // Note: We'll fallback to a neutral color scheme for the actual F1 teams if SSR hasn't mounted yet,
  // but CSS vars handle the background seamlessly.
  const { resolvedTheme } = useTheme();
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const colors = isDark ? constructorColorsDark : constructorColorsLight;

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar" ref={scrollContainerRef}>
      <svg width={svgWidth} height={svgHeight} className="min-w-full">
        {/* Full SVG Background to prevent container bleed-through */}
        <rect x={0} y={0} width={svgWidth} height={svgHeight} fill="var(--tl-bg-even)" />
        {/* Background striping */}
        {Array.from({ length: numRows }).map((_, i) => (
          <rect
            key={"band-" + i}
            x={0}
            y={Y_OFFSET + (i - 0.5) * Y_SPACING}
            width={svgWidth}
            height={Y_SPACING}
            fill={i % 2 === 0 ? "var(--tl-bg-even)" : "var(--tl-bg-odd)"}
          />
        ))}

        {/* Note: Horizontal Grid Lines completely removed per user request */}

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
            <g key={"race-" + i}>
              <text
                textAnchor="middle"
                fontSize="11"
                fill="var(--tl-text)"
                className="font-mono uppercase"
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
                stroke="var(--tl-grid-v)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </g>
          );
        })}

        {/* Draw lines and markers */}
        {drivers.map((driver: any) => {
          const color = colors[driver.constructorId] || '#999';
          const isHovered = hoveredDriver === driver.driverId;
          const isFaded = hoveredDriver !== null && !isHovered;
          const lastHistoryIndex = driver.history.length - 1;

          const points = driver.history.map((h: any, i: number) => {
            const x = X_OFFSET + i * X_SPACING;
            const y = Y_OFFSET + (h.rank - 1) * Y_SPACING;
            return x + ',' + y;
          }).join(' ');

          return (
            <g 
              key={"driver-" + driver.driverId}
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
                    key={"dot-" + i}
                    cx={x}
                    cy={y}
                    r={isHovered ? 5.5 : 3.5}
                    fill={color}
                    stroke="var(--tl-circle)"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Driver Name on the left */}
              <text
                x={X_OFFSET - 20}
                y={Y_OFFSET + (driver.history[0].rank - 1) * Y_SPACING + 4}
                textAnchor="end"
                fontSize="11"
                fontWeight="bold"
                fill={isHovered ? "var(--tl-text-hover)" : "var(--tl-text)"}
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

              {/* End Rank text */}
              {isHovered && (
                <text
                  x={X_OFFSET + lastHistoryIndex * X_SPACING + 15}
                  y={Y_OFFSET + (driver.history[lastHistoryIndex].rank - 1) * Y_SPACING + 4}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="bold"
                  fill="var(--tl-text-hover)"
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




