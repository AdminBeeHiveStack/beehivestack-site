export function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold text-bee-black leading-tight mb-8">What is BeeHiveStack?</h2>
          
          <p className="text-lg text-bee-slate leading-relaxed mb-12">
            BeeHiveStack is a technology company that provides standardized website infrastructure and rapid deployment services for digital businesses. We specialize in e-commerce platforms, SaaS applications, and digital product marketplaces, helping entrepreneurs launch professional websites quickly with built-in payment processing, security, and compliance features.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bee-gray p-6 rounded-lg">
              <h3 className="font-semibold text-bee-black text-lg mb-3">Fast-Launch Framework</h3>
              <p className="text-bee-slate">Reusable building blocks for rapid site deployment.</p>
            </div>
            
            <div className="bg-bee-gray p-6 rounded-lg">
              <h3 className="font-semibold text-bee-black text-lg mb-3">Quality-First</h3>
              <p className="text-bee-slate">Clear UX, compliant policies, and secure data handling.</p>
            </div>
            
            <div className="bg-bee-gray p-6 rounded-lg">
              <h3 className="font-semibold text-bee-black text-lg mb-3">Modular Monetization</h3>
              <p className="text-bee-slate">Email capture now; payments and subscriptions added per project as they're approved.</p>
            </div>
            
            <div className="bg-bee-gray p-6 rounded-lg">
              <h3 className="font-semibold text-bee-black text-lg mb-3">Central Reliability</h3>
              <p className="text-bee-slate">One brand standard, many independent sites.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
