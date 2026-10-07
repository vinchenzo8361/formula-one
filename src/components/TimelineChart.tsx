'use client';

import { useState } from 'react';

const constructorColors: Record<string, string> = {
  red_bull: '#3671C6',
  ferrari: '#E8002D',
  mclaren: '#FF8000',
  mercedes: '#27F4D2',
  aston_martin: '#229971',
  alpine: '#0093CC',
  williams: '#64C4FF',
  rb: '#6692FF',
  sauber: '#52E252',
  haas: '#B6BABD',
  kick_sauber: '#52E252'
};

export default function TimelineChart({ graphData }: { graphData: any }) {
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);

  const { timeline, drivers } = graphData;
  const numDrivers = drivers.length;
  const numRaces = timeline.length;

  const X_OFFSET = 150;
  const X_SPACING = 150;
  const Y_OFFSET = 30;
  const Y_SPACING = 40;

  const svgWidth = X_OFFSET + (numRaces - 1) * X_SPACING + 100;
  const svgHeight = Y_OFFSET + numDrivers * Y_SPACING + 50;

  return (
    <div className="w-full h-full overflow-auto">
      <svg width={svgWidth} height={svgHeight} className="min-w-full">
        {/* Background Grid - Horizontal Lines */}
        {Array.from({ length: numDrivers }).map((_, i) => (
          <line
            key={`h-grid-${i}`}
            x1={0}
            y1={Y_OFFSET + i * Y_SPACING}
            x2={svgWidth}
            y2={Y_OFFSET + i * Y_SPACING}
            className="stroke-gray-300 dark:stroke-gray-800"
            strokeWidth="1"
          />
        ))}

        {/* Zebra striping */}
        {Array.from({ length: numDrivers }).map((_, i) => {
          if (i % 2 === 1) {
            return (
              <rect
                key={`band-${i}`}
                x={0}
                y={Y_OFFSET + (i - 0.5) * Y_SPACING}
                width={svgWidth}
                height={Y_SPACING}
                className="fill-gray-100 dark:fill-[#1a1a1a]"
              />
            );
          }
          return null;
        })}

        {/* Draw X-axis race names */}
        {timeline.map((race: any, i: number) => {
          const x = X_OFFSET + i * X_SPACING;
          return (
            <g key={`race-${i}`}>
              <text
                x={x}
                y={Y_OFFSET - 15}
                textAnchor="middle"
                fontSize="12"
                className="font-mono uppercase fill-gray-600 dark:fill-gray-400"
              >
                {race.raceName.replace('Grand Prix', 'GP')}
              </text>
              <line
                x1={x}
                y1={Y_OFFSET}
                x2={x}
                y2={svgHeight - 20}
                className="stroke-gray-300 dark:stroke-gray-800"
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
                strokeWidth={isHovered ? 6 : 3}
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
                    r={isHovered ? 5 : 3}
                    fill={color}
                    stroke="#111"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Driver Name on the left (at the start) */}
              <text
                x={X_OFFSET - 20}
                y={Y_OFFSET + (driver.history[0].rank - 1) * Y_SPACING + 4}
                textAnchor="end"
                fontSize="14"
                fontWeight="bold"
                className={isHovered ? "fill-black dark:fill-white" : "fill-gray-600 dark:fill-gray-400"}
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
                  fontSize="14"
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
