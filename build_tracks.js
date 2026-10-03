const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { svgPathProperties } = require('svg-path-properties');
const { parseStringPromise } = require('xml2js');

const tracks = [
  { id: 'monza', file: 'monza-7.svg', stats: { length: '5.793 km', lapRecord: '1:21.046 (Barrichello, 2004)', totalTurns: 11, minPitStops: 1 } },
  { id: 'monaco', file: 'monaco-6.svg', stats: { length: '3.337 km', lapRecord: '1:12.909 (Hamilton, 2021)', totalTurns: 19, minPitStops: 1 } },
  { id: 'silverstone', file: 'silverstone-8.svg', stats: { length: '5.891 km', lapRecord: '1:27.097 (Verstappen, 2020)', totalTurns: 18, minPitStops: 1 } },
  { id: 'spa', file: 'spa-francorchamps-4.svg', stats: { length: '7.004 km', lapRecord: '1:46.286 (Bottas, 2018)', totalTurns: 20, minPitStops: 1 } },
  { id: 'suzuka', file: 'suzuka-2.svg', stats: { length: '5.807 km', lapRecord: '1:30.983 (Hamilton, 2019)', totalTurns: 18, minPitStops: 1 } },
  { id: 'bahrain', file: 'bahrain-1.svg', stats: { length: '5.412 km', lapRecord: '1:31.447 (de la Rosa, 2005)', totalTurns: 15, minPitStops: 2 } },
  { id: 'interlagos', file: 'interlagos-2.svg', stats: { length: '4.309 km', lapRecord: '1:10.540 (Bottas, 2018)', totalTurns: 15, minPitStops: 2 } },
  { id: 'americas', file: 'austin-1.svg', stats: { length: '5.513 km', lapRecord: '1:36.169 (Leclerc, 2019)', totalTurns: 20, minPitStops: 2 } },
];

async function main() {
  const result = {};

  for (const track of tracks) {
    console.log(`Processing ${track.id}...`);
    const url = `https://raw.githubusercontent.com/julesr0y/f1-circuits-svg/main/circuits/detailed/white/${track.file}`;
    const response = await axios.get(url);
    const svgStr = response.data;
    
    const parsed = await parseStringPromise(svgStr);
    let pathD = '';
    
    const traverse = (obj) => {
      if (obj.path) {
        if (Array.isArray(obj.path)) {
          pathD = obj.path[0].$.d;
        } else {
          pathD = obj.path.$.d;
        }
        return true;
      }
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          if (traverse(obj[key])) return true;
        }
      }
      return false;
    };
    traverse(parsed);

    if (!pathD) {
      console.error(`Could not find path for ${track.id}`);
      continue;
    }

    const properties = new svgPathProperties(pathD);
    const totalLength = properties.getTotalLength();
    
    const samples = 2000;
    const points = [];
    for (let i = 0; i <= samples; i++) {
      const len = (i / samples) * totalLength;
      points.push(properties.getPointAtLength(len));
    }
    
    const curvatures = [];
    for (let i = 1; i < samples - 1; i++) {
      const p0 = points[i-1];
      const p1 = points[i];
      const p2 = points[i+1];
      
      const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
      const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };
      
      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x*v1.x + v1.y*v1.y);
      const mag2 = Math.sqrt(v2.x*v2.x + v2.y*v2.y);
      
      let angle = Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2))));
      if (isNaN(angle)) angle = 0;
      
      curvatures.push({ index: i, angle, x: p1.x, y: p1.y, len: (i / samples) * totalLength });
    }
    
    let localMaxima = [];
    for (let i = 1; i < curvatures.length - 1; i++) {
      if (curvatures[i].angle > curvatures[i-1].angle && curvatures[i].angle > curvatures[i+1].angle) {
        localMaxima.push(curvatures[i]);
      }
    }
    
    const minDistance = totalLength * 0.015;
    const mergedMaxima = [];
    for (const max of localMaxima) {
      let merged = false;
      for (let j = 0; j < mergedMaxima.length; j++) {
        const other = mergedMaxima[j];
        if (Math.abs(max.len - other.len) < minDistance || Math.abs(max.len - other.len) > totalLength - minDistance) {
          if (max.angle > other.angle) {
            mergedMaxima[j] = max;
          }
          merged = true;
          break;
        }
      }
      if (!merged) mergedMaxima.push(max);
    }
    
    mergedMaxima.sort((a, b) => b.angle - a.angle);
    
    // Fallback: If not enough turns, pad with evenly spaced points along the path
    let topTurns = mergedMaxima.slice(0, track.stats.totalTurns);
    if (topTurns.length < track.stats.totalTurns) {
       let missing = track.stats.totalTurns - topTurns.length;
       for(let i=0; i<missing; i++) {
         const p = properties.getPointAtLength((i / missing) * totalLength);
         topTurns.push({x: p.x, y: p.y, len: (i / missing) * totalLength});
       }
    }

    topTurns.sort((a, b) => a.len - b.len);
    
    const turns = topTurns.map((t, idx) => ({
      n: idx + 1,
      x: Math.round(t.x),
      y: Math.round(t.y)
    }));

    result[track.id] = {
      viewBox: "0 0 500 500",
      normalPath: pathD,
      stats: track.stats,
      turns: turns
    };
  }

  // Generate generic
  result['generic'] = {
    viewBox: "0 0 600 600",
    normalPath: "M 200,500 L 400,500 A 100,100 0 0,0 500,400 L 500,200 A 100,100 0 0,0 400,100 L 200,100 A 100,100 0 0,0 100,200 L 100,400 A 100,100 0 0,0 200,500 Z",
    stats: { length: '5.000 km', lapRecord: '1:30.000', totalTurns: 3, minPitStops: 1 },
    turns: [{"n": 1, "x": 480, "y": 450}, {"n": 2, "x": 450, "y": 150}, {"n": 3, "x": 150, "y": 150}]
  };

  const libDir = path.join(__dirname, 'src', 'lib');
  if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(path.join(libDir, 'trackData.json'), JSON.stringify(result, null, 2));
  console.log('Done!');
}

main().catch(console.error);
