import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

const emailFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional(),
  consentToSMS: z.boolean().default(false),
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
  // Basic US phone number validation if phone is provided
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

type EmailFormData = z.infer<typeof emailFormSchema>;

export function EmailCTA() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consentToSMS: false
    }
  });

  const submitEmailMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      return apiRequest("POST", "/api/emails", {
        ...data,
        tag: "BeeHiveStack—Early Access"
      });
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      // Reset success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: EmailFormData) => {
    submitEmailMutation.mutate(data);
  };

  const openModal = (modalType: string) => {
    const event = new CustomEvent('openModal', { detail: modalType });
    window.dispatchEvent(event);
  };

  return (
    <section id="email-signup" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-bee-black leading-tight mb-6">Get Early Access</h2>
            <p className="text-lg text-bee-slate">Be the first to know when new tools and sites go live.</p>
          </div>
          
          {!showSuccess ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input 
                  type="text" 
                  id="name"
                  data-testid="input-name"
                  {...form.register("name")}
                  placeholder="Name (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bee-gold focus:border-bee-gold text-bee-black placeholder-gray-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  data-testid="input-email"
                  {...form.register("email")}
                  placeholder="Email Address (required)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bee-gold focus:border-bee-gold text-bee-black placeholder-gray-500"
                />
                {form.formState.errors.email && (
                  <div className="text-red-600 text-sm mt-1 text-left" role="alert">
                    {form.formState.errors.email.message}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  data-testid="input-phone"
                  {...form.register("phone")}
                  placeholder="Phone Number (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bee-gold focus:border-bee-gold text-bee-black placeholder-gray-500"
                />
                {form.formState.errors.phone && (
                  <div className="text-red-600 text-sm mt-1 text-left" role="alert">
                    {form.formState.errors.phone.message}
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-1 text-left">Format: (123) 456-7890 or 123-456-7890</p>
              </div>

              {/* SMS Consent Checkbox - A2P Compliant */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="consentToSMS"
                    data-testid="checkbox-sms-consent"
                    {...form.register("consentToSMS")}
                    className="mt-1 h-4 w-4 text-bee-gold focus:ring-bee-gold border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="consentToSMS" className="text-sm text-bee-slate text-left cursor-pointer">
                    I agree to receive marketing messages from <strong>BeeHiveStack</strong> at the phone number provided. 
                    Message frequency varies. Reply <strong>STOP</strong> to opt-out, <strong>HELP</strong> for help. 
                    Message and data rates may apply.
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                data-testid="button-submit"
                disabled={submitEmailMutation.isPending}
                className="w-full bg-bee-gold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-bee-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bee-gold focus:ring-offset-2"
              >
                {submitEmailMutation.isPending ? "Submitting..." : "Get Notified"}
              </button>

              {/* Legal Links */}
              <div className="text-center text-xs text-gray-600 space-x-2">
                <button 
                  type="button"
                  onClick={() => openModal('privacy')}
                  className="underline hover:text-bee-gold transition-colors"
                  data-testid="link-privacy-policy"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button 
                  type="button"
                  onClick={() => openModal('terms')}
                  className="underline hover:text-bee-gold transition-colors"
                  data-testid="link-terms-of-service"
                >
                  Terms of Service
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg" data-testid="success-message">
              <p className="text-green-800 font-medium">Thanks—check your inbox for a quick confirmation.</p>
            </div>
          )}
          
          <p className="text-xs text-gray-600 mt-6 text-center">
            We'll only contact you about BeeHiveStack updates. You can unsubscribe anytime.<br/>
            Available to U.S. residents only.
          </p>
        </div>
      </div>
    </section>
  );
}
