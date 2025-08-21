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
import { ArrowLeft, Globe, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const sellerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  linkedin: z.string().url("Valid LinkedIn URL required").optional().or(z.literal("")),
  websiteUrls: z.array(z.string().url("Valid URL required")).min(1, "At least one website URL is required"),
  businessType: z.string().min(1, "Business type is required"),
  monetizationMethods: z.array(z.string()).min(1, "Select at least one monetization method"),
  currentRevenue: z.string().min(1, "Current revenue is required"),
  revenueTrend: z.string().min(1, "Revenue trend is required"),
  monthlyTraffic: z.string().min(1, "Monthly traffic is required"),
  trafficSources: z.string().min(1, "Traffic sources are required"),
  operationalLoad: z.string().min(1, "Operational load is required"),
  teamSize: z.string().min(1, "Team size is required"),
  exitTimeline: z.string().min(1, "Exit timeline is required"),
  valuationExpectation: z.string().optional(),
  willingToConsider: z.array(z.string()).min(1, "Select at least one option"),
  keepAnonymized: z.boolean().default(false),
  fastTrack: z.boolean().default(false),
  documentsUploaded: z.string().optional(),
  convertKitTag: z.string().default("Seller—Pending Onboarding"),
});

type SellerFormData = z.infer<typeof sellerSchema>;

const businessTypeOptions = [
  "SaaS",
  "E-commerce", 
  "Affiliate Marketing",
  "Digital Products",
  "Content/Media"
];

const monetizationOptions = [
  "Subscriptions",
  "Advertising",
  "Affiliate Revenue",
  "Product Sales",
  "Sponsorships",
  "Licensing"
];

const willingToConsiderOptions = [
  "Full Sale",
  "Partial Ownership",
  "Partnership",
  "Revenue Share"
];

export default function SellerOnboarding() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [websiteInputs, setWebsiteInputs] = useState([""]);
  const { toast } = useToast();

  const form = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      websiteUrls: [""],
      businessType: "",
      monetizationMethods: [],
      currentRevenue: "",
      revenueTrend: "",
      monthlyTraffic: "",
      trafficSources: "",
      operationalLoad: "",
      teamSize: "",
      exitTimeline: "",
      valuationExpectation: "",
      willingToConsider: [],
      keepAnonymized: false,
      fastTrack: false,
      documentsUploaded: "",
      convertKitTag: "Seller—Pending Onboarding",
    },
  });

  const sellerMutation = useMutation({
    mutationFn: (data: SellerFormData) => apiRequest("/api/sellers", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Profile Created Successfully!",
        description: "Your business listing has been submitted. We'll review and begin matching you with investors within 24-48 hours.",
      });
    },
    onError: (error: any) => {
      console.error("Seller onboarding error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const addWebsiteInput = () => {
    setWebsiteInputs([...websiteInputs, ""]);
  };

  const removeWebsiteInput = (index: number) => {
    if (websiteInputs.length > 1) {
      const newInputs = websiteInputs.filter((_, i) => i !== index);
      setWebsiteInputs(newInputs);
      const currentUrls = form.getValues("websiteUrls");
      form.setValue("websiteUrls", currentUrls.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (data: SellerFormData) => {
    // Filter out empty website URLs
    const filteredData = {
      ...data,
      websiteUrls: data.websiteUrls.filter(url => url.trim() !== "")
    };
    sellerMutation.mutate(filteredData);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-bee-gray flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-bee-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-bee-slate mb-2">
                Business Listed Successfully!
              </h2>
              <p className="text-bee-slate/70">
                Your business profile has been created and is under review. Our team will begin matching you with qualified investors and provide updates within 24-48 hours.
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
            <div className="p-3 bg-bee-slate/10 rounded-lg">
              <Globe className="h-6 w-6 text-bee-slate" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-bee-slate">Sell Your Website</h1>
              <p className="text-bee-slate/70">List your digital business for strategic investors</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-bee-slate">Business Information</CardTitle>
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

                {/* Website URLs */}
                <FormField
                  control={form.control}
                  name="websiteUrls"
                  render={() => (
                    <FormItem>
                      <FormLabel>Website URL(s) *</FormLabel>
                      <FormDescription>
                        Add all websites/domains included in this business sale
                      </FormDescription>
                      <div className="space-y-3">
                        {websiteInputs.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <FormField
                              control={form.control}
                              name={`websiteUrls.${index}`}
                              render={({ field }) => (
                                <FormControl>
                                  <Input
                                    placeholder="https://example.com"
                                    {...field}
                                    onChange={(e) => {
                                      const newUrls = form.getValues("websiteUrls");
                                      newUrls[index] = e.target.value;
                                      form.setValue("websiteUrls", newUrls);
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                              )}
                            />
                            {websiteInputs.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeWebsiteInput(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addWebsiteInput}
                        >
                          Add Another Website
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessTypeOptions.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Monthly Revenue *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select revenue range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="$0-$1k">$0 - $1k</SelectItem>
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
                </div>

                {/* Monetization Methods */}
                <FormField
                  control={form.control}
                  name="monetizationMethods"
                  render={() => (
                    <FormItem>
                      <FormLabel>Monetization Methods * (Select all that apply)</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {monetizationOptions.map((method) => (
                          <FormField
                            key={method}
                            control={form.control}
                            name="monetizationMethods"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={method}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(method)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, method])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== method
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {method}
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
                    name="revenueTrend"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revenue Trend *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select trend" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="growing">Growing</SelectItem>
                            <SelectItem value="stable">Stable</SelectItem>
                            <SelectItem value="declining">Declining</SelectItem>
                            <SelectItem value="seasonal">Seasonal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyTraffic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Monthly Traffic *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select traffic range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-1k">0 - 1k visitors</SelectItem>
                            <SelectItem value="1k-10k">1k - 10k visitors</SelectItem>
                            <SelectItem value="10k-50k">10k - 50k visitors</SelectItem>
                            <SelectItem value="50k-100k">50k - 100k visitors</SelectItem>
                            <SelectItem value="100k-500k">100k - 500k visitors</SelectItem>
                            <SelectItem value="500k+">500k+ visitors</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="trafficSources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Top 3 Traffic Sources *</FormLabel>
                      <FormDescription>
                        List your primary traffic sources (e.g., "SEO, Direct, Social Media")
                      </FormDescription>
                      <FormControl>
                        <Input placeholder="SEO, Direct Traffic, Social Media" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="operationalLoad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Investment Required *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Hours per week" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-5 hours">0-5 hours/week</SelectItem>
                            <SelectItem value="5-10 hours">5-10 hours/week</SelectItem>
                            <SelectItem value="10-20 hours">10-20 hours/week</SelectItem>
                            <SelectItem value="20-40 hours">20-40 hours/week</SelectItem>
                            <SelectItem value="40+ hours">40+ hours/week</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="teamSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Size *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Solo">Solo (just me)</SelectItem>
                            <SelectItem value="2-3 people">2-3 people</SelectItem>
                            <SelectItem value="4-10 people">4-10 people</SelectItem>
                            <SelectItem value="10+ people">10+ people</SelectItem>
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
                    name="exitTimeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exit Timeline *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="When do you want to sell?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="immediate">Immediately</SelectItem>
                            <SelectItem value="1-3 months">1-3 Months</SelectItem>
                            <SelectItem value="3-6 months">3-6 Months</SelectItem>
                            <SelectItem value="6-12 months">6-12 Months</SelectItem>
                            <SelectItem value="exploring">Just Exploring</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="valuationExpectation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valuation Expectation</FormLabel>
                        <FormDescription>
                          Optional: Expected sale price or multiple
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="$50,000 or 24x monthly profit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Willing to Consider */}
                <FormField
                  control={form.control}
                  name="willingToConsider"
                  render={() => (
                    <FormItem>
                      <FormLabel>Willing to Consider * (Select all that apply)</FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {willingToConsiderOptions.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="willingToConsider"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option}
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

                {/* Privacy & Premium Options */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="keepAnonymized"
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
                            Keep my site anonymized until I approve investor introductions
                          </FormLabel>
                          <FormDescription>
                            Your business details will be anonymized in investor presentations until you approve specific introductions.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fastTrack"
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
                            Interested in Fast Track seller package (priority listing)
                          </FormLabel>
                          <FormDescription>
                            Get priority placement and accelerated matching with premium investors.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-bee-slate text-white hover:bg-bee-slate/90" 
                  size="lg"
                  disabled={sellerMutation.isPending}
                >
                  {sellerMutation.isPending ? "Creating Listing..." : "List My Business"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}