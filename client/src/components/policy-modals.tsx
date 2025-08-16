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
      content: "BeeHiveStack (\"we,\" \"our\") collects only what's needed to operate this site and send updates (e.g., your email address if you opt in). We do not sell personal data. Data is processed in the United States. We use SSL and reputable providers for hosting and email. You may unsubscribe from emails at any time. For questions or data requests, email support@beehivestack.net."
    },
    terms: {
      title: "Terms of Service", 
      content: "This site provides information and optional email subscriptions. No warranties are provided; content is \"as-is.\" By using the site, you agree not to misuse or attempt to disrupt services. We may update content and policies without prior notice. For support, contact support@beehivestack.net."
    },
    refund: {
      title: "Refund Policy",
      content: "At this time, BeeHiveStack.net does not collect payments on this page. If a future product page processes payments, that page will include clear pricing and its own refund/returns terms. For questions, contact support@beehivestack.net."
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
