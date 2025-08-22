export function FAQs() {
  const faqs = [
    {
      question: "What is the BeeHiveStack development process?",
      answer: "We follow a proven 4-stage methodology: Concept & Validation (market research, MVP specs), Development & Launch (building your platform), Monetization & Growth (payment integration, scaling), and Scale & Optimization (partnerships, advanced features). Each stage is designed to minimize risk and maximize success potential."
    },
    {
      question: "How does the Deal Desk marketplace work?",
      answer: "Our Deal Desk connects digital business owners looking to exit with strategic investors. Sellers can list their businesses confidentially with verified revenue data, while investors browse pre-vetted opportunities that match their criteria. We facilitate anonymous review, due diligence, and streamlined deal execution."
    },
    {
      question: "What types of digital businesses do you work with?",
      answer: "We specialize in e-commerce platforms, SaaS applications, digital marketplaces, affiliate sites, content monetization platforms, and subscription-based businesses. Whether you're starting from scratch or have an existing business ready for exit, we provide the right infrastructure and guidance."
    },
    {
      question: "Are payments currently enabled?",
      answer: "Payment processing is being activated in phases as projects are verified and approved. Early adopters will get priority access to monetization features as they become available."
    },
    {
      question: "How do I get started with BeeHiveStack?",
      answer: "Join our notification list to get early access to our development platform. If you're an investor, you can also join our Deal Desk network. If you have a digital business ready for exit, you can list it confidentially on our marketplace."
    },
    {
      question: "What makes BeeHiveStack different from other development agencies?",
      answer: "We're not just a development agency—we're a complete digital business ecosystem. Beyond building your platform, we provide ongoing strategic support, investor connections, exit opportunities, and a marketplace for buying/selling established digital businesses."
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes, we provide comprehensive support throughout your business journey. This includes technical maintenance, growth strategy guidance, investor matching, and eventual exit planning through our Deal Desk marketplace."
    },
    {
      question: "Is BeeHiveStack available internationally?",
      answer: "Currently, our services are available to U.S. customers only. This allows us to maintain simplified compliance, focused support, and streamlined legal processes for all transactions and business formations."
    },
    {
      question: "How can I contact the BeeHiveStack team?",
      answer: "Email us at support@beehivestack.net for general inquiries. For Deal Desk questions or business listings, mention that in your subject line. We typically respond within 1-2 business days during standard business hours (9 AM - 6 PM ET, Monday-Friday)."
    }
  ];

  return (
    <section id="faqs" className="py-16 bg-bee-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold text-bee-black leading-tight mb-12">FAQs</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-bee-black text-lg mb-3">{faq.question}</h3>
                <p className="text-bee-slate">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
