import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  DollarSign, 
  Users, 
  Clock,
  Globe,
  BarChart3,
  Calendar,
  Target,
  Eye
} from "lucide-react";
import type { Seller } from "@shared/schema";

export function DealCardsGenerator() {
  const [showAnonymized, setShowAnonymized] = useState(true);

  const { data: sellersData, isLoading } = useQuery({
    queryKey: ['/api/sellers'],
    select: (data: { sellers: Seller[] }) => data.sellers || [],
  });

  const generateDealCard = (seller: Seller, anonymous: boolean = true) => {
    // Generate anonymized deal card data
    const businessAge = Math.floor(Math.random() * 5) + 1; // 1-5 years
    const askingMultiple = seller.currentRevenue.includes('$100k') ? '24-36x' :
                          seller.currentRevenue.includes('$50k') ? '30-42x' :
                          seller.currentRevenue.includes('$25k') ? '36-48x' :
                          seller.currentRevenue.includes('$10k') ? '40-50x' : '48x+';

    return {
      id: seller.id,
      businessType: seller.businessType,
      monthlyRevenue: seller.currentRevenue,
      monetization: seller.monetizationMethods.join(', '),
      traffic: seller.monthlyTraffic,
      trafficSources: anonymous ? 
        seller.trafficSources.split(',').map(s => s.trim().split(' ')[0]).join(', ') : 
        seller.trafficSources,
      workload: seller.operationalLoad,
      businessAge: `${businessAge} years`,
      askingMultiple,
      revenueTrend: seller.revenueTrend,
      exitTimeline: seller.exitTimeline,
      teamSize: seller.teamSize,
      willingToConsider: seller.willingToConsider.join(', '),
      name: anonymous ? 'Confidential' : seller.name,
      websites: anonymous ? 'Available on Request' : seller.websiteUrls.join(', '),
      keepAnonymized: seller.keepAnonymized,
      fastTrack: seller.fastTrack,
      createdAt: seller.createdAt
    };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'growing':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
      default:
        return <Minus className="h-4 w-4 text-blue-600" />;
    }
  };

  const getUrgencyBadge = (timeline: string) => {
    switch (timeline.toLowerCase()) {
      case 'immediate':
        return <Badge variant="destructive">Immediate</Badge>;
      case '1-3 months':
        return <Badge className="bg-orange-100 text-orange-800">1-3 Months</Badge>;
      case '3-6 months':
        return <Badge className="bg-yellow-100 text-yellow-800">3-6 Months</Badge>;
      default:
        return <Badge variant="outline">{timeline}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const sellers = sellersData || [];
  const dealCards = sellers.map(seller => generateDealCard(seller, showAnonymized));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-bee-slate">Deal Cards Generator</h3>
          <p className="text-sm text-bee-slate/70">
            Generate anonymized deal presentations for investor distribution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showAnonymized ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAnonymized(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Anonymized View
          </Button>
          <Button
            variant={!showAnonymized ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAnonymized(false)}
          >
            Full Details
          </Button>
        </div>
      </div>

      {dealCards.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Globe className="h-12 w-12 text-bee-slate/30 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-bee-slate mb-2">No Business Listings Yet</h4>
            <p className="text-bee-slate/70">
              Business listings will appear here once sellers complete their onboarding.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dealCards.map((deal) => (
            <Card key={deal.id} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-bee-slate">{deal.businessType}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {deal.monthlyRevenue}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1">
                    {deal.fastTrack && (
                      <Badge className="bg-bee-gold text-bee-black">Fast Track</Badge>
                    )}
                    {getUrgencyBadge(deal.exitTimeline)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Revenue & Trend */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(deal.revenueTrend)}
                    <span className="text-sm font-medium capitalize">{deal.revenueTrend}</span>
                  </div>
                  <div className="text-sm text-bee-slate/70">
                    Age: {deal.businessAge}
                  </div>
                </div>

                <Separator />

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-3 w-3 text-bee-slate/50" />
                    <span className="text-bee-slate/70">Traffic:</span>
                  </div>
                  <span className="font-medium">{deal.traffic}</span>

                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-bee-slate/50" />
                    <span className="text-bee-slate/70">Sources:</span>
                  </div>
                  <span className="font-medium text-xs">{deal.trafficSources}</span>

                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-bee-slate/50" />
                    <span className="text-bee-slate/70">Workload:</span>
                  </div>
                  <span className="font-medium">{deal.workload}</span>

                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-bee-slate/50" />
                    <span className="text-bee-slate/70">Team:</span>
                  </div>
                  <span className="font-medium">{deal.teamSize}</span>
                </div>

                <Separator />

                {/* Monetization */}
                <div>
                  <div className="text-xs font-medium text-bee-slate/70 mb-1">Monetization:</div>
                  <div className="text-sm">{deal.monetization}</div>
                </div>

                {/* Deal Structure */}
                <div>
                  <div className="text-xs font-medium text-bee-slate/70 mb-1">Open To:</div>
                  <div className="text-sm">{deal.willingToConsider}</div>
                </div>

                {/* Asking Price */}
                <div className="bg-bee-gray/50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-bee-slate/70 mb-1">Asking Multiple:</div>
                  <div className="text-lg font-bold text-bee-gold">{deal.askingMultiple}</div>
                </div>

                {/* Website Info */}
                <div>
                  <div className="text-xs font-medium text-bee-slate/70 mb-1">Website(s):</div>
                  <div className="text-sm">{deal.websites}</div>
                </div>

                {/* Contact Info */}
                <div className="pt-2 border-t">
                  <div className="text-xs font-medium text-bee-slate/70 mb-1">Contact:</div>
                  <div className="text-sm">{deal.name}</div>
                  {!showAnonymized && (
                    <div className="text-xs text-bee-slate/50 mt-1">
                      Listed: {new Date(deal.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Privacy Notice */}
                {showAnonymized && deal.keepAnonymized && (
                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                    <Eye className="h-3 w-3 inline mr-1" />
                    Seller requires NDA for full details
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-bee-slate/50">Status:</span>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    Available
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {dealCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-bee-slate">Deal Digest Summary</CardTitle>
            <CardDescription>
              Monthly overview for investor distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-bee-gold">{dealCards.length}</div>
                <div className="text-sm text-bee-slate/70">Total Listings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-bee-gold">
                  {dealCards.filter(d => d.exitTimeline === 'immediate').length}
                </div>
                <div className="text-sm text-bee-slate/70">Immediate Sales</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-bee-gold">
                  {dealCards.filter(d => d.fastTrack).length}
                </div>
                <div className="text-sm text-bee-slate/70">Fast Track</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-bee-gold">
                  {dealCards.filter(d => d.revenueTrend === 'growing').length}
                </div>
                <div className="text-sm text-bee-slate/70">Growing Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}