"use client";

import { BookOpen, Zap, Wind, ShieldCheck, Wrench, Navigation, TrendingUp, Cpu, Gauge, Fuel, List, Settings, Globe, Info, Activity } from "lucide-react";
import Link from 'next/link';
import Car3DViewer from '@/components/Car3DViewer';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function LibraryPage() {
  const sectionIds = [
    'how-it-works',
    'race-strategy',
    'tires',
    'flags',
    'safety-car',
    'penalties',
    'race-procedure',
    'history',
    'power-unit',
    'aero',
    'suspension',
    'clutch',
    'safety',
    'innovations',
    'fia',
    'gearbox',
    'parts',
    'fun-facts'
  ];

  const activeSection = useScrollSpy(sectionIds, 100);

  return (
    <div className="flex-1 bg-panel min-h-screen text-foreground selection:bg-f1-red selection:text-white pb-24 flex flex-col">
      {/* Magazine Cover Header */}
      <div className="relative bg-black text-white py-32 px-8 overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-600 via-black to-black"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <BookOpen className="w-16 h-16 text-f1-red mb-6" />
          <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
            The <span className="text-f1-red">F1</span> Encyclopedia
          </h1>
          <p className="text-2xl text-gray-300 font-medium max-w-2xl leading-relaxed">
            A comprehensive dive into the engineering, aerodynamics, and innovations that define the pinnacle of motorsport.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="https://www.formula1.com/en/latest/tags.technical.31dF3uR5r3Z864a7OIKsCO.html" target="_blank" className="px-6 py-3 bg-f1-red text-white font-bold rounded-full hover:bg-f1-red/90 transition">Official F1 Tech</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full mt-12 mb-16">
        <div className="bg-background rounded-3xl shadow-xl border border-gray-200/20 p-8">
           <h2 className="text-2xl font-black uppercase italic mb-6 border-b border-f1-red pb-2 inline-block">Interactive 3D Model</h2>
           <div className="w-full h-[500px]">
             <Car3DViewer />
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full flex gap-12 relative">
        {/* Sticky Left Sidebar */}
        <div className="w-64 shrink-0 hidden lg:block">
          <div className="sticky top-32">
            <h3 className="text-xl font-black uppercase italic mb-6 border-b border-gray-200/20 pb-4">Contents</h3>
            <ul className="space-y-3 font-bold text-sm tracking-wider uppercase">
              {[
                { id: 'how-it-works', label: 'How F1 Works' },
                { id: 'race-strategy', label: 'Race Strategy' },
                { id: 'tires', label: 'Tires & Rules' },
                { id: 'flags', label: 'Racing Flags' },
                { id: 'safety-car', label: 'Safety Car & VSC' },
                { id: 'penalties', label: 'Penalties & Limits' },
                { id: 'race-procedure', label: 'Race Procedures' },
                { id: 'history', label: 'History' },
                { id: 'power-unit', label: 'Power Unit' },
                { id: 'aero', label: 'Aerodynamics' },
                { id: 'suspension', label: 'Suspension' },
                { id: 'clutch', label: 'Clutch Systems' },
                { id: 'safety', label: 'Safety' },
                { id: 'innovations', label: 'Innovations' },
                { id: 'fia', label: 'The FIA' },
                { id: 'gearbox', label: 'Gearbox Mandate' },
                { id: 'parts', label: '2026 Parts List' },
                { id: 'fun-facts', label: 'Fun Facts' }
              ].map(item => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={`block transition-colors ${activeSection === item.id ? 'text-f1-red border-l-2 border-f1-red pl-3' : 'text-text-muted hover:text-foreground pl-3 border-l-2 border-transparent'}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-24">
          <section id="how-it-works" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Info className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">How F1 Works</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <h3 className="text-2xl font-bold mt-8 mb-3">Race Weekend Format</h3>
              <p className="text-text-muted">A standard weekend consists of three Practice sessions (FP1, FP2, FP3), followed by Qualifying, and the Grand Prix. The Sprint format alters this with FP1 and Sprint Qualifying on Friday, the Sprint Race and Main Qualifying on Saturday, and the Grand Prix on Sunday.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">Qualifying (Q1, Q2, Q3)</h3>
              <p className="text-text-muted">Qualifying determines the starting grid. Q1 eliminates the slowest 5 drivers. Q2 eliminates the next 5. Q3 sees the top 10 battle for pole position.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">DRS & Active Aero (2026)</h3>
              <p className="text-text-muted">The Drag Reduction System (DRS) allows cars to open their rear wing on straights. For 2026, X & Y active aero configurations will be introduced, allowing adjustable front and rear wings for both high downforce (Z-mode) in corners and low drag (X-mode) on straights.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">Tire Compounds</h3>
              <p className="text-text-muted">Pirelli provides slick tires ranging from C1 (hardest) to C5 (softest). Each race features three compounds designated as Hard (white), Medium (yellow), and Soft (red). Wet weather uses Intermediate (green) and Full Wet (blue) tires.</p>
            </div>
          </section>

          <section id="race-strategy" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <TrendingUp className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Race Strategy</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <h3 className="text-2xl font-bold mt-8 mb-3">Pit Stops</h3>
              <p className="text-text-muted">A modern F1 pit stop is a choreographed masterpiece taking around 2 to 2.5 seconds. A crew of nearly 20 mechanics changes all four tires using precision pneumatic wheel guns. Beyond just changing tires, mechanics can adjust the front wing angle to balance the car's aerodynamics as the fuel load decreases.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">The Undercut</h3>
              <p className="text-text-muted">The undercut occurs when a driver pits earlier than the car ahead. The fresh tires provide an immediate pace advantage on the out-lap. If the driver ahead pits on the next lap, the time gained by the chasing car on fresh tires is often enough to leapfrog them when they exit the pits.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">The Overcut</h3>
              <p className="text-text-muted">The overcut is the opposite strategy. A driver stays out on older tires while the car ahead pits. This works when the car pitting gets stuck in traffic or takes longer to warm up the hard compound tires, allowing the car staying out to put in fast laps in clean air before pitting later and emerging ahead.</p>
            </div>
          </section>

          <section id="tires" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Activity className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Tires & Rules</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <h3 className="text-2xl font-bold mt-8 mb-3">Tire Compounds (C1-C5)</h3>
              <p className="text-text-muted">Pirelli produces five slick tire compounds for dry conditions, from C1 (hardest) to C5 (softest). For each race, Pirelli selects three compounds to be used, designating them as Hard (White), Medium (Yellow), and Soft (Red).</p>
              <ul className="list-disc pl-5 text-text-muted space-y-2">
                <li><strong>Soft (Red):</strong> Provides the most grip and fastest lap times, but degrades the quickest.</li>
                <li><strong>Medium (Yellow):</strong> A balance between performance and durability.</li>
                <li><strong>Hard (White):</strong> Offers the least grip but the longest lifespan, ideal for long stints.</li>
              </ul>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">Wet Weather Tires</h3>
              <ul className="list-disc pl-5 text-text-muted space-y-2">
                <li><strong>Intermediate (Green):</strong> Used for damp or drying tracks, or light rain. They have shallow grooves to disperse water.</li>
                <li><strong>Full Wet (Blue):</strong> Used in heavy rain. They feature deep treads designed to displace huge amounts of water (up to 85 liters per second per tire at 300km/h) to prevent aquaplaning.</li>
              </ul>

              <h3 className="text-2xl font-bold mt-8 mb-3">Tire Rules</h3>
              <p className="text-text-muted">In a dry race, drivers must use at least two different dry-weather compounds during the Grand Prix. This mandates at least one pit stop. If it rains and a driver uses Intermediates or Wets, this two-compound rule is waived.</p>
            </div>
          </section>

          <section id="flags" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Wind className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Racing Flags</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <p className="text-text-muted">Marshals use flags to communicate vital information to drivers on track.</p>
              <ul className="list-disc pl-5 text-text-muted space-y-4 mt-4">
                <li><strong>Yellow Flag:</strong> Indicates danger ahead. Single yellow means reduce speed and no overtaking. Double yellow means reduce speed significantly, no overtaking, and be prepared to stop.</li>
                <li><strong>Green Flag:</strong> The track is clear, normal racing conditions resume.</li>
                <li><strong>Red Flag:</strong> The session is suspended due to extreme danger, severe weather, or a heavily blocked track. Drivers must return to the pit lane slowly.</li>
                <li><strong>Blue Flag:</strong> Shown to a lapped driver indicating a faster car is approaching and they must let them pass.</li>
                <li><strong>Black Flag:</strong> The driver is disqualified and must return to the pits immediately.</li>
                <li><strong>Black and Orange Flag (Meatball):</strong> The car has a mechanical issue or loose bodywork that poses a danger; the driver must pit for repairs.</li>
                <li><strong>Black and White Flag:</strong> A warning for unsportsmanlike behavior or track limits violations.</li>
                <li><strong>Checkered Flag:</strong> The session or race has ended.</li>
              </ul>
            </div>
          </section>

          <section id="safety-car" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <ShieldCheck className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Safety Car & VSC</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <h3 className="text-2xl font-bold mt-8 mb-3">Safety Car (SC)</h3>
              <p className="text-text-muted">Deployed when there is an immediate but not extreme danger on track (e.g., a crash or debris). The Safety Car gathers the pack behind it, dictating the pace. Overtaking is strictly prohibited. This neutralizes the race and bunches up the field, completely erasing any gaps built up by the leaders.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">Virtual Safety Car (VSC)</h3>
              <p className="text-text-muted">Used for less severe incidents where double yellow flags are not enough, but a full Safety Car is unnecessary. Instead of a physical car grouping the pack, drivers must reduce their speed and stay above a delta time on their steering wheel (usually around 30% slower). The gaps between drivers remain roughly the same.</p>
            </div>
          </section>

          <section id="penalties" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Settings className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Penalties & Track Limits</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <h3 className="text-2xl font-bold mt-8 mb-3">Common Penalties</h3>
              <ul className="list-disc pl-5 text-text-muted space-y-2">
                <li><strong>5-Second or 10-Second Time Penalty:</strong> The most common penalty. It can be served during a scheduled pit stop (mechanics cannot touch the car until the time elapses), or added to the driver's total race time at the end.</li>
                <li><strong>Drive-Through Penalty:</strong> The driver must drive through the pit lane at the speed limit without stopping.</li>
                <li><strong>Stop-and-Go Penalty (e.g., 10s):</strong> The driver must enter the pits, stop in their box for the designated time, and then leave. No tire changes or repairs are allowed.</li>
                <li><strong>Grid Penalty:</strong> Applied to the starting grid of the next race (e.g., a 5-place drop) for replacing excessive engine components or serious infractions in the previous session.</li>
              </ul>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">Track Limits</h3>
              <p className="text-text-muted">A driver must keep at least one part of the car (usually a tire) within the white lines defining the edge of the track. If a driver exceeds track limits and gains an advantage, their lap time in qualifying is deleted. In the race, drivers receive warnings (Black/White flag after 3 strikes); further offenses result in time penalties (e.g., 5s on the 4th strike).</p>
            </div>
          </section>

          <section id="race-procedure" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Navigation className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Race Procedures</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <h3 className="text-2xl font-bold mt-8 mb-3">The Formation Lap</h3>
              <p className="text-text-muted">Before the race starts, cars complete one formation lap (parade lap) behind the Safety Car to warm up their tires and brakes, ensure the car is running correctly, and form up on their grid slots. Overtaking is not allowed. Once they align on the grid, the five red lights illuminate sequentially and then extinguish to start the race.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-3">Parc Fermé</h3>
              <p className="text-text-muted">"Closed Park" rules take effect from the moment a car leaves the pit lane in Qualifying until the start of the race. During Parc Fermé, teams are strictly prohibited from making major setup changes to the cars (like changing suspension geometry, wing levels, or engine parts). Only minor adjustments like front wing angles and tire pressures are allowed. Breaking these rules usually means starting from the pit lane.</p>
            </div>
          </section>

          <section id="history" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <BookOpen className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">F1 History & Evolution</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <h3 className="text-2xl font-bold mt-8 mb-3">The 1950 Origins at Silverstone</h3>
              <p className="text-text-muted">
                The story of the Formula One World Championship began on May 13, 1950, at the Silverstone Circuit in the United Kingdom. Formed from the ashes of pre-war Grand Prix racing, the newly established FIA formalized the rules (the "formula") that participants had to adhere to. The inaugural race, attended by King George VI, saw Alfa Romeo dominate with their supercharged 158 Alfettas, driven by legendary figures like Giuseppe Farina, who would go on to become the first World Champion, and Juan Manuel Fangio.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-3">The Rear-Engine Revolution</h3>
              <p className="text-text-muted">
                Throughout the 1950s, Formula 1 cars were front-engined beasts, characterized by massive power, narrow tires, and upright driver positions. This paradigm was shattered by the Cooper Car Company in the late 1950s. By placing a small Climax engine behind the driver, Cooper drastically reduced the car's polar moment of inertia, improving handling and aerodynamics. When Jack Brabham won the World Championship in 1959 and 1960 in the rear-engined Cooper, the entire grid realized the front-engine era was obsolete. Within a few years, every F1 car had transitioned to a mid-engine layout, fundamentally changing the sport's DNA forever.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-3">The Aerodynamics Revolution</h3>
              <p className="text-text-muted">
                In the late 1960s, a new frontier was explored: aerodynamics. Engineers like Colin Chapman of Lotus began strapping rudimentary wings onto cars to generate downforce, pushing the tires into the track for previously unimaginable cornering speeds. What started as fragile, high-mounted struts quickly evolved into an exact science. By the late 1970s, Lotus introduced "ground effect," shaping the entire underside of the car into a massive inverted wing. This era transformed cars from slippery, cigar-shaped tubes into aggressive, wedge-like fighter jets for the road, laying the groundwork for the wind-tunnel-perfected aero-monsters of today.
              </p>
            </div>
          </section>

          <section id="power-unit" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Zap className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">The V6 Turbo Hybrid Power Unit</h2>
            </div>
            <div className="w-full h-64 sm:h-80 rounded-3xl shadow-xl border-2 border-gray-200/20 bg-gradient-to-br from-neutral-800 to-black relative overflow-hidden flex items-center justify-center">
              <Cpu className="w-32 h-32 text-neutral-700 opacity-40 absolute" />
              <span className="text-3xl font-black text-neutral-400 uppercase tracking-widest relative z-10">Hybrid Power Architecture</span>
            </div>
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-xl leading-relaxed font-medium text-foreground">
                Introduced in 2014, the current Formula 1 power units are the most efficient and complex internal combustion engines ever created. Delivering over 1,000 horsepower from a tiny 1.6-liter displacement, they represent a monumental leap in automotive engineering.
              </p>
              <div className="grid md:grid-cols-3 gap-8 my-8">
                <div className="bg-background p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2"><Gauge className="w-6 h-6 text-f1-red" /> MGU-K (Kinetic)</h3>
                  <p className="text-text-muted">
                    The Motor Generator Unit - Kinetic captures kinetic energy that would normally be wasted as heat under braking. It stores this energy in the battery and can deploy it back to the drivetrain to provide an additional 160 horsepower. This highly sophisticated braking-by-wire system blends hydraulic and regenerative braking seamlessly.
                  </p>
                </div>
                <div className="bg-background p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2"><Fuel className="w-6 h-6 text-f1-red" /> MGU-H (Heat)</h3>
                  <p className="text-text-muted">
                    The Motor Generator Unit - Heat is connected directly to the turbocharger shaft. It captures heat energy from the exhaust gases and uses it to generate electrical power or spool up the turbo compressor, eliminating &quot;turbo lag&quot; entirely and optimizing the air intake mixture at any engine RPM.
                  </p>
                </div>
                <div className="bg-background p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2"><Cpu className="w-6 h-6 text-f1-red" /> ICE (Internal Combustion)</h3>
                  <p className="text-text-muted">
                    The 1.6-liter V6 Internal Combustion Engine revs up to 15,000 RPM. It utilizes a pre-chamber ignition system (Turbulent Jet Ignition) to burn an incredibly lean fuel-air mixture efficiently. Advanced metallurgy and 3D printing are used for complex cooling to withstand the immense pressures.
                  </p>
                </div>
              </div>
              <p className="text-foreground mt-6">
                Combined with a 1.6-liter V6 internal combustion engine running at a restricted 15,000 RPM, the entire system operates at thermal efficiencies exceeding 50%—a remarkable engineering milestone compared to road cars, which typically hover around 30%. The energy recovery system (ERS) is governed by strict regulations on deployment per lap, making energy management a crucial strategic element of every race.
              </p>
            </div>
          </section>

          <section id="aero" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Wind className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Aerodynamics & Airflow</h2>
            </div>
            <div className="w-full h-64 sm:h-80 rounded-3xl shadow-xl border-2 border-gray-200/20 bg-gradient-to-tr from-slate-900 via-blue-900 to-black relative overflow-hidden flex items-center justify-center">
              <Wind className="w-32 h-32 text-blue-400 opacity-20 absolute" />
              <span className="text-3xl font-black text-blue-200 uppercase tracking-widest relative z-10">Aerodynamic Flow</span>
            </div>
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-xl leading-relaxed font-medium text-foreground">
                An F1 car produces its own weight in downforce at just 100 mph, meaning it could theoretically drive upside down in a tunnel. The art of aerodynamics is about sticking the car to the ground while minimizing aerodynamic drag.
              </p>
              
              <div className="space-y-8 mt-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Ground Effect & Venturi Tunnels</h3>
                  <p className="text-text-muted mt-2">
                    Reintroduced in 2022 to promote closer racing, modern cars use massive underbody tunnels. As air rushes underneath the car, the tunnels expand, accelerating the airflow and creating an immense low-pressure zone. This literally sucks the car to the track surface, generating the vast majority of the car&apos;s downforce with significantly less drag penalty compared to overbody wings. The challenge for engineers is sealing the edges of the floor using airflow vortices, preventing high-pressure external air from leaking underneath.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground">DRS (Drag Reduction System) & Overbody Aero</h3>
                  <p className="text-text-muted mt-2">
                    When a driver is within one second of the car ahead at a detection point, they can open a flap on the rear wing within designated zones. This sheds significant drag, giving a top-speed boost of around 10-15 km/h to assist with overtaking. Beyond DRS, the overbody aerodynamics—front wings, sidepods, and rear wings—are meticulously sculpted. The front wing manages the turbulent wake coming off the rotating front tires (the outwash effect), directing clean air over the floor and sidepods.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground">Clean Air vs Dirty Air</h3>
                  <p className="text-text-muted mt-2">
                    A car driving in "clean air" (with no cars immediately ahead) experiences undisturbed, predictable airflow, allowing the aerodynamic surfaces to generate maximum downforce. Conversely, as a car punches through the air, it leaves a chaotic, turbulent wake behind it. A following car entering this "dirty air" experiences a significant loss of downforce, making it immensely difficult to follow closely in high-speed corners. This creates an aerodynamic imbalance, often leading to increased tire wear as the car slides more. Teams spend millions of hours on Computational Fluid Dynamics (CFD) to model these complex wakes and optimize their cars for both clean air performance and dirty air resilience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="suspension" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Navigation className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Suspension & Chassis Dynamics</h2>
            </div>
            <div className="w-full h-64 sm:h-80 rounded-3xl shadow-xl border-2 border-gray-200/20 bg-gradient-to-br from-zinc-800 to-stone-900 relative overflow-hidden flex items-center justify-center">
              <Wrench className="w-32 h-32 text-zinc-600 opacity-30 absolute" />
              <span className="text-3xl font-black text-zinc-300 uppercase tracking-widest relative z-10">Suspension Geometry</span>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <p>
                Formula 1 suspensions are not primarily built for comfort—they are built for mechanical grip and aerodynamic stability. They must maintain the car at an exact, highly regulated ride height to ensure the ground effect tunnels work perfectly, even while enduring multi-ton aerodynamic loads at 200 mph.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-3">Push-Rod vs. Pull-Rod Configurations</h3>
              <ul className="list-disc pl-5 text-text-muted space-y-4">
                <li><strong>Push-Rod:</strong> The strut extends upwards from the wheel to the top of the chassis. When the wheel moves up over a bump, it pushes the rod inwards to compress the internal springs/torsion bars. Often used at the front for packaging reasons, allowing mechanics easier access to suspension setups.</li>
                <li><strong>Pull-Rod:</strong> The strut angles downwards from the wheel to the floor of the chassis. Hitting a bump pulls the rod outwards. This lowers the center of gravity and can offer aerodynamic benefits by clearing airflow pathways, particularly at the rear of the car.</li>
              </ul>
              <h3 className="text-2xl font-bold mt-8 mb-3">Kinematics and Anti-Dive</h3>
              <p className="text-text-muted">
                Modern F1 cars use extreme geometry such as "anti-dive" at the front and "anti-squat" at the rear. This mechanical arrangement ensures the car&apos;s platform remains completely flat during heavy braking and violent acceleration, keeping the aerodynamic platform stable. Teams utilize extremely stiff torsion bars and complex inerters (mass dampers) to control the violent vertical loads.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-3">The Dark Art of Tire Management</h3>
              <p className="text-text-muted">
                Supplied exclusively by Pirelli, F1 tires operate in an incredibly narrow temperature window (typically 90-110°C). Suspension geometry—camber, toe, and stiffness—is constantly tweaked to ensure the tires wear evenly and reach optimal temperatures quickly. Drivers must manage the bulk temperature (the core of the rubber) versus the surface temperature, knowing that overheating the surface leads to immediate blistering and loss of grip.
              </p>
            </div>
          </section>

          <section id="clutch" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Activity className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Clutch Systems</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <p className="text-text-muted">
                Formula 1 clutches are marvels of engineering. Made primarily of carbon fiber to withstand extreme temperatures (up to 1200°C) and save weight, they are operated electronically via paddles on the steering wheel rather than a foot pedal.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-3">The Perfect Start</h3>
              <p className="text-text-muted">
                To achieve the perfect launch off the grid, drivers use a dual-paddle clutch system. They fully engage one paddle and partially engage the second to a pre-determined "bite point." When the lights go out, they release the first paddle instantly, dropping to the bite point, then smoothly release the second as they gain traction.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-3">Upgrades and Development</h3>
              <p className="text-text-muted">
                Teams constantly upgrade clutch systems to improve bite point consistency, reduce weight, and enhance heat dissipation. Engineers analyze telemetry data to map the clutch perfectly to the track's grip level, temperature, and the specific tire compound being used. This constant refinement ensures the clutch delivers maximum torque without causing excessive wheel spin.
              </p>
            </div>
          </section>

          <section id="safety" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <ShieldCheck className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Safety & Survival</h2>
            </div>
            <div className="w-full h-64 sm:h-80 rounded-3xl shadow-xl border-2 border-gray-200/20 bg-gradient-to-bl from-red-900 via-black to-black relative overflow-hidden flex items-center justify-center">
              <ShieldCheck className="w-32 h-32 text-red-500 opacity-20 absolute" />
              <span className="text-3xl font-black text-red-200 uppercase tracking-widest relative z-10">Survival Cell</span>
            </div>
            <div className="prose prose-lg prose-gray max-w-none">
              <div className="bg-black text-white p-8 rounded-3xl my-8 border border-red-900/50 shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-f1-red" /> The Halo Device
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Introduced in 2018 amidst significant controversy regarding its aesthetics, the Grade 5 titanium Halo structure can withstand the weight of a double-decker bus. It is arguably the most significant safety advancement of the 21st century. It has proven life-saving on multiple occasions, notably shielding Charles Leclerc in Spa (2018), protecting Romain Grosjean during his horrific fiery crash in Bahrain (2020), deflecting Max Verstappen&apos;s tire from Lewis Hamilton&apos;s helmet in Monza (2021), and saving Zhou Guanyu during his violent rollover at Silverstone (2022).
                </p>
              </div>
              
              <h3 className="text-2xl font-bold mt-8 text-foreground">The Monocoque (Survival Cell)</h3>
              <p className="text-text-muted mt-2">
                The heart of the car is the carbon-fiber composite monocoque. Weighing barely 35 kg, it serves as both the structural core of the chassis and an indestructible shell protecting the driver. It is sandwiched with aluminum honeycomb to increase crush resistance. Surrounded by precisely engineered deformable crash structures at the front, rear, and sides, the entire car is designed to disintegrate sequentially around the monocoque, absorbing massive kinetic energy and dispersing G-forces before they reach the driver.
              </p>
  
              <h3 className="text-2xl font-bold mt-8 text-foreground">HANS Device & Driver Gear</h3>
              <p className="text-text-muted mt-2">
                The Head and Neck Support (HANS) device tethers the driver&apos;s helmet to their shoulders, preventing basilar skull fractures during rapid decelerations. Complementing this, driver fire suits are constructed from advanced Nomex materials, capable of withstanding 800°C open flames for up to 20 seconds, granting drivers precious time to extract themselves from a wreck.
              </p>
            </div>
          </section>

          <section id="innovations" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <TrendingUp className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Historical Innovations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">Fan Car (Brabham BT46B, 1978)</h3>
                <p className="text-text-muted text-sm">
                  Gordon Murray designed a massive fan at the back of the car, claiming it was for cooling. In reality, it actively sucked the air from under the car, creating immense downforce regardless of the car&apos;s speed. Niki Lauda raced it once, won by a massive margin in Sweden, and it was promptly withdrawn due to immense pressure from other teams.
                </p>
              </div>
  
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">Brawn GP Double Diffuser (2009)</h3>
                <p className="text-text-muted text-sm">
                  Exploiting a loophole in the technical regulations regarding holes in the floor, Ross Brawn&apos;s team created a &quot;double&quot; diffuser that generated massive rear downforce. It caught the established giants entirely off-guard, helping Jenson Button secure the 2009 World Championship in the team&apos;s only year of existence.
                </p>
              </div>
  
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">McLaren F-Duct (2010)</h3>
                <p className="text-text-muted text-sm">
                  A genius aerodynamic device that allowed the driver to block a hole in the cockpit with their knee. This redirected airflow through a channel within the chassis and literally &quot;stalled&quot; the rear wing, reducing drag on the straights for a massive top-speed advantage—the direct conceptual precursor to modern DRS.
                </p>
              </div>
  
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">Mercedes DAS (2020)</h3>
                <p className="text-text-muted text-sm">
                  Dual Axis Steering allowed Mercedes drivers to physically push and pull the steering wheel along the steering column on straights. This dynamically changed the toe angle of the front wheels, improving straight-line speed, reducing drag, and uniformly heating the tires under safety car conditions. It was a masterpiece of engineering, banned the following year.
                </p>
              </div>
  
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">Lotus Active Suspension (1992-1993)</h3>
                <p className="text-text-muted text-sm">
                  Pioneered by Lotus and perfected by Williams, active suspension used computer-controlled hydraulics to maintain the car at a perfectly level ride height in every corner. This maximized aerodynamic efficiency constantly. It was so effective that the FIA banned it for the 1994 season, forcing a return to passive systems.
                </p>
              </div>
  
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">Red Bull Advanced Floor (2022-2024)</h3>
                <p className="text-text-muted text-sm">
                  Adrian Newey&apos;s mastery of fluid dynamics led to an incredibly complex 3D underbody geometry when ground effect regulations returned. While rivals chased top-surface aerodynamics and suffered from "porpoising," Red Bull generated peerless, stable downforce from below, resulting in one of the most dominant periods in motorsport history.
                </p>
              </div>
            </div>
          </section>

          <section id="fia" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Globe className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">The FIA: The Governing Body</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <p>
                The Fédération Internationale de l'Automobile (FIA) is the governing body of motorsport worldwide, including Formula 1. Established in 1904, it aims to oversee regulations, safety, and sporting fair play. While Formula One Management (FOM) handles the commercial rights, the FIA dictates the technical, sporting, and financial regulations.
              </p>
              <p>
                The FIA stewards officiate the races, making real-time decisions on penalties, safety cars, and race suspensions. They are also responsible for the relentless push for safety standards, from the introduction of crash testing to the mandatory Halo device and HANS systems, drastically reducing fatalities in the sport over recent decades.
              </p>
            </div>
          </section>

          <section id="gearbox" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Settings className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">The Reverse Gearbox Mandate</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <p>
                An interesting quirk in Formula 1 regulations is the mandatory inclusion of a reverse gear. Article 9.6 of the FIA Technical Regulations dictates that every car must have a reverse gear that can be operated by the driver at any time while the engine is running.
              </p>
              <p>
                Despite this requirement, reverse gear is almost never used. F1 cars are designed solely to go forwards as fast as possible. The reverse gear is exceedingly small, fragile, and difficult to engage, mostly serving to get a car out of a barrier if it hasn't stalled. Due to weight saving, the gear is so delicate that using it risks shattering the transmission. It exists simply because the FIA mandates it for safety and track clearing, but drivers will often prefer to be pushed by marshals rather than risk their gearbox.
              </p>
            </div>
          </section>

          <section id="parts" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <List className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">2026 F1 Car Parts List</h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none text-foreground">
              <p>A high-level breakdown of the thousands of bespoke components that make up a 2026 Formula 1 challenger.</p>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                  <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Aerodynamics & Bodywork</h3>
                  <ul className="list-disc pl-5 text-text-muted space-y-1">
                    <li>Active Front Wing Elements (2026 regs)</li>
                    <li>Active Rear Wing (replacing DRS)</li>
                    <li>Ground-Effect Venturi Floor Tunnels</li>
                    <li>Sidepod Intake Vanes</li>
                    <li>Carbon Fiber Engine Cover & Shark Fin</li>
                    <li>Brake Duct Aerodynamic Fairings</li>
                    <li>Nose Cone & Crash Structure</li>
                  </ul>
                </div>
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                  <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Power Unit (PU)</h3>
                  <ul className="list-disc pl-5 text-text-muted space-y-1">
                    <li>1.6L V6 Internal Combustion Engine (ICE)</li>
                    <li>Upgraded 350kW MGU-K (Kinetic)</li>
                    <li>Energy Store (High-capacity Lithium-Ion Battery)</li>
                    <li>Turbocharger (MGU-H removed for 2026)</li>
                    <li>Custom Exhaust Manifold & Tailpipe</li>
                    <li>High-Pressure Direct Fuel Injectors (100% Sustainable Fuel)</li>
                    <li>Pre-chamber Ignition Plugs</li>
                  </ul>
                </div>
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                  <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Chassis & Suspension</h3>
                  <ul className="list-disc pl-5 text-text-muted space-y-1">
                    <li>Carbon-Fiber Honeycomb Monocoque</li>
                    <li>Titanium Halo Cockpit Protection</li>
                    <li>Push-rod / Pull-rod Suspension Wishbones</li>
                    <li>Inboard Torsion Springs & Dampers</li>
                    <li>18-inch BBS Forged Magnesium Wheels</li>
                    <li>Pirelli P-Zero Slicks & Cinturato Wets</li>
                    <li>Carbon-Ceramic Brake Discs & Calipers</li>
                  </ul>
                </div>
                <div className="bg-panel p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                  <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Electronics & Transmission</h3>
                  <ul className="list-disc pl-5 text-text-muted space-y-1">
                    <li>Standardized Electronic Control Unit (ECU)</li>
                    <li>8-Speed Semi-Automatic Seamless Shift Gearbox</li>
                    <li>Mandatory Reverse Gear (Fragile, rarely used)</li>
                    <li>Driver Steering Wheel with Integrated Dash Display</li>
                    <li>Telemetry Sensors (over 300 per car)</li>
                    <li>Fly-by-Wire Throttle & Brake Systems</li>
                    <li>Two-Way Team Radio System</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="fun-facts" className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
              <Zap className="w-10 h-10 text-f1-red" />
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">Random F1 Fun Facts</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">The Six-Wheeled Wonder</h3>
                <p className="text-text-muted text-sm">
                  In 1976, Tyrrell introduced the P34, the only six-wheeled car to ever race in F1. It featured four tiny 10-inch wheels at the front to reduce aerodynamic drag while maintaining the same contact patch as two normal tires. Unbelievably, it actually worked, securing a 1-2 finish at the 1976 Swedish Grand Prix before tire development issues rendered it obsolete.
                </p>
              </div>
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">The Closest Finish in History</h3>
                <p className="text-text-muted text-sm">
                  The 1971 Italian Grand Prix at Monza holds the record for the closest finish ever, with Peter Gethin beating Ronnie Peterson by just 0.01 seconds. The top five drivers crossed the finish line separated by a mere 0.61 seconds in a breathtaking slipstreaming battle.
                </p>
              </div>
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">Weight Loss During a Race</h3>
                <p className="text-text-muted text-sm">
                  F1 drivers experience such intense G-forces and heat inside the cockpit that they can lose up to 3-4 kg (6-9 lbs) of body weight in sweat during a single two-hour race, particularly in hot, humid climates like Singapore.
                </p>
              </div>
              <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black uppercase text-f1-red mb-2">Upside-Down Downforce</h3>
                <p className="text-text-muted text-sm">
                  A modern Formula 1 car generates so much aerodynamic downforce that, theoretically, once it surpasses speeds of around 130 mph (210 km/h), it could drive upside down on the ceiling of a tunnel. The air pushing the car up against the ceiling would exceed the car's weight pulling it down.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
