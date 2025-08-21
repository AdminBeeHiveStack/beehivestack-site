import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { DealDeskSection } from "../components/deal-desk-section";
import { Roadmap } from "../components/roadmap";
// import { Updates } from "../components/updates"; // Hidden for Stripe review
import { FAQs } from "../components/faqs";
import { EmailCTA } from "../components/email-cta";
import { Footer } from "../components/footer";
import { PolicyModals } from "../components/policy-modals";

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
        <DealDeskSection />
        <Roadmap />
        {/* <Updates /> Hidden for Stripe review */}
        <FAQs />
        <EmailCTA />
      </main>
      
      <Footer />
      <PolicyModals />
    </div>
  );
}
