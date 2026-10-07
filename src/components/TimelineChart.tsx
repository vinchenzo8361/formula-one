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
  const X_SPACING = 120;
  const Y_OFFSET = 50;
  const Y_SPACING = 30;

  const svgWidth = X_OFFSET + (numRaces - 1) * X_SPACING + 100;
  const svgHeight = Y_OFFSET + numDrivers * Y_SPACING + 50;

  return (
    <div className="w-full h-full overflow-auto">
      <svg width={svgWidth} height={svgHeight} className="min-w-full">
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
                fill="#888"
                className="font-mono uppercase"
              >
                {race.raceName.replace('Grand Prix', 'GP')}
              </text>
              <line
                x1={x}
                y1={Y_OFFSET}
                x2={x}
                y2={svgHeight - 20}
                stroke="#333"
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
                fill={isHovered ? '#fff' : '#ccc'}
              >
                {driver.familyName}
              </text>

              {/* End Rank text (at the end) */}
              {isHovered && (
                <text
                  x={X_OFFSET + (numRaces - 1) * X_SPACING + 15}
                  y={Y_OFFSET + (driver.history[numRaces - 1].rank - 1) * Y_SPACING + 4}
                  textAnchor="start"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#fff"
                >
                  P{driver.history[numRaces - 1].rank} ({driver.cumulativePoints} pts)
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
