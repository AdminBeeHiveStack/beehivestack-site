import { HexIcon } from "./hex-icon";

interface FooterProps {
  onOpenModal: (modalType: string) => void;
}

export function Footer() {
  const openModal = (modalType: string) => {
    const event = new CustomEvent('openModal', { detail: modalType });
    window.dispatchEvent(event);
  };

  return (
    <footer id="contact" className="bg-bee-slate text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <HexIcon inverted />
              <span className="font-bold text-xl">BeeHiveStack</span>
            </div>
            <p className="text-gray-300 mb-4">© BeeHiveStack. All rights reserved.</p>
            <p className="text-gray-300">Contact: support@beehivestack.net</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal & Support</h3>
            <div className="space-y-2">
              <button 
                onClick={() => openModal('privacy')}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => openModal('terms')}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => openModal('refund')}
                className="block text-gray-300 hover:text-white transition-colors text-left"
              >
                Refund Policy
              </button>
              <a 
                href="mailto:support@beehivestack.net" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
