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
      content: "BeeHiveStack LLC (\"we,\" \"our\") provides services to U.S. customers only. We collect only information necessary to operate this website and send updates (such as your email address when you opt in). We do not sell, rent, or share personal data with third parties for marketing purposes. All data is processed and stored in the United States using SSL encryption and reputable hosting providers. You may unsubscribe from emails at any time via the unsubscribe link or by contacting support@beehivestack.net. For data requests or privacy questions, contact us at the same email address."
    },
    terms: {
      title: "Terms of Service", 
      content: "BeeHiveStack LLC provides information and email subscription services to U.S. customers only. By using this website, you agree to: (1) provide accurate information, (2) not misuse or attempt to disrupt our services, (3) comply with all applicable laws. Content is provided \"as-is\" without warranties, though we strive for accuracy. We reserve the right to update content and policies with reasonable notice when possible. Disputes will be resolved under U.S. law. For questions or support, contact support@beehivestack.net."
    },
    refund: {
      title: "Refund Policy",
      content: "BeeHiveStack.net currently operates in pre-launch mode with email signups only - no payments are processed on this page. When payment processing becomes active, all transactions will be clearly disclosed with upfront pricing, terms, and refund policies before purchase. Digital products may have different return policies than physical goods, which will be clearly stated. Standard refund processing takes 3-5 business days. For questions about future products or policies, contact support@beehivestack.net."
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
