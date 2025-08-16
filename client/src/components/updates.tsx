export function Updates() {
  const updates = [
    {
      date: "Aug 2025",
      description: "Initial landing site live; email sign-ups open."
    },
    {
      date: "Aug 2025", 
      description: "Policies and contact channel published."
    },
    {
      date: "Aug 2025",
      description: "Roadmap posted; payments to be activated post-verification."
    }
  ];

  return (
    <section id="updates" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold text-bee-black leading-tight mb-12">Updates</h2>
          
          <div className="space-y-6">
            {updates.map((update, index) => (
              <div key={index} className="border-l-4 border-bee-gold pl-6">
                <div className="text-sm text-bee-slate mb-1">{update.date}</div>
                <p className="text-bee-black">{update.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
