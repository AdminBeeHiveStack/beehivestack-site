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
      title: "Anonymous Review",
      description: "Review detailed business information while maintaining your privacy until deal approval"
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
      title: "Confidential Listings",
      description: "Keep your business details private while attracting serious, qualified investors"
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
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-bee-slate bg-white/80">
            Deal Desk Network
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-bee-slate mb-6">
            Connect Digital Asset 
            <span className="text-bee-gold"> Investors & Sellers</span>
          </h2>
          <p className="text-xl text-bee-slate/80 max-w-3xl mx-auto">
            Join our exclusive marketplace where proven digital businesses meet strategic investors. 
            Professional due diligence, confidential matching, and streamlined deal execution.
          </p>
        </div>

        {/* Dual CTA Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Investor Card */}
          <Card className="relative overflow-hidden border-2 border-bee-gold/20 hover:border-bee-gold transition-all duration-300 group">
            <CardContent className="p-8">
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
          <Card className="relative overflow-hidden border-2 border-bee-slate/20 hover:border-bee-slate transition-all duration-300 group">
            <CardContent className="p-8">
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