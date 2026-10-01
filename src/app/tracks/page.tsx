import { MapPin, Navigation2, Target } from "lucide-react";
import Image from "next/image";

export default function TracksPage() {
  return (
    <div className="flex-1 bg-panel min-h-screen text-foreground selection:bg-f1-red selection:text-white">
      {/* Header */}
      <div className="relative bg-black text-white py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-f1-red via-black to-black"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <MapPin className="w-16 h-16 text-f1-red mb-6" />
          <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
            Iconic <span className="text-f1-red">Tracks</span>
          </h1>
          <p className="text-2xl text-gray-300 font-medium max-w-2xl leading-relaxed">
            Mastering the racing line, braking zones, and DRS detection points across the world&apos;s most demanding circuits.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 space-y-24">
        {/* Guide */}
        <section className="bg-background border border-gray-200/20 p-8 rounded-3xl shadow-sm">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-4 flex items-center gap-3">
            <Navigation2 className="text-f1-red" /> Understanding the Racing Line
          </h2>
          <p className="text-lg text-text-muted mb-6">
            The ideal racing line is the quickest path through a corner. It minimizes the severity of the turn, allowing the driver to carry maximum speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-xl">
              <strong className="text-green-400 block mb-1">Green Zone (Throttle)</strong>
              <span className="text-sm text-text-muted">Full acceleration areas. Maximizing exit speed from corners to carry speed down the straights.</span>
            </div>
            <div className="flex-1 bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <strong className="text-yellow-400 block mb-1">Yellow Zone (Trail Braking/Coast)</strong>
              <span className="text-sm text-text-muted">Easing off the brakes while turning into the apex. Managing weight transfer.</span>
            </div>
            <div className="flex-1 bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-xl">
              <strong className="text-red-400 block mb-1">Red Zone (Heavy Braking)</strong>
              <span className="text-sm text-text-muted">Maximum deceleration in a straight line before corner entry. High G-forces.</span>
            </div>
          </div>
        </section>

        {/* Monza */}
        <section className="space-y-8">
          <div className="border-b-4 border-f1-red pb-4 flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tight">Monza</h2>
              <p className="text-xl text-text-muted mt-2">Autodromo Nazionale di Monza, Italy</p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-f1-red font-bold text-lg">Temple of Speed</div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl flex justify-center shadow-inner">
             {/* Use Wikimedia svg for Monza */}
             <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Monza_track_map.svg" alt="Monza Track Map" className="w-full max-w-xl invert-0" style={{ filter: 'brightness(0)' }} />
          </div>

          <div className="prose prose-lg prose-gray max-w-none text-foreground">
            <h3 className="text-2xl font-bold">Key Characteristics</h3>
            <p>
              Monza is the fastest circuit on the calendar, demanding the lowest downforce setups. Cars spend nearly 80% of the lap at full throttle (Green Zone), reaching speeds in excess of 340 km/h.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-red-500"/> Turn 1 (Rettifilo Chicane)</h4>
                <p className="text-text-muted text-base">
                  One of the heaviest braking zones in F1. Cars decelerate from 340 km/h to 80 km/h in just 120 meters. Hitting the Red Zone perfectly here is crucial for overtaking.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-yellow-500"/> Turn 11 (Parabolica)</h4>
                <p className="text-text-muted text-base">
                  A long, sweeping right-hander that requires careful trail braking on entry and early throttle application to maximize speed down the massive main straight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spa */}
        <section className="space-y-8">
          <div className="border-b-4 border-f1-red pb-4 flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tight">Spa-Francorchamps</h2>
              <p className="text-xl text-text-muted mt-2">Circuit de Spa-Francorchamps, Belgium</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl flex justify-center shadow-inner">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Spa-Francorchamps_of_Belgium.svg" alt="Spa Track Map" className="w-full max-w-xl" style={{ filter: 'brightness(0)' }} />
          </div>

          <div className="prose prose-lg prose-gray max-w-none text-foreground">
            <h3 className="text-2xl font-bold">Key Characteristics</h3>
            <p>
              The longest circuit on the calendar at 7.004 km, Spa features dramatic elevation changes, unpredictable weather, and requires a delicate balance between straight-line speed and high-speed cornering grip.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-green-500"/> Eau Rouge & Raidillon</h4>
                <p className="text-text-muted text-base">
                  The most famous corner sequence in motorsport. A steep downhill left-hander (Eau Rouge) immediately followed by a blind uphill right-left sweep (Raidillon). In dry conditions, modern F1 cars take this entirely flat-out (Green Zone).
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-red-500"/> Les Combes</h4>
                <p className="text-text-muted text-base">
                  At the end of the massive Kemmel Straight (a prime DRS zone), drivers hit the brakes hard for this right-left-right chicane. It&apos;s the best overtaking opportunity on the track.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Silverstone */}
        <section className="space-y-8">
          <div className="border-b-4 border-f1-red pb-4 flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tight">Silverstone</h2>
              <p className="text-xl text-text-muted mt-2">Silverstone Circuit, Great Britain</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl flex justify-center shadow-inner">
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Silverstone_Circuit_2020.svg" alt="Silverstone Track Map" className="w-full max-w-xl" style={{ filter: 'brightness(0)' }} />
          </div>

          <div className="prose prose-lg prose-gray max-w-none text-foreground">
            <h3 className="text-2xl font-bold">Key Characteristics</h3>
            <p>
              The birthplace of the Formula 1 World Championship. Silverstone is a high-speed, flowing circuit that places immense lateral loads on the tires. Aerodynamic efficiency and high-speed stability are paramount here.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-green-500"/> Maggotts, Becketts & Chapel</h4>
                <p className="text-text-muted text-base">
                  A phenomenal sequence of sweeping, high-speed left-right-left-right-left turns. Drivers barely touch the brakes, relying entirely on downforce to stick the car to the track before catapulting onto the Hangar Straight.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-red-500"/> Stowe</h4>
                <p className="text-text-muted text-base">
                  Approached at nearly 330 km/h, Stowe requires a brief but firm dab of the brakes before turning right at very high speeds. It demands absolute confidence in the car&apos;s rear end.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Monaco */}
        <section className="space-y-8">
          <div className="border-b-4 border-f1-red pb-4 flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tight">Monaco</h2>
              <p className="text-xl text-text-muted mt-2">Circuit de Monaco, Monte Carlo</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl flex justify-center shadow-inner">
             <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Monte_Carlo_Formula_1_track_map.svg" alt="Monaco Track Map" className="w-full max-w-xl" style={{ filter: 'brightness(0)' }} />
          </div>

          <div className="prose prose-lg prose-gray max-w-none text-foreground">
            <h3 className="text-2xl font-bold">Key Characteristics</h3>
            <p>
              The crown jewel of F1. Monaco is incredibly tight, twisty, and punishing, surrounded by unforgiving barriers. It requires maximum downforce setups and absolute precision from the drivers, as overtaking is nearly impossible.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-yellow-500"/> The Hairpin (Fairmont)</h4>
                <p className="text-text-muted text-base">
                  The slowest corner on the entire F1 calendar. Cars drop to around 45 km/h, requiring maximum steering lock to navigate the tight left-hand hairpin.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-red-500"/> Nouvelle Chicane</h4>
                <p className="text-text-muted text-base">
                  After exiting the incredibly fast, blind tunnel, drivers face a bumpy, heavy braking zone into a left-right chicane. It is essentially the only viable overtaking spot on the circuit.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
