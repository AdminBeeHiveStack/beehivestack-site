export function FAQs() {
  const faqs = [
    {
      question: "Are you accepting payments today?",
      answer: "Not yet. We'll enable payments on verified pages as new projects go live."
    },
    {
      question: "What products will BeeHiveStack offer?",
      answer: "A mix of fast-launch sites spanning ecommerce, SaaS utilities, and digital products."
    },
    {
      question: "How do I get early access?",
      answer: "Join the list via \"Get Notified\" and we'll email updates, beta invites, and launch announcements."
    },
    {
      question: "Where do you process data?",
      answer: "We use U.S.-based processing and SSL encryption. Our services are available to U.S. customers only. See our Privacy Policy for details."
    },
    {
      question: "Can international customers use BeeHiveStack?",
      answer: "Currently, BeeHiveStack services are available to U.S. customers only. This helps us maintain simplified compliance and provide focused service."
    },
    {
      question: "How can I contact support?",
      answer: "Email us at support@beehivestack.net."
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
