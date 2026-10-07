import React from 'react';
import { Clock, Zap, Calendar, MapPin, Gauge, Info } from 'lucide-react';

const HISTORICAL_FACTS: Record<string, string> = {
  "10-07": "In 2012, Kamui Kobayashi scored his first and only F1 podium in front of a home crowd at the Japanese Grand Prix in Suzuka.",
  "10-08": "In 2000, Michael Schumacher won the Japanese GP, securing Ferrari's first Drivers' Championship in 21 years.",
  "10-09": "In 2011, Sebastian Vettel secured his second World Championship at Suzuka.",
  "10-10": "In 1999, the first ever Malaysian Grand Prix was held at the newly built Sepang International Circuit.",
  "10-11": "In 2020, Lewis Hamilton won the Eifel Grand Prix, officially equaling Michael Schumacher's all-time record of 91 wins.",
  "10-12": "In 2003, Michael Schumacher clinched his record-breaking sixth World Championship at Suzuka.",
  "10-13": "In 2013, Sebastian Vettel won the Japanese Grand Prix, continuing his dominant run of nine consecutive wins that season.",
  "10-14": "In 2012, Sebastian Vettel won the Korean Grand Prix, taking the championship lead from Fernando Alonso.",
  "10-15": "In 2006, Fernando Alonso essentially secured his second World Championship after Michael Schumacher suffered an engine failure at Suzuka."
};

export default function SpotlightPage() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateKey = `${month}-${day}`;
  const todaysFact = HISTORICAL_FACTS[dateKey] || "On this day in motorsport history, legendary teams and drivers continued to push the absolute limits of engineering and human endurance.";

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
          <Zap className="w-12 h-12 text-f1-red" />
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-f1-red">Spotlight</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pitstop Tracker */}
          <div className="col-span-1 lg:col-span-1 bg-panel border-2 border-f1-red rounded-xl p-6 shadow-[0_0_15px_rgba(255,24,1,0.2)] hover:shadow-[0_0_25px_rgba(255,24,1,0.4)] transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-f1-red" />
              <h2 className="text-2xl font-bold uppercase">Pitstop Tracker</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="text-sm text-text-muted uppercase font-semibold mb-1">All-Time World Record</div>
                <div className="text-4xl font-black text-f1-red mb-2">1.80s</div>
                <div className="text-sm font-medium">McLaren F1 Team</div>
                <div className="text-xs text-text-muted">Qatar Grand Prix, 2023</div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="text-sm text-text-muted uppercase font-semibold mb-1">Current Season Fastest</div>
                <div className="text-3xl font-black mb-2">1.99s</div>
                <div className="text-sm font-medium">Racing Bulls</div>
                <div className="text-xs text-text-muted">2026 Season</div>
              </div>
            </div>
          </div>

          {/* On This Day */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-f1-red/20 to-panel border-2 border-f1-red rounded-xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Calendar className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-f1-red" />
                <h2 className="text-2xl font-bold uppercase text-f1-red">On This Day</h2>
              </div>
              <div className="text-lg font-medium text-text-muted mb-2">
                {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </div>
              <p className="text-xl md:text-3xl font-bold leading-tight mt-4">
                {todaysFact}
              </p>
            </div>
          </div>

          {/* Technical Spotlight */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-panel border border-border rounded-xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
              <Gauge className="w-8 h-8 text-f1-red" />
              <h2 className="text-2xl font-bold uppercase">Technical Spotlight: Ground Effect</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-text-muted mb-4 font-medium">
                The revolution of aerodynamic downforce that changed Formula 1 forever.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">
                    Ground effect in Formula 1 refers to the creation of downforce through the management of air flowing underneath the car. Introduced by Colin Chapman and his Lotus team in the late 1970s with the iconic Lotus 78, this aerodynamic philosophy transformed cornering speeds.
                  </p>
                  <p>
                    By shaping the underside of the car into inverted aerofoils (Venturi tunnels) and sealing the edges with sliding skirts, air accelerating under the car created an immense low-pressure zone. This literally sucked the car to the track surface, allowing drivers to take corners at unprecedented and, at the time, dangerous speeds.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6 border-l-4 border-f1-red">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-f1-red" /> The 2022 Return
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Banned in 1983 due to safety concerns over cornering speeds and sudden losses of downforce when skirts failed, ground effect made a triumphant return to F1 in the 2022 regulation overhaul. Modern ground effect uses 3D-sculpted Venturi tunnels without sealing skirts, aiming to produce "cleaner" wake air and allow cars to follow each other more closely to promote better racing. To enforce ride height limits and prevent cars from bottoming out dangerously while using ground effect aerodynamics, a "wooden board" (the Jabroc skid block/plank) was introduced in 1994.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Circuit Spotlight */}
          <div className="col-span-1 lg:col-span-1 bg-panel border border-border rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
              <MapPin className="w-8 h-8 text-f1-red" />
              <h2 className="text-2xl font-bold uppercase">Circuit Spotlight</h2>
            </div>
            
            <div className="flex-1">
              <h3 className="text-3xl font-black text-f1-red mb-2">Spa-Francorchamps</h3>
              <p className="text-sm font-semibold uppercase text-text-muted mb-6">Stavelot, Belgium</p>
              
              <p className="text-sm leading-relaxed mb-6">
                Nestled in the Ardennes forest, Spa-Francorchamps is widely considered one of the greatest race tracks in the world. Its unpredictable weather and challenging high-speed layout make it a true driver's circuit.
              </p>

              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-text-muted border-b border-border pb-2">Legendary Corners</h4>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-f1-red/10 flex items-center justify-center shrink-0">
                    <span className="text-f1-red font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-bold">Eau Rouge / Raidillon</div>
                    <div className="text-xs text-text-muted">A terrifyingly fast, blind uphill sweep that compresses drivers into their seats.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-f1-red/10 flex items-center justify-center shrink-0">
                    <span className="text-f1-red font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-bold">Pouhon</div>
                    <div className="text-xs text-text-muted">A long, double-apex left-hander taken at breath-taking speeds.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

