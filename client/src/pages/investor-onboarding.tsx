import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Users, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  consentToSMS: z.boolean().default(false),
  linkedin: z.string().url("Valid LinkedIn URL required").optional().or(z.literal("")),
  investmentBudget: z.string().min(1, "Investment budget is required"),
  investmentStructure: z.string().min(1, "Investment structure is required"),
  businessTypes: z.array(z.string()).min(1, "Select at least one business type"),
  targetRevenue: z.string().min(1, "Target revenue is required"),
  dealSizeComfort: z.string().min(1, "Deal size comfort is required"),
  timeline: z.string().min(1, "Timeline is required"),
  involvement: z.string().min(1, "Involvement level is required"),
  keepConfidential: z.boolean().default(false),
  premiumDeals: z.boolean().default(false),
  convertKitTag: z.string().default("Investor—Pending Onboarding"),
}).refine((data) => {
  // If user consents to SMS, phone number is required
  if (data.consentToSMS && !data.phone) {
    return false;
  }
  return true;
}, {
  message: "Phone number is required when opting in to SMS notifications",
  path: ["phone"]
}).refine((data) => {
  // US phone number validation if phone is provided
  if (data.phone && data.phone.trim()) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    const digitsOnly = data.phone.replace(/\D/g, '');
    return phoneRegex.test(data.phone) && digitsOnly.length === 10;
  }
  return true;
}, {
  message: "Please enter a valid 10-digit US phone number",
  path: ["phone"]
});

type InvestorFormData = z.infer<typeof investorSchema>;

const businessTypeOptions = [
  "SaaS",
  "E-commerce",
  "Affiliate Marketing", 
  "Digital Products",
  "Content/Media"
];

export default function InvestorOnboarding() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InvestorFormData>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consentToSMS: false,
      linkedin: "",
      investmentBudget: "",
      investmentStructure: "",
      businessTypes: [],
      targetRevenue: "",
      dealSizeComfort: "",
      timeline: "",
      involvement: "",
      keepConfidential: false,
      premiumDeals: false,
      convertKitTag: "Investor—Pending Onboarding",
    },
  });

  const investorMutation = useMutation({
    mutationFn: (data: InvestorFormData) => apiRequest("/api/investors", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Profile Created Successfully!",
        description: "Welcome to the BeeHiveStack Investor Network. We'll be in touch soon with opportunities.",
      });
    },
    onError: (error: any) => {
      console.error("Investor onboarding error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InvestorFormData) => {
    investorMutation.mutate(data);
  };

  const openModal = (modalType: string) => {
    const event = new CustomEvent('openModal', { detail: modalType });
    window.dispatchEvent(event);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-bee-gray flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-bee-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-bee-slate mb-2">
                Welcome to the Network!
              </h2>
              <p className="text-bee-slate/70">
                Your investor profile has been created successfully. Our team will review your information and begin matching you with relevant opportunities within 24-48 hours.
              </p>
            </div>
            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full bg-bee-gold text-bee-black hover:bg-bee-gold/90">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bee-gray py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-bee-slate hover:text-bee-gold transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-bee-gold/10 rounded-lg">
              <Users className="h-6 w-6 text-bee-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-bee-slate">Investor Network Application</h1>
              <p className="text-bee-slate/70">Join our exclusive marketplace for digital asset investments</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-bee-slate">Investment Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Investment Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="investmentBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Budget Range *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="$10k-$50k">$10k - $50k</SelectItem>
                            <SelectItem value="$50k-$100k">$50k - $100k</SelectItem>
                            <SelectItem value="$100k-$250k">$100k - $250k</SelectItem>
                            <SelectItem value="$250k-$500k">$250k - $500k</SelectItem>
                            <SelectItem value="$500k-$1M">$500k - $1M</SelectItem>
                            <SelectItem value="$1M+">$1M+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="investmentStructure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Investment Structure *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select structure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-acquisition">Full Acquisition</SelectItem>
                            <SelectItem value="majority-equity">Majority Equity</SelectItem>
                            <SelectItem value="minority-equity">Minority Equity</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="revenue-share">Revenue Share</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Business Types */}
                <FormField
                  control={form.control}
                  name="businessTypes"
                  render={() => (
                    <FormItem>
                      <FormLabel>Business Types of Interest * (Select all that apply)</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {businessTypeOptions.map((type) => (
                          <FormField
                            key={type}
                            control={form.control}
                            name="businessTypes"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={type}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(type)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, type])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== type
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {type}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="targetRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Monthly Revenue Range *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select revenue range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="$1k-$5k">$1k - $5k</SelectItem>
                            <SelectItem value="$5k-$10k">$5k - $10k</SelectItem>
                            <SelectItem value="$10k-$25k">$10k - $25k</SelectItem>
                            <SelectItem value="$25k-$50k">$25k - $50k</SelectItem>
                            <SelectItem value="$50k-$100k">$50k - $100k</SelectItem>
                            <SelectItem value="$100k+">$100k+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dealSizeComfort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revenue Multiple Comfort Zone *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select multiple range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="12-24x">12-24x Monthly Revenue</SelectItem>
                            <SelectItem value="24-36x">24-36x Monthly Revenue</SelectItem>
                            <SelectItem value="36-48x">36-48x Monthly Revenue</SelectItem>
                            <SelectItem value="48x+">48x+ Monthly Revenue</SelectItem>
                            <SelectItem value="case-by-case">Evaluate Case by Case</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Timeline *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="immediate">Ready to Invest Immediately</SelectItem>
                            <SelectItem value="1-3-months">1-3 Months</SelectItem>
                            <SelectItem value="3-6-months">3-6 Months</SelectItem>
                            <SelectItem value="6-12-months">6-12 Months</SelectItem>
                            <SelectItem value="exploring">Still Exploring</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="involvement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Level of Involvement *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select involvement level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hands-off">Hands-off Investor</SelectItem>
                            <SelectItem value="advisory">Advisory Role</SelectItem>
                            <SelectItem value="partial-management">Partial Management</SelectItem>
                            <SelectItem value="active-management">Active Management</SelectItem>
                            <SelectItem value="operational">Full Operational Control</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Privacy & Premium Options */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="keepConfidential"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Keep my identity confidential until I approve a deal
                          </FormLabel>
                          <FormDescription>
                            Your profile will be anonymized in deal presentations until you choose to reveal your identity.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="premiumDeals"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Interested in premium deal flow (priority access)
                          </FormLabel>
                          <FormDescription>
                            Get first access to high-value opportunities and exclusive deal presentations.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* SMS Consent - A2P Compliant */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-bee-gold/30 rounded-lg p-4">
                  <FormField
                    control={form.control}
                    name="consentToSMS"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-investor-sms-consent"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-semibold text-bee-black">
                            📱 Yes! Send me SMS alerts for new deal opportunities and investor matches
                          </FormLabel>
                          <FormDescription className="text-xs text-gray-600 mt-1.5">
                            By checking this box, I agree to receive marketing messages from <strong>BeeHiveStack</strong>. 
                            Message frequency varies. Reply <strong>STOP</strong> to opt-out, <strong>HELP</strong> for help. 
                            Message and data rates may apply.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-bee-gold text-bee-black hover:bg-bee-gold/90" 
                  size="lg"
                  disabled={investorMutation.isPending}
                  data-testid="button-submit-investor"
                >
                  {investorMutation.isPending ? "Creating Profile..." : "Join Investor Network"}
                </Button>

                {/* Legal Links */}
                <div className="text-center text-xs text-gray-600 space-x-2">
                  <button 
                    type="button"
                    onClick={() => openModal('privacy')}
                    className="underline hover:text-bee-gold transition-colors"
                    data-testid="link-privacy-policy-investor"
                  >
                    Privacy Policy
                  </button>
                  <span>•</span>
                  <button 
                    type="button"
                    onClick={() => openModal('terms')}
                    className="underline hover:text-bee-gold transition-colors"
                    data-testid="link-terms-of-service-investor"
                  >
                    Terms of Service
                  </button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}