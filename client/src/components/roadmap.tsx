export function Roadmap() {
  const phases = [
    {
      phase: 1,
      title: "Phase 1",
      description: "Launch BeeHiveStack.net landing (email capture + policies).",
      active: true
    },
    {
      phase: 2,
      title: "Phase 2", 
      description: "Publish initial project microsites (digital products, SaaS tools).",
      active: true
    },
    {
      phase: 3,
      title: "Phase 3",
      description: "Enable payments on approved properties (Stripe), finalize /compare and other support pages.",
      active: false
    },
    {
      phase: 4,
      title: "Phase 4",
      description: "Expand catalog and partner integrations.",
      active: false
    }
  ];

  return (
    <section id="roadmap" className="py-16 bg-bee-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold text-bee-black leading-tight mb-12">High-Level Rollout</h2>
          
          <div className="space-y-8">
            {phases.map((phase) => (
              <div key={phase.phase} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  phase.active 
                    ? 'bg-bee-gold text-bee-black' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {phase.phase}
                </div>
                <div>
                  <h3 className="font-semibold text-bee-black text-lg mb-2">{phase.title}</h3>
                  <p className="text-bee-slate">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
