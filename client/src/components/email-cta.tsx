import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

const emailSchema = z.object({
  email: z.string().min(1, "Please enter your email address").email("Please enter a valid email address")
});

type EmailFormData = z.infer<typeof emailSchema>;

export function EmailCTA() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  const submitEmailMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      return apiRequest("POST", "/api/emails", data);
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

  return (
    <section id="email-signup" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-bee-black leading-tight mb-6">Get Early Access</h2>
          <p className="text-lg text-bee-slate mb-8">Be the first to know when new tools and sites go live.</p>
          
          {!showSuccess ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input 
                  type="email" 
                  id="email"
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
              
              <button 
                type="submit" 
                disabled={submitEmailMutation.isPending}
                className="w-full bg-bee-gold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-bee-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bee-gold focus:ring-offset-2"
              >
                {submitEmailMutation.isPending ? "Submitting..." : "Get Notified"}
              </button>
            </form>
          ) : (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Thanks—check your inbox for a quick confirmation.</p>
            </div>
          )}
          
          <p className="text-xs text-bee-slate mt-4">
            We'll only email you about BeeHiveStack updates. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}
