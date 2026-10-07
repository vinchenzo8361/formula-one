import React from 'react';
import { Clock, Zap, Calendar, MapPin, Gauge, Info } from 'lucide-react';

const ON_THIS_DAY_FACTS = [
  "In 1950, the first ever Formula 1 World Championship race was held at Silverstone.",
  "Michael Schumacher won his first ever World Championship in 1994.",
  "Ayrton Senna performed the 'Lap of the Gods' at Donington Park in 1993.",
  "Max Verstappen became the youngest ever F1 race winner at the 2016 Spanish Grand Prix (18 years, 228 days).",
  "Sebastian Vettel clinched his fourth consecutive World Championship in 2013.",
  "Jenson Button won the chaotic and marathon 2011 Canadian Grand Prix.",
  "Lewis Hamilton secured his record-equaling 7th World Championship in 2020.",
  "Niki Lauda made an astonishing comeback at Monza in 1976, just six weeks after his fiery crash at the Nürburgring.",
  "Kimi Räikkönen won the World Championship by a single point in 2007.",
  "Fernando Alonso ended the Michael Schumacher dominance by winning the 2005 World Championship.",
  "Brawn GP won their debut race in 2009, going on to win the championship in their only season.",
  "Juan Manuel Fangio won his legendary fifth World Championship at the Nürburgring in 1957.",
  "Rubens Barrichello won his first race at the 2000 German Grand Prix after starting 18th.",
  "Pierre Gasly secured a shock maiden victory for AlphaTauri at Monza in 2020.",
  "Esteban Ocon won the dramatic 2021 Hungarian Grand Prix for Alpine.",
  "Daniel Ricciardo won the 2018 Monaco Grand Prix despite suffering an MGU-K failure.",
  "George Russell scored his maiden F1 victory at the 2022 São Paulo Grand Prix.",
  "Carlos Sainz won his first race at the 2022 British Grand Prix.",
  "Lando Norris claimed his maiden F1 victory at the 2024 Miami Grand Prix.",
  "Charles Leclerc won the 2019 Italian Grand Prix, sending the Tifosi into a frenzy."
];

export default function SpotlightPage() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const todaysFact = ON_THIS_DAY_FACTS[dayOfYear % ON_THIS_DAY_FACTS.length];

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
                <div className="text-3xl font-black mb-2">1.90s</div>
                <div className="text-sm font-medium">Red Bull Racing</div>
                <div className="text-xs text-text-muted">China Grand Prix, 2024</div>
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
                    Banned in 1983 due to safety concerns over cornering speeds and sudden losses of downforce when skirts failed, ground effect made a triumphant return to F1 in the 2022 regulation overhaul. Modern ground effect uses 3D-sculpted Venturi tunnels without sealing skirts, aiming to produce "cleaner" wake air and allow cars to follow each other more closely to promote better racing.
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
