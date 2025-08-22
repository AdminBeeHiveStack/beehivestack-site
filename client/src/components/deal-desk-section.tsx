import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLocation } from "wouter";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  ArrowRight,
  CheckCircle,
  Globe,
  BarChart3
} from "lucide-react";

export function DealDeskSection() {
  const [, navigate] = useLocation();

  const investorFeatures = [
    {
      icon: TrendingUp,
      title: "Curated Opportunities",
      description: "Access pre-vetted digital businesses with verified revenue and growth metrics"
    },
    {
      icon: Target,
      title: "Match Your Criteria",
      description: "Find businesses that match your investment budget, timeline, and involvement preferences"
    },
    {
      icon: CheckCircle,
      title: "Complete Privacy Protection",
      description: "Browse anonymized business profiles while keeping your identity completely confidential until you choose to engage"
    }
  ];

  const sellerFeatures = [
    {
      icon: DollarSign,
      title: "Market Valuation",
      description: "Get matched with investors who understand your business model and growth potential"
    },
    {
      icon: Globe,
      title: "Anonymous Business Listings",
      description: "List your business with complete anonymity - investors see performance metrics without identifying details until you approve"
    },
    {
      icon: BarChart3,
      title: "Fast Track Options",
      description: "Priority listing and accelerated matching for businesses ready to close quickly"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-bee-gray to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 text-bee-slate bg-white/80 text-lg px-4 py-2">
            Deal Desk Network
          </Badge>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-bee-slate mb-8 leading-tight">
            Deal Desk
            <span className="block text-bee-gold">Network</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-bee-slate mb-6">
            Connect Digital Asset Investors & Sellers
          </h3>
          <p className="text-xl text-bee-slate/80 max-w-4xl mx-auto mb-8">
            Join our exclusive marketplace where proven digital businesses meet strategic investors. 
            Professional due diligence, confidential matching, and streamlined deal execution.
          </p>
          
          {/* Anonymous Process Callout */}
          <div className="bg-white/80 backdrop-blur-sm border border-bee-gold/30 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-bee-gold/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-bee-gold" />
              </div>
              <h4 className="text-xl font-bold text-bee-slate">100% Anonymous Matching Process</h4>
            </div>
            <p className="text-bee-slate/80 leading-relaxed">
              Your information is collected solely to facilitate optimal investor-seller matching. 
              <strong className="text-bee-slate"> No business details, financial data, or personal information is shared with anyone until both parties explicitly agree to move forward with a deal.</strong> 
              Our anonymous review system protects privacy while enabling strategic connections.
            </p>
          </div>
        </div>

        {/* Dual CTA Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Investor Card */}
          <Card className="relative overflow-hidden border-2 border-bee-gold/20 hover:border-bee-gold transition-all duration-300 group shadow-lg hover:shadow-2xl">
            <CardContent className="p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-bee-gold/10 rounded-lg">
                  <Users className="h-6 w-6 text-bee-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-bee-slate">For Investors</h3>
                  <p className="text-bee-slate/70">Acquire proven digital assets</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {investorFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <feature.icon className="h-5 w-5 text-bee-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-bee-slate">{feature.title}</h4>
                      <p className="text-sm text-bee-slate/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => navigate('/investor-onboarding')}
                className="w-full bg-bee-gold text-bee-black hover:bg-bee-gold/90 group-hover:scale-105 transition-all duration-300"
                size="lg"
              >
                Join Investor Network
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card className="relative overflow-hidden border-2 border-bee-slate/20 hover:border-bee-slate transition-all duration-300 group shadow-lg hover:shadow-2xl">
            <CardContent className="p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-bee-slate/10 rounded-lg">
                  <Globe className="h-6 w-6 text-bee-slate" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-bee-slate">For Sellers</h3>
                  <p className="text-bee-slate/70">Exit your digital business</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {sellerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <feature.icon className="h-5 w-5 text-bee-slate mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-bee-slate">{feature.title}</h4>
                      <p className="text-sm text-bee-slate/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => navigate('/seller-onboarding')}
                className="w-full bg-bee-slate text-white hover:bg-bee-slate/90 group-hover:scale-105 transition-all duration-300"
                size="lg"
              >
                List Your Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-gold mb-2">$2M+</div>
              <div className="text-sm text-bee-slate/70">Total Deal Flow</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-gold mb-2">50+</div>
              <div className="text-sm text-bee-slate/70">Verified Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-gold mb-2">25+</div>
              <div className="text-sm text-bee-slate/70">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bee-gold mb-2">90%</div>
              <div className="text-sm text-bee-slate/70">Match Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}