import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { DealCardsGenerator } from "../components/deal-cards-generator";
import { Mail, Users, Send, TestTube, Globe, TrendingUp } from "lucide-react";

interface EmailSubscription {
  id: string;
  email: string;
  tag: string;
  createdAt: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterHtml, setNewsletterHtml] = useState("");
  const [newsletterText, setNewsletterText] = useState("");
  const [testEmail, setTestEmail] = useState("");

  // Fetch all email subscriptions
  const { data: subscriptions, isLoading } = useQuery<{ subscriptions: EmailSubscription[] }>({
    queryKey: ['/api/emails'],
  });

  // Fetch investors and sellers data
  const { data: investorsData } = useQuery<{ investors: any[] }>({
    queryKey: ['/api/investors'],
  });

  const { data: sellersData } = useQuery<{ sellers: any[] }>({
    queryKey: ['/api/sellers'],
  });

  const investors = investorsData?.investors || [];
  const sellers = sellersData?.sellers || [];

  // Test email mutation
  const testEmailMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!response.ok) throw new Error('Failed to send test email');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Test email sent!",
        description: "Check your inbox for the welcome email."
      });
      setTestEmail("");
    },
    onError: () => {
      toast({
        title: "Failed to send test email",
        description: "Please check your email settings.",
        variant: "destructive"
      });
    }
  });

  // Newsletter mutation
  const newsletterMutation = useMutation({
    mutationFn: async (data: { subject: string; htmlContent: string; textContent: string }) => {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to send newsletter');
      return response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Newsletter sent successfully!",
        description: `Sent to ${data.results.successfulSends} subscribers.`
      });
      setNewsletterSubject("");
      setNewsletterHtml("");
      setNewsletterText("");
    },
    onError: () => {
      toast({
        title: "Failed to send newsletter",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  });

  const handleTestEmail = () => {
    if (!testEmail) return;
    testEmailMutation.mutate(testEmail);
  };

  const handleSendNewsletter = () => {
    if (!newsletterSubject || !newsletterHtml || !newsletterText) {
      toast({
        title: "Missing fields",
        description: "Please fill in all newsletter fields.",
        variant: "destructive"
      });
      return;
    }

    newsletterMutation.mutate({
      subject: newsletterSubject,
      htmlContent: newsletterHtml,
      textContent: newsletterText
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-bee-gray p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-bee-black">🐝 BeeHiveStack Admin</h1>
          <p className="text-bee-slate">Email Management & Deal Desk Dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-bee-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-bee-black">
                {isLoading ? "..." : subscriptions?.subscriptions?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
              <Mail className="h-4 w-4 text-bee-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-bee-black">
                {isLoading ? "..." : 
                  subscriptions?.subscriptions?.filter(sub => 
                    new Date(sub.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length || 0
                }
              </div>
              <p className="text-xs text-bee-slate">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email Status</CardTitle>
              <Send className="h-4 w-4 text-bee-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-bee-slate">SendGrid Connected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deal Desk</CardTitle>
              <TrendingUp className="h-4 w-4 text-bee-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-bee-black">
                {(investors.length || 0) + (sellers.length || 0)}
              </div>
              <p className="text-xs text-bee-slate">{investors.length || 0} investors, {sellers.length || 0} sellers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="emails" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Management
            </TabsTrigger>
            <TabsTrigger value="deal-desk" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Deal Desk
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emails">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscriber List */}
          <Card>
            <CardHeader>
              <CardTitle>Email Subscribers</CardTitle>
              <CardDescription>All registered email addresses</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {subscriptions?.subscriptions?.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-bee-black">{sub.email}</p>
                        <p className="text-sm text-bee-slate">{formatDate(sub.createdAt)}</p>
                      </div>
                      <Badge variant="secondary">{sub.tag}</Badge>
                    </div>
                  )) || (
                    <p className="text-center text-bee-slate py-8">No subscribers yet</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Tools */}
          <div className="space-y-6">
            {/* Test Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  Test Welcome Email
                </CardTitle>
                <CardDescription>Send a test welcome email to any address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="test-email">Email Address</Label>
                  <Input
                    id="test-email"
                    type="email"
                    placeholder="test@example.com"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleTestEmail}
                  disabled={testEmailMutation.isPending || !testEmail}
                  className="w-full bg-bee-gold hover:bg-bee-gold/90 text-bee-black"
                >
                  {testEmailMutation.isPending ? "Sending..." : "Send Test Email"}
                </Button>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Newsletter
                </CardTitle>
                <CardDescription>Send email to all subscribers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="newsletter-subject">Subject Line</Label>
                  <Input
                    id="newsletter-subject"
                    placeholder="Important BeeHiveStack Update"
                    value={newsletterSubject}
                    onChange={(e) => setNewsletterSubject(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="newsletter-html">HTML Content</Label>
                  <Textarea
                    id="newsletter-html"
                    placeholder="<h1>Newsletter Content</h1><p>Your message here...</p>"
                    value={newsletterHtml}
                    onChange={(e) => setNewsletterHtml(e.target.value)}
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="newsletter-text">Text Content</Label>
                  <Textarea
                    id="newsletter-text"
                    placeholder="Newsletter Content&#10;&#10;Your message here..."
                    value={newsletterText}
                    onChange={(e) => setNewsletterText(e.target.value)}
                    rows={4}
                  />
                </div>

                <Separator />

                <Button 
                  onClick={handleSendNewsletter}
                  disabled={newsletterMutation.isPending || !subscriptions?.subscriptions?.length}
                  className="w-full bg-bee-gold hover:bg-bee-gold/90 text-bee-black"
                >
                  {newsletterMutation.isPending ? "Sending..." : 
                   `Send to ${subscriptions?.subscriptions?.length || 0} Subscribers`}
                </Button>
                
                {!subscriptions?.subscriptions?.length && (
                  <p className="text-sm text-bee-slate text-center">No subscribers to send to</p>
                )}
              </CardContent>
            </Card>
          </div>
            </div>
          </TabsContent>

          <TabsContent value="deal-desk">
            <DealCardsGenerator />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Coming soon - Advanced analytics and reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-bee-slate/30 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-bee-slate mb-2">Analytics Dashboard</h4>
                  <p className="text-bee-slate/70">
                    Advanced analytics and insights will be available here soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}