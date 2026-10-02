import React from 'react';

interface Turn {
  x: number;
  y: number;
  n: number;
}

interface TrackData {
  viewBox: string;
  normalPath: string;
  coloredPaths: React.ReactNode;
  startFinish?: { x1: number, y1: number, x2: number, y2: number };
  turns?: Turn[];
}

interface TrackMapProps {
  circuitId: string;
  colored?: boolean;
}

const trackData: Record<string, TrackData> = {
  monza: {
    viewBox: "0 0 1000 600",
    normalPath: "M 200,450 L 700,450 A 100,100 0 0,0 800,350 L 900,150 A 50,50 0 0,0 850,100 L 250,100 A 50,50 0 0,0 200,150 L 100,300 A 50,50 0 0,0 150,350 L 200,350 A 50,50 0 0,1 250,400 L 200,450 Z",
    coloredPaths: (
      <>
        <path d="M 200,450 L 700,450" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 700,450 A 100,100 0 0,0 800,350" stroke="#ef4444" strokeWidth="24" fill="none" />
        <path d="M 800,350 L 900,150" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 900,150 A 50,50 0 0,0 850,100" stroke="#eab308" strokeWidth="24" fill="none" />
        <path d="M 850,100 L 250,100" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 250,100 A 50,50 0 0,0 200,150" stroke="#ef4444" strokeWidth="24" fill="none" />
        <path d="M 200,150 L 100,300" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 100,300 A 50,50 0 0,0 150,350 L 200,350 A 50,50 0 0,1 250,400 L 200,450 Z" stroke="#eab308" strokeWidth="24" fill="none" />
      </>
    ),
    startFinish: { x1: 300, y1: 435, x2: 300, y2: 465 },
    turns: [{"x": 750, "y": 450, "n": 1}, {"x": 850, "y": 120, "n": 4}, {"x": 200, "y": 110, "n": 8}],
  },
  silverstone: {
    viewBox: "0 0 1000 800",
    normalPath: "M 300,700 L 600,700 L 800,500 L 700,300 L 800,200 L 600,100 L 300,200 L 100,400 L 200,600 Z",
    coloredPaths: (
      <>
        <path d="M 300,700 L 600,700" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 600,700 L 800,500" stroke="#eab308" strokeWidth="24" fill="none" />
        <path d="M 800,500 L 700,300" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 700,300 L 800,200" stroke="#ef4444" strokeWidth="24" fill="none" />
        <path d="M 800,200 L 600,100" stroke="#eab308" strokeWidth="24" fill="none" />
        <path d="M 600,100 L 300,200" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 300,200 L 100,400" stroke="#ef4444" strokeWidth="24" fill="none" />
        <path d="M 100,400 L 200,600" stroke="#22c55e" strokeWidth="24" fill="none" />
        <path d="M 200,600 L 300,700" stroke="#eab308" strokeWidth="24" fill="none" />
      </>
    ),
    startFinish: { x1: 450, y1: 685, x2: 450, y2: 715 },
    turns: [{"x": 650, "y": 680, "n": 1}, {"x": 780, "y": 450, "n": 3}, {"x": 600, "y": 150, "n": 9}, {"x": 150, "y": 420, "n": 15}],
  },
  monaco: {
    viewBox: "0 0 800 600",
    normalPath: "M 200,400 L 400,350 L 600,450 L 700,300 L 500,200 L 450,100 L 300,150 L 100,250 Z",
    coloredPaths: (
      <>
        <path d="M 200,400 L 400,350" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 400,350 L 600,450" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 600,450 L 700,300" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 700,300 L 500,200" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 500,200 L 450,100" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 450,100 L 300,150" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 300,150 L 100,250" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 100,250 L 200,400" stroke="#ef4444" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 300, y1: 360, x2: 310, y2: 390 },
    turns: [{"x": 420, "y": 380, "n": 1}, {"x": 680, "y": 350, "n": 8}, {"x": 280, "y": 180, "n": 15}],
  },
  spa: {
    viewBox: "0 0 800 800",
    normalPath: "M 300,700 L 400,500 L 600,600 L 700,400 L 600,200 L 400,100 L 200,300 L 100,500 Z",
    coloredPaths: (
      <>
        <path d="M 300,700 L 400,500" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 400,500 L 600,600" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 600,600 L 700,400" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 700,400 L 600,200" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 600,200 L 400,100" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 400,100 L 200,300" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 200,300 L 100,500" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 100,500 L 300,700" stroke="#22c55e" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 290, y1: 690, x2: 310, y2: 720 },
    turns: [{"x": 380, "y": 550, "n": 1}, {"x": 650, "y": 550, "n": 8}, {"x": 250, "y": 250, "n": 14}],
  },
  suzuka: {
    viewBox: "0 0 800 600",
    normalPath: "M 200,300 Q 150,100 300,150 T 400,250 T 500,150 T 700,300 T 500,450 T 300,350 Z",
    coloredPaths: (
      <>
        <path d="M 200,300 Q 150,100 300,150 T 400,250" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 400,250 T 500,150 T 700,300" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 700,300 T 500,450" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 500,450 T 300,350" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 300,350 L 200,300" stroke="#eab308" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 250, y1: 280, x2: 260, y2: 320 },
    turns: [{"x": 180, "y": 180, "n": 1}, {"x": 450, "y": 200, "n": 8}, {"x": 650, "y": 350, "n": 13}],
  },
  interlagos: {
    viewBox: "0 0 800 600",
    normalPath: "M 200,200 L 150,400 C 150,500 300,550 400,500 L 600,300 C 650,200 550,150 500,200 L 400,300 Z",
    coloredPaths: (
      <>
        <path d="M 200,200 L 150,400" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 150,400 C 150,500 300,550 400,500" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 400,500 L 600,300" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 600,300 C 650,200 550,150 500,200" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 500,200 L 400,300 L 200,200" stroke="#eab308" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 220, y1: 240, x2: 190, y2: 250 },
    turns: [{"x": 180, "y": 450, "n": 1}, {"x": 450, "y": 480, "n": 4}, {"x": 580, "y": 220, "n": 12}],
  },
  americas: {
    viewBox: "0 0 800 600",
    normalPath: "M 300,500 L 150,300 L 250,150 Q 400,100 500,250 T 700,300 L 600,500 Z",
    coloredPaths: (
      <>
        <path d="M 300,500 L 150,300" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 150,300 L 250,150" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 250,150 Q 400,100 500,250" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 500,250 T 700,300" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 700,300 L 600,500 L 300,500" stroke="#eab308" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 220, y1: 390, x2: 240, y2: 410 },
    turns: [{"x": 180, "y": 250, "n": 1}, {"x": 400, "y": 180, "n": 11}, {"x": 650, "y": 400, "n": 12}],
  },
  albert_park: {
    viewBox: "0 0 800 600",
    normalPath: "M 200,450 L 400,500 L 600,400 L 650,200 L 450,150 L 250,200 Z",
    coloredPaths: (
      <>
        <path d="M 200,450 L 400,500" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 400,500 L 600,400" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 600,400 L 650,200" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 650,200 L 450,150" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 450,150 L 250,200" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 250,200 L 200,450" stroke="#eab308" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 300, y1: 460, x2: 290, y2: 490 },
    turns: [{"x": 450, "y": 480, "n": 1}, {"x": 620, "y": 300, "n": 9}, {"x": 350, "y": 150, "n": 13}],
  },
  bahrain: {
    viewBox: "0 0 800 800",
    normalPath: "M 400,700 L 200,500 Q 150,300 300,200 L 500,150 Q 700,200 650,400 L 600,600 Z",
    coloredPaths: (
      <>
        <path d="M 400,700 L 200,500" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 200,500 Q 150,300 300,200" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 300,200 L 500,150" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 500,150 Q 700,200 650,400" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 650,400 L 600,600 L 400,700" stroke="#eab308" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 290, y1: 610, x2: 310, y2: 590 },
    turns: [{"x": 220, "y": 400, "n": 1}, {"x": 400, "y": 160, "n": 10}, {"x": 620, "y": 500, "n": 14}],
  },
  jeddah: {
    viewBox: "0 0 400 800",
    normalPath: "M 200,700 C 150,600 150,400 200,300 C 250,200 250,100 200,50 C 150,100 100,200 150,300 C 100,400 100,600 150,700 Z",
    coloredPaths: (
      <>
        <path d="M 200,700 C 150,600 150,400 200,300" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 200,300 C 250,200 250,100 200,50" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 200,50 C 150,100 100,200 150,300" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 150,300 C 100,400 100,600 150,700" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 150,700 L 200,700" stroke="#eab308" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 165, y1: 650, x2: 185, y2: 650 },
    turns: [{"x": 190, "y": 500, "n": 1}, {"x": 220, "y": 200, "n": 13}, {"x": 130, "y": 300, "n": 22}],
  },
  generic: {
    viewBox: "0 0 600 600",
    normalPath: "M 200,500 L 400,500 A 100,100 0 0,0 500,400 L 500,200 A 100,100 0 0,0 400,100 L 200,100 A 100,100 0 0,0 100,200 L 100,400 A 100,100 0 0,0 200,500 Z",
    coloredPaths: (
      <>
        <path d="M 200,500 L 400,500" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 400,500 A 100,100 0 0,0 500,400" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 500,400 L 500,200" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 500,200 A 100,100 0 0,0 400,100" stroke="#eab308" strokeWidth="20" fill="none" />
        <path d="M 400,100 L 200,100" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 200,100 A 100,100 0 0,0 100,200" stroke="#ef4444" strokeWidth="20" fill="none" />
        <path d="M 100,200 L 100,400" stroke="#22c55e" strokeWidth="20" fill="none" />
        <path d="M 100,400 A 100,100 0 0,0 200,500" stroke="#eab308" strokeWidth="20" fill="none" />
      </>
    ),
    startFinish: { x1: 300, y1: 485, x2: 300, y2: 515 },
    turns: [{"x": 480, "y": 450, "n": 1}, {"x": 450, "y": 150, "n": 2}, {"x": 150, "y": 150, "n": 3}],
  }
};

export default function TrackMap({ circuitId, colored = false }: TrackMapProps) {
  const data = trackData[circuitId] || trackData.generic;

  return (
    <svg 
      viewBox={data.viewBox} 
      className="w-full h-auto drop-shadow-xl"
      style={{ filter: colored ? 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' : 'none' }}
    >
      {colored ? (
        data.coloredPaths
      ) : (
        <path 
          d={data.normalPath} 
          stroke="currentColor" 
          strokeWidth="24" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      )}
      
      {/* Start/Finish Line */}
      {data.startFinish && (
        <g>
          <line 
            x1={data.startFinish.x1} 
            y1={data.startFinish.y1} 
            x2={data.startFinish.x2} 
            y2={data.startFinish.y2} 
            stroke="white" 
            strokeWidth="8"
            strokeDasharray="4 4"
          />
          <line 
            x1={data.startFinish.x1 + 4} 
            y1={data.startFinish.y1} 
            x2={data.startFinish.x2 + 4} 
            y2={data.startFinish.y2} 
            stroke="black" 
            strokeWidth="8"
            strokeDasharray="4 4"
          />
        </g>
      )}

      {/* Turn Numbers */}
      {data.turns && data.turns.map((turn, i) => (
        <g key={i} transform={`translate(${turn.x}, ${turn.y})`}>
          <circle cx="0" cy="0" r="16" fill="var(--f1-red, #ff1801)" />
          <text 
            x="0" 
            y="5" 
            fill="white" 
            fontSize="16" 
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
