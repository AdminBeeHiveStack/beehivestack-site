import { Check, Shield, Globe } from "lucide-react";

export function Hero() {
  const scrollToEmailSignup = () => {
    document.getElementById('email-signup')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative bg-bee-gray hex-pattern min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-bee-black leading-tight mb-6">
            Build Smarter. Launch Faster.
          </h1>
          
          <p className="text-xl text-bee-slate leading-relaxed mb-8 max-w-2xl">
            BeeHiveStack provides professional website infrastructure and rapid deployment services for entrepreneurs and businesses. Our platform specializes in e-commerce, SaaS applications, and digital marketplaces with integrated payment processing, security, and compliance features.
          </p>
          
          <div className="mb-6">
            <button 
              onClick={scrollToEmailSignup}
              className="bg-bee-gold hover:bg-yellow-300 text-bee-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bee-gold focus:ring-offset-2"
            >
              Get Notified
            </button>
          </div>
          
          <div className="text-sm text-bee-slate mb-4">
            <span className="inline-flex items-center mr-6">
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Encrypted forms
            </span>
            <span className="inline-flex items-center mr-6">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              SSL secured
            </span>
            <span className="inline-flex items-center">
              <Globe className="w-4 h-4 mr-2 text-green-600" />
              U.S. customers only
            </span>
          </div>
          
          <p className="text-xs text-bee-slate italic">
            No payments are processed on this page. Payments will be activated after verification.<br/>
            Available to U.S. customers only.
          </p>
        </div>
      </div>
    </section>
  );
}
