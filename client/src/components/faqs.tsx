export function FAQs() {
  const faqs = [
    // GETTING STARTED
    {
      question: "How do I get started with BeeHiveStack?",
      answer: "Join our notification list to get early access to our development platform and Deal Desk network. For entrepreneurs, we'll guide you through our 4-stage development process. For investors, you'll get access to pre-vetted business opportunities. For sellers, you can list your digital business confidentially on our marketplace."
    },
    {
      question: "What makes BeeHiveStack different from other development agencies?",
      answer: "We're not just a development agency—we're a complete digital business ecosystem. Beyond building your platform, we provide ongoing strategic support, investor connections, exit opportunities, and a marketplace for buying/selling established digital businesses. We're your partner from concept to exit."
    },
    
    // DEVELOPMENT SERVICES
    {
      question: "What is the BeeHiveStack development process?",
      answer: "We follow a proven 4-stage methodology: Concept & Validation (market research, MVP specs), Development & Launch (building your platform), Monetization & Growth (payment integration, scaling), and Scale & Optimization (partnerships, advanced features). Each stage includes specific deliverables and success metrics to minimize risk and maximize potential."
    },
    {
      question: "What types of digital businesses do you work with?",
      answer: "We specialize in e-commerce platforms, SaaS applications, digital marketplaces, affiliate sites, content monetization platforms, and subscription-based businesses. Whether you're starting from scratch or have an existing business ready for exit, we provide the right infrastructure, guidance, and strategic connections."
    },
    {
      question: "What's included in your development services?",
      answer: "Our comprehensive packages include: custom platform development, payment processing integration, user management systems, analytics dashboards, mobile optimization, SEO foundation, security implementation, hosting setup, ongoing technical support, and strategic growth planning. We build for scale from day one."
    },
    
    // DEAL DESK MARKETPLACE
    {
      question: "How does the Deal Desk marketplace work?",
      answer: "Our Deal Desk connects digital business owners looking to exit with strategic investors. Sellers list businesses confidentially with verified revenue data, while investors browse pre-vetted opportunities matching their criteria. We facilitate anonymous review, comprehensive due diligence, legal documentation, and streamlined deal execution."
    },
    {
      question: "What are the Deal Desk fees and commission structure?",
      answer: "Deal Desk operates on a success-based model. We only earn when deals close successfully. Commission rates vary based on deal size and complexity, typically ranging from 3-8% split between buyer and seller. Initial listing, matching, and due diligence services are provided at no upfront cost to encourage quality participation."
    },
    {
      question: "How is my privacy protected in the Deal Desk?",
      answer: "Complete anonymity is maintained throughout the initial matching process. Business details, financial data, and personal information are never shared until both parties explicitly agree to move forward. Investors see anonymized performance metrics and growth indicators. Sellers control when and how much information to reveal at each stage."
    },
    
    // BUSINESS & SUPPORT
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes, we provide comprehensive lifecycle support including: technical maintenance and updates, performance monitoring, growth strategy consulting, marketing optimization, investor introductions when appropriate, and eventual exit planning through our Deal Desk marketplace. We're invested in your long-term success."
    },
    {
      question: "Is BeeHiveStack available internationally?",
      answer: "Currently, our services are available to U.S. customers only. This allows us to maintain simplified compliance, focused support, and streamlined legal processes for all transactions and business formations. We may expand internationally as regulations and market conditions allow."
    },
    {
      question: "How can I contact the BeeHiveStack team?",
      answer: "Email us at support@beehivestack.net for general inquiries. For Deal Desk questions or business listings, mention that in your subject line for priority routing. We typically respond within 1-2 business days during standard business hours (9 AM - 6 PM ET, Monday-Friday). Urgent technical issues receive same-day response."
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
