"use client";

import { useState } from "react";
import { NewsletterData } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NewsletterFormProps {
  data: NewsletterData;
}

export function NewsletterForm({ data }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setStatus("loading");

    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-8">
      <div className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={data.input_placeholder}
          required
          aria-label="Email address"
          aria-describedby="newsletter-consent"
          className="w-full border border-white/30 rounded-base bg-white/10 text-text-on-dark placeholder:text-white/50 focus:border-white/70 focus:outline-none focus:ring-1 focus:ring-white/70 px-4 py-3"
        />
        
        <label id="newsletter-consent" className="flex items-start gap-3 text-sm text-text-on-dark/70 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 shrink-0 cursor-pointer"
          />
          <span dangerouslySetInnerHTML={{ __html: data.consent_text }} />
        </label>

        <button
          type="submit"
          disabled={status === "loading" || !consent}
          className="w-full bg-brand-primary text-text-on-dark px-8 py-3 rounded-btn text-sm font-medium tracking-wide uppercase hover:bg-opacity-80 transition-colors duration-base disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {status === "loading" && data.loading_label ? data.loading_label : data.submit_label}
        </button>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="mt-4 overflow-hidden"
          >
            <p role="status" className="text-green-400 text-center font-medium">
              {data.success_message}
            </p>
          </motion.div>
        )}
        
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="mt-4 overflow-hidden"
          >
            <p role="alert" className="text-red-400 text-center font-medium">
              {data.error_message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {data.notice_label && status === "idle" && (
        <p className="text-xs text-center text-text-on-dark/50 mt-4">
          {data.notice_label}
        </p>
      )}
    </form>
  );
}
