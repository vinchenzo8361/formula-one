import { BookOpen, Zap, Wind, ShieldCheck, Wrench, Navigation, TrendingUp, Cpu, Gauge, Fuel, List, Settings, Globe } from "lucide-react";
import Link from 'next/link';
import Car3DViewer from '@/components/Car3DViewer';

export default function LibraryPage() {
  return (
    <div className="flex-1 bg-panel min-h-screen text-foreground selection:bg-f1-red selection:text-white pb-24">
      {/* Magazine Cover Header */}
      <div className="relative bg-black text-white py-32 px-8 overflow-hidden">
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
          <div className="w-full mt-12">
            <Car3DViewer />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 space-y-24">
        {/* Section 0: F1 History */}
        <section className="space-y-8">
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

        {/* Section 1: Power Unit */}
        <section className="space-y-8">
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
            <div className="grid md:grid-cols-2 gap-8 my-8">
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
            </div>
            <p className="text-foreground mt-6">
              Combined with a 1.6-liter V6 internal combustion engine running at a restricted 15,000 RPM, the entire system operates at thermal efficiencies exceeding 50%—a remarkable engineering milestone compared to road cars, which typically hover around 30%. The energy recovery system (ERS) is governed by strict regulations on deployment per lap, making energy management a crucial strategic element of every race.
            </p>
            <p className="text-foreground mt-4">
              Furthermore, the internal combustion engine (ICE) utilizes a pre-chamber ignition system (often referred to as Turbulent Jet Ignition). This allows for an incredibly lean fuel-air mixture to be burned efficiently, squeezing every drop of performance from the strictly regulated 110kg fuel allowance. Advanced metallurgy and 3D printing techniques are employed to create complex cooling channels inside the piston heads to withstand the immense pressures and temperatures.
            </p>
          </div>
        </section>

        {/* Section 2: Aerodynamics */}
        <section className="space-y-8">
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
                <h3 className="text-2xl font-bold text-foreground">Dirty Air & Computational Fluid Dynamics (CFD)</h3>
                <p className="text-text-muted mt-2">
                  As a car punches through the air, it leaves a turbulent, chaotic wake behind it. A following car entering this &quot;dirty air&quot; loses grip and aerodynamic balance, which is why following closely in high-speed corners is immensely difficult. Teams utilize millions of hours of supercomputer time for Computational Fluid Dynamics (CFD) to model these airflow patterns, perfectly complementing their limited physical wind tunnel testing time to extract milliseconds of performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Suspension and Chassis */}
        <section className="space-y-8">
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

        {/* Section 4: Safety */}
        <section className="space-y-8">
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

        {/* Section 5: Famous Innovations */}
        <section className="space-y-8">
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

        {/* Section 6: The FIA */}
        <section className="space-y-8">
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

        {/* Section 7: The Reverse Gearbox Mandate */}
        <section className="space-y-8">
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

        {/* Section 8: 2026 F1 Car Parts List */}
        <section className="space-y-8">
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

        {/* Section 9: Random F1 Fun Facts */}
        <section className="space-y-8">
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
  );
}
