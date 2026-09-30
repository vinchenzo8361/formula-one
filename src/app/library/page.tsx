import { BookOpen, Zap, Wind, ShieldCheck, Wrench } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="flex-1 bg-panel min-h-screen text-foreground selection:bg-f1-red selection:text-white">
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
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 space-y-24">
        {/* Section 1: Power Unit */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
            <Zap className="w-10 h-10 text-f1-red" />
            <h2 className="text-4xl font-extrabold uppercase tracking-tight">The V6 Turbo Hybrid Power Unit</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl leading-relaxed font-medium text-foreground">
              Introduced in 2014, the current Formula 1 power units are the most efficient and complex internal combustion engines ever created.
            </p>
            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-background p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                <h3 className="text-2xl font-bold mb-3">MGU-K (Kinetic)</h3>
                <p className="text-text-muted">
                  The Motor Generator Unit - Kinetic captures kinetic energy that would normally be wasted as heat under braking. It stores this energy in the battery and can deploy it back to the drivetrain to provide an additional 160 horsepower.
                </p>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-gray-200/20 shadow-sm">
                <h3 className="text-2xl font-bold mb-3">MGU-H (Heat)</h3>
                <p className="text-text-muted">
                  The Motor Generator Unit - Heat is connected to the turbocharger. It captures heat energy from the exhaust gases and uses it to generate electrical power or spool up the turbo compressor, eliminating &quot;turbo lag.&quot;
                </p>
              </div>
            </div>
            <p>
              Combined with a 1.6-liter V6 internal combustion engine, the entire system operates at thermal efficiencies exceeding 50%—a remarkable engineering milestone compared to road cars, which typically hover around 30%.
            </p>
          </div>
        </section>

        {/* Section 2: Aerodynamics */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
            <Wind className="w-10 h-10 text-f1-red" />
            <h2 className="text-4xl font-extrabold uppercase tracking-tight">Aerodynamics & Airflow</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl leading-relaxed font-medium text-foreground">
              An F1 car produces its own weight in downforce at just 100 mph. The art of aerodynamics is about sticking the car to the ground while minimizing drag.
            </p>
            
            <div className="space-y-6 mt-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Ground Effect (Venturi Tunnels)</h3>
                <p className="text-text-muted mt-2">
                  Reintroduced in 2022 to promote closer racing, modern cars use massive underbody tunnels. As air rushes underneath the car, it accelerates and creates a low-pressure zone, literally sucking the car to the track.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground">DRS (Drag Reduction System)</h3>
                <p className="text-text-muted mt-2">
                  When a driver is within one second of the car ahead, they can open a flap on the rear wing. This sheds significant drag, giving a top-speed boost of around 10-15 km/h to assist with overtaking.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground">Dirty Air</h3>
                <p className="text-text-muted mt-2">
                  As a car punches through the air, it leaves a turbulent, chaotic wake behind it. A following car entering this &quot;dirty air&quot; loses grip and aerodynamic balance, which is why following closely in high-speed corners is immensely difficult.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Safety */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
            <ShieldCheck className="w-10 h-10 text-f1-red" />
            <h2 className="text-4xl font-extrabold uppercase tracking-tight">Safety & Survival</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <div className="bg-black text-white p-8 rounded-3xl my-6">
              <h3 className="text-2xl font-bold mb-4 text-white">The Halo</h3>
              <p className="text-gray-300">
                Introduced in 2018 amidst significant controversy regarding its aesthetics, the titanium Halo structure can withstand the weight of a double-decker bus. It has proven life-saving on multiple occasions, notably Romain Grosjean&apos;s fiery crash in Bahrain and Zhou Guanyu&apos;s flip at Silverstone.
              </p>
            </div>
            
            <h3 className="text-2xl font-bold mt-8">The Monocoque (Survival Cell)</h3>
            <p className="text-text-muted">
              The heart of the car is the carbon-fiber composite monocoque. It serves as both the structural core of the chassis and an indestructible shell protecting the driver. Surrounded by deformable crash structures, it is designed to absorb massive kinetic energy during impacts.
            </p>
          </div>
        </section>

        {/* Section 4: Famous Innovations */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b-4 border-f1-red pb-4">
            <Wrench className="w-10 h-10 text-f1-red" />
            <h2 className="text-4xl font-extrabold uppercase tracking-tight">Historical Innovations</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-black uppercase text-f1-red mb-2">Brawn GP Double Diffuser (2009)</h3>
              <p className="text-text-muted text-sm">
                Exploiting a loophole in the technical regulations, Ross Brawn&apos;s team created a &quot;double&quot; diffuser that generated massive rear downforce, helping Jenson Button secure the 2009 World Championship in the team&apos;s only year of existence.
              </p>
            </div>

            <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-black uppercase text-f1-red mb-2">McLaren F-Duct (2010)</h3>
              <p className="text-text-muted text-sm">
                A genius aerodynamic device that allowed the driver to block a hole in the cockpit with their knee. This redirected airflow through the chassis and stalled the rear wing, reducing drag on the straights—a precursor to modern DRS.
              </p>
            </div>

            <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-black uppercase text-f1-red mb-2">Mercedes &quot;Zeropod&quot; (2022-2023)</h3>
              <p className="text-text-muted text-sm">
                A radical interpretation of the new regulations where Mercedes virtually eliminated the sidepods to reduce drag and maximize floor area. Though visually stunning, it struggled with &quot;porpoising&quot; and aerodynamic instability, and was eventually abandoned.
              </p>
            </div>

            <div className="bg-panel border-2 border-gray-200/20 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-black uppercase text-f1-red mb-2">Red Bull Advanced Floor (2022-2024)</h3>
              <p className="text-text-muted text-sm">
                Adrian Newey&apos;s mastery of ground effect led to an incredibly complex 3D underbody geometry. While rivals chased top-surface aerodynamics, Red Bull generated peerless, stable downforce from below, dominating the ground-effect era.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
