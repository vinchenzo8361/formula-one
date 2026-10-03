import React from 'react';
import allTrackData from '../lib/trackData.json';

interface Turn {
  x: number;
  y: number;
  n: number;
}

interface TrackData {
  viewBox: string;
  normalPath: string;
  startFinish?: { x1: number, y1: number, x2: number, y2: number };
  turns?: Turn[];
}

interface TrackMapProps {
  circuitId: string;
  colored?: boolean;
}

export default function TrackMap({ circuitId, colored = false }: TrackMapProps) {
  // Try to find matching circuit in our data, default to generic if not found
  const data = (allTrackData as Record<string, TrackData>)[circuitId] || (allTrackData as Record<string, TrackData>).generic;

  return (
    <svg 
      viewBox={data.viewBox} 
      className="w-full h-auto drop-shadow-xl"
      style={{ filter: colored ? 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' : 'none', transform: 'scale(1.2)', transformOrigin: 'center' }}
    >
      <defs>
        <linearGradient id={`speed-gradient-${circuitId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {colored ? (
        <path 
          d={data.normalPath} 
          stroke={`url(#speed-gradient-${circuitId})`}
          strokeWidth="6" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      ) : (
        <path 
          d={data.normalPath} 
          stroke="currentColor" 
          strokeWidth="6" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      )}
      
      {/* Start/Finish Line (Approximate for visual detail) */}
      {data.startFinish && (
        <g>
          <line 
            x1={data.startFinish.x1} 
            y1={data.startFinish.y1} 
            x2={data.startFinish.x2} 
            y2={data.startFinish.y2} 
            stroke="white" 
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <line 
            x1={data.startFinish.x1 + 2} 
            y1={data.startFinish.y1} 
            x2={data.startFinish.x2 + 2} 
            y2={data.startFinish.y2} 
            stroke="black" 
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </g>
      )}

      {/* Turn Numbers */}
      {data.turns && data.turns.map((turn, i) => (
        <g key={i} transform={`translate(${turn.x}, ${turn.y})`}>
          <circle cx="0" cy="0" r="4" fill="var(--f1-red, #ff1801)" />
          <text 
            x="0" 
            y="1.5" 
            fill="white" 
            fontSize="4" 
            fontWeight="bold" 
            textAnchor="middle"
            className="font-sans"
          >
            {turn.n}
          </text>
        </g>
      ))}
    </svg>
  );
}
