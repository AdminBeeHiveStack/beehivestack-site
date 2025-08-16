import { useState } from "react";
import { HexIcon } from "./hex-icon";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToEmailSignup = () => {
    document.getElementById('email-signup')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <HexIcon />
            <span className="font-bold text-xl text-bee-black">BeeHiveStack</span>
          </div>
          
          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-bee-slate hover:text-bee-black transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('roadmap')}
              className="text-bee-slate hover:text-bee-black transition-colors duration-200"
            >
              Roadmap
            </button>
            {/* Hidden for Stripe review
            <button 
              onClick={() => scrollToSection('updates')}
              className="text-bee-slate hover:text-bee-black transition-colors duration-200"
            >
              Updates
            </button>
            */}
            <button 
              onClick={() => scrollToSection('faqs')}
              className="text-bee-slate hover:text-bee-black transition-colors duration-200"
            >
              FAQs
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-bee-slate hover:text-bee-black transition-colors duration-200"
            >
              Contact
            </button>
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={scrollToEmailSignup}
            className="bg-bee-gold hover:bg-yellow-300 text-bee-black font-medium px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bee-gold focus:ring-offset-2"
          >
            Get Notified
          </button>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bee-gold" 
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-bee-slate hover:text-bee-black transition-colors duration-200 text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('roadmap')}
                className="text-bee-slate hover:text-bee-black transition-colors duration-200 text-left"
              >
                Roadmap
              </button>
              {/* Hidden for Stripe review
              <button 
                onClick={() => scrollToSection('updates')}
                className="text-bee-slate hover:text-bee-black transition-colors duration-200 text-left"
              >
                Updates
              </button>
              */}
              <button 
                onClick={() => scrollToSection('faqs')}
                className="text-bee-slate hover:text-bee-black transition-colors duration-200 text-left"
              >
                FAQs
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-bee-slate hover:text-bee-black transition-colors duration-200 text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
