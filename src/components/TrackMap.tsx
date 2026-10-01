import React from 'react';

interface TrackMapProps {
  circuitId: string;
  colored?: boolean;
}

const trackData: Record<string, {
  viewBox: string;
  normalPath: string;
  coloredPaths: React.ReactNode;
}> = {
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
    )
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
    )
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
    )
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
    )
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
    )
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
    </svg>
  );
}
