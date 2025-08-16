import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Roadmap } from "@/components/roadmap";
import { Updates } from "@/components/updates";
import { FAQs } from "@/components/faqs";
import { EmailCTA } from "@/components/email-cta";
import { Footer } from "@/components/footer";
import { PolicyModals } from "@/components/policy-modals";

export default function Home() {
  return (
    <div className="font-inter bg-white text-bee-slate antialiased">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="skip-link focus:top-2 transition-all duration-200"
      >
        Skip to main content
      </a>

      <Header />
      
      <main id="main-content">
        <Hero />
        <About />
        <Roadmap />
        <Updates />
        <FAQs />
        <EmailCTA />
      </main>
      
      <Footer />
      <PolicyModals />
    </div>
  );
}
