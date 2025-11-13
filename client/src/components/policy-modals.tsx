import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function PolicyModals() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setOpenModal(event.detail);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenModal(null);
      }
    };

    window.addEventListener('openModal', handleOpenModal as EventListener);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('openModal', handleOpenModal as EventListener);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeModal = () => {
    setOpenModal(null);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const policies = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Last Updated: November 13, 2025</p>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">1. Introduction</h3>
            <p>BeeHiveStack LLC ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website beehivestack.net and use our services. Our services are available to U.S. customers only.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">2. Information We Collect</h3>
            <p className="mb-2">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Email Subscription:</strong> Email address, name (optional), and signup date when you subscribe to our mailing list</li>
              <li><strong>Deal Desk Network:</strong> Investment criteria, budget ranges, business metrics, industry preferences, financial information, and contact details submitted through our investor or seller applications</li>
              <li><strong>Contact Forms:</strong> Any information you provide when contacting our support team</li>
              <li><strong>Automatically Collected:</strong> IP address, browser type, device information, and pages visited through cookies and analytics tools</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">3. How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Send you email updates, newsletters, and marketing communications (you can opt-out anytime)</li>
              <li>Facilitate anonymous matching between investors and sellers in our Deal Desk Network</li>
              <li>Process and respond to your inquiries and service requests</li>
              <li>Improve our website and services through analytics</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Prevent fraud and maintain security</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">4. Deal Desk Privacy Protection</h3>
            <p className="mb-2">Our Deal Desk Network prioritizes anonymity and confidentiality:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Business listings show performance metrics only—no identifying information is shared until both parties explicitly agree</li>
              <li>Investor profiles remain confidential during the matching process</li>
              <li>Information is collected solely to facilitate optimal investor-seller matching</li>
              <li>No business details, financial data, or personal information is disclosed without mutual consent to proceed</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">5. Information Sharing and Disclosure</h3>
            <p className="mb-2">We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Service Providers:</strong> SendGrid (email delivery), Neon Database (data storage), and Replit (hosting) who are contractually obligated to protect your data</li>
              <li><strong>Deal Desk Participants:</strong> Only after both parties explicitly agree to share information and move forward</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice to you)</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">6. Data Security</h3>
            <p>We implement industry-standard security measures including SSL encryption, secure databases, and access controls. All data is processed and stored in the United States. While we strive to protect your information, no internet transmission is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">7. Your Privacy Rights</h3>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Unsubscribe from marketing emails via the unsubscribe link or by contacting us</li>
              <li>Request access to your personal information</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt-out of cookies through your browser settings</li>
              <li>Withdraw consent for Deal Desk participation at any time</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">8. Cookies and Tracking</h3>
            <p>We use cookies and similar technologies to enhance user experience, analyze site traffic, and remember your preferences. You can control cookie settings through your browser, though some features may not function properly if disabled.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">9. Children's Privacy</h3>
            <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn we have collected information from a child, we will delete it promptly.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">10. Changes to This Policy</h3>
            <p>We may update this Privacy Policy periodically. We will notify you of material changes by posting the new policy on this page with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">11. Contact Us</h3>
            <p>For privacy questions, data requests, or to exercise your rights, contact us at:</p>
            <p className="mt-2"><strong>Email:</strong> support@beehivestack.net</p>
            <p><strong>Business Hours:</strong> Monday-Friday, 9AM-6PM ET</p>
          </section>
        </div>
      )
    },
    terms: {
      title: "Terms of Service", 
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Last Updated: November 13, 2025</p>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h3>
            <p>By accessing or using beehivestack.net ("Website") and our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use our services. These services are available to U.S. customers only.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">2. Services Description</h3>
            <p className="mb-2">BeeHiveStack LLC provides:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Development Services:</strong> Custom digital product development including ecommerce platforms, SaaS applications, and web solutions</li>
              <li><strong>Deal Desk Network:</strong> Anonymous marketplace connecting qualified investors with business sellers through confidential deal matching</li>
              <li><strong>Email Communications:</strong> Updates, insights, and information about our services and offerings</li>
              <li><strong>Business Consultation:</strong> Strategic guidance from concept through execution and exit planning</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">3. User Responsibilities</h3>
            <p className="mb-2">You agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate, current, and complete information when registering or submitting forms</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Not misuse, disrupt, or attempt unauthorized access to our services</li>
              <li>Comply with all applicable federal, state, and local laws</li>
              <li>Not submit false, misleading, or fraudulent information to the Deal Desk Network</li>
              <li>Respect the confidentiality of Deal Desk participants and information</li>
              <li>Not use our services for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">4. Deal Desk Network Terms</h3>
            <p className="mb-2">Participation in our Deal Desk Network requires:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Accuracy:</strong> All business metrics, financial information, and investment criteria must be truthful and accurate</li>
              <li><strong>Confidentiality:</strong> You agree to maintain confidentiality of information shared during the matching process</li>
              <li><strong>Good Faith:</strong> Engage in negotiations professionally and in good faith</li>
              <li><strong>Commission Structure:</strong> Success-based fees apply only upon completed transactions (5-10% based on deal size and complexity)</li>
              <li><strong>No Guarantee:</strong> We do not guarantee matches, transactions, or specific outcomes</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">5. Intellectual Property</h3>
            <p>All content on this Website, including text, graphics, logos, code, and design, is the property of BeeHiveStack LLC and protected by U.S. copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">6. Development Services</h3>
            <p className="mb-2">For custom development projects:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Specific project terms, deliverables, timelines, and pricing will be outlined in separate service agreements</li>
              <li>Intellectual property rights will be defined in project contracts</li>
              <li>Payment terms and milestones will be established before project commencement</li>
              <li>Changes to scope may affect pricing and timelines</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">7. Disclaimers and Limitation of Liability</h3>
            <p className="mb-2">Our services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not warrant that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Services will be uninterrupted, secure, or error-free</li>
              <li>Results obtained will be accurate or reliable</li>
              <li>Deal Desk matches will result in completed transactions</li>
            </ul>
            <p className="mt-2">To the fullest extent permitted by law, BeeHiveStack LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">8. Indemnification</h3>
            <p>You agree to indemnify and hold BeeHiveStack LLC, its officers, directors, employees, and agents harmless from any claims, damages, losses, or expenses arising from your violation of these Terms or misuse of our services.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">9. Modifications to Services and Terms</h3>
            <p>We reserve the right to modify, suspend, or discontinue any part of our services at any time. We may update these Terms periodically, and material changes will be posted on this page with an updated date. Continued use after changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">10. Termination</h3>
            <p>We may terminate or suspend your access to our services immediately, without prior notice, for any reason including breach of these Terms. Upon termination, your right to use the services will cease immediately.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">11. Governing Law and Dispute Resolution</h3>
            <p>These Terms are governed by the laws of the United States and the state of Delaware, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules, except that either party may seek injunctive relief in court.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">12. Severability</h3>
            <p>If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">13. Contact Information</h3>
            <p>For questions about these Terms of Service, contact us at:</p>
            <p className="mt-2"><strong>Email:</strong> support@beehivestack.net</p>
            <p><strong>Business Hours:</strong> Monday-Friday, 9AM-6PM ET</p>
          </section>
        </div>
      )
    },
    refund: {
      title: "Refund Policy",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Last Updated: November 13, 2025</p>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">1. Current Service Status</h3>
            <p>BeeHiveStack.net currently operates with email subscription services and Deal Desk Network applications. No payment processing is active on this website at this time. This policy outlines our refund approach for when services become paid.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">2. Future Payment Processing</h3>
            <p>When payment processing becomes active, all transactions will include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Clear upfront pricing with no hidden fees</li>
              <li>Detailed service descriptions and deliverables</li>
              <li>Transparent terms and conditions before purchase</li>
              <li>Specific refund policies for each service type</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">3. Development Services Refunds</h3>
            <p className="mb-2">For custom development projects:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Milestone-Based:</strong> Refunds available before work begins on specific milestones</li>
              <li><strong>Scope Changes:</strong> Material scope changes may affect pricing and refund eligibility</li>
              <li><strong>Cancellation:</strong> 30-day notice required for project cancellation; refunds prorated based on work completed</li>
              <li><strong>Deliverables:</strong> Refunds not available after final deliverables are accepted</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">4. Deal Desk Commission Refunds</h3>
            <p className="mb-2">Our success-based commission structure includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>No Upfront Fees:</strong> No payment required for Deal Desk participation or matching services</li>
              <li><strong>Success-Based:</strong> Commission (5-10%) charged only upon completed transaction</li>
              <li><strong>Transaction Failure:</strong> If a deal falls through before completion, no commission is owed</li>
              <li><strong>Non-Refundable:</strong> Once a transaction is completed and commission paid, refunds are not available</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">5. Digital Products and Services</h3>
            <p>Digital products may have different return policies than physical goods due to their nature:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Specific refund windows will be clearly stated (typically 7-30 days)</li>
              <li>Access to digital products may be revoked upon refund approval</li>
              <li>Partial refunds may apply if portions of the service have been consumed</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">6. Refund Request Process</h3>
            <p className="mb-2">To request a refund:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contact support@beehivestack.net with your request and reason</li>
              <li>Include transaction details (date, amount, service description)</li>
              <li>Allow 2-3 business days for review and response</li>
              <li>Approved refunds processed within 3-5 business days</li>
              <li>Refunds issued to original payment method</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">7. Non-Refundable Items</h3>
            <p className="mb-2">The following are typically non-refundable:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Completed development projects after final delivery and acceptance</li>
              <li>Custom work created specifically for your business</li>
              <li>Third-party fees or licenses purchased on your behalf</li>
              <li>Services fully rendered or consumed</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">8. Dispute Resolution</h3>
            <p>If you dispute a charge or are unsatisfied with our resolution, you may:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request escalation to management for review</li>
              <li>Pursue resolution through your payment provider</li>
              <li>Seek arbitration as outlined in our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">9. Policy Updates</h3>
            <p>This Refund Policy may be updated as our services evolve. Material changes will be communicated with reasonable notice. The "Last Updated" date indicates the most recent revision.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">10. Contact Us</h3>
            <p>For refund requests, billing questions, or policy clarifications:</p>
            <p className="mt-2"><strong>Email:</strong> support@beehivestack.net</p>
            <p><strong>Business Hours:</strong> Monday-Friday, 9AM-6PM ET</p>
            <p className="mt-2 text-sm text-gray-600">We strive to resolve all concerns fairly and promptly. Your satisfaction is our priority.</p>
          </section>
        </div>
      )
    }
  };

  if (!openModal) return null;

  const policy = policies[openModal as keyof typeof policies];
  if (!policy) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-labelledby={`${openModal}-title`}
      aria-modal="true"
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 id={`${openModal}-title`} className="text-2xl font-bold text-bee-black">
              {policy.title}
            </h2>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-bee-gold rounded" 
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-bee-slate leading-relaxed">
            <p>{policy.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
