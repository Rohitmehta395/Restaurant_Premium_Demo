"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContactFormField } from "@/types";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  formConfig: {
    fields: ContactFormField[];
    submit_label: string;
    consent_text: string;
    success_heading: string;
    success_body: string;
    error_message: string;
  };
  privacyPolicyUrl: string;
}

export function ContactForm({ formConfig, privacyPolicyUrl }: ContactFormProps) {
  const [textFields, setTextFields] = useState<Record<string, string>>({});
  const [radioValues, setRadioValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (status === "success" && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [status]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0] || null);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData();
    Object.entries(textFields).forEach(([key, value]) => formData.append(key, value));
    Object.entries(radioValues).forEach(([key, value]) => formData.append(key, value));
    formData.append("consent", consent ? "true" : "false");
    
    if (file) {
      formData.append("file_attachment", file);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || formConfig.error_message);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(formConfig.error_message);
    }
  };

  if (status === "success") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
          className="p-8 bg-surface-alternate rounded-base border border-border-subtle text-center"
        >
          <h3 
            ref={successHeadingRef} 
            tabIndex={-1} 
            className="text-section-h2 text-text-primary mb-4 outline-none font-display font-semibold"
          >
            {formConfig.success_heading}
          </h3>
          <p className="text-body-large text-text-secondary">
            {formConfig.success_body}
          </p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {status === "error" && (
        <div role="alert" className="p-4 bg-destructive/10 text-destructive rounded-base border border-destructive/20">
          {errorMsg}
        </div>
      )}

      {formConfig.fields.map((field) => {
        if (field.type === "text" || field.type === "email" || field.type === "tel") {
          return (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-body-base font-medium text-text-primary">
                {field.label} {field.required && <span className="text-brand-secondary">*</span>}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                aria-required={field.required ? "true" : undefined}
                value={textFields[field.name] || ""}
                onChange={handleTextChange}
                className="bg-surface-default h-11"
              />
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-body-base font-medium text-text-primary">
                {field.label} {field.required && <span className="text-brand-secondary">*</span>}
              </Label>
              <Textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                aria-required={field.required ? "true" : undefined}
                value={textFields[field.name] || ""}
                onChange={handleTextChange}
                className="bg-surface-default min-h-[120px]"
              />
            </div>
          );
        }

        if (field.type === "radio") {
          return (
            <fieldset key={field.name} className="space-y-3">
              <legend className="text-body-base font-medium text-text-primary mb-2">
                {field.label} {field.required && <span className="text-brand-secondary">*</span>}
              </legend>
              <RadioGroup
                value={radioValues[field.name]}
                onValueChange={(val) => setRadioValues((prev) => ({ ...prev, [field.name]: val }))}
                className="flex flex-col gap-2"
                required={field.required}
                aria-required={field.required ? "true" : undefined}
              >
                {field.options?.map((opt) => (
                  <div key={opt.value} className="flex items-center">
                    <RadioGroupItem value={opt.value} id={`${field.name}-${opt.value}`} className="shrink-0" />
                    <Label 
                      htmlFor={`${field.name}-${opt.value}`} 
                      className="flex-1 min-h-[44px] flex items-center pl-3 font-normal cursor-pointer text-text-secondary select-none"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>
          );
        }

        if (field.type === "file") {
          return (
            <div key={field.name} className="space-y-2">
              <Label className="text-body-base font-medium text-text-primary block">
                {field.label} {field.required && <span className="text-brand-secondary">*</span>}
              </Label>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => fileInputRef.current?.click()}
                  aria-controls={`${field.name}-input`}
                  className="w-full md:w-auto h-11"
                >
                  Choose File
                </Button>
                <span className="text-[13px] text-text-secondary truncate max-w-full">
                  {file ? file.name : "No file chosen"}
                </span>
                <input
                  id={`${field.name}-input`}
                  ref={fileInputRef}
                  type="file"
                  name={field.name}
                  accept="*/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  required={field.required && !file}
                  aria-required={field.required ? "true" : undefined}
                  aria-describedby={field.max_file_size_mb && (file && file.size / (1024 * 1024) > field.max_file_size_mb) ? `${field.name}-error` : undefined}
                />
              </div>
              {field.max_file_size_mb && (
                <p className="text-[12px] text-text-secondary">
                  Max file size: {field.max_file_size_mb}MB
                </p>
              )}
              {file && field.max_file_size_mb && (file.size / (1024 * 1024) > field.max_file_size_mb) && (
                <p id={`${field.name}-error`} role="alert" className="text-[12px] text-destructive">
                  {field.validation_message || `File exceeds ${field.max_file_size_mb}MB limit.`}
                </p>
              )}
            </div>
          );
        }

        if (field.type === "checkbox" && field.name === "consent") {
          return (
            <div key={field.name} className="flex items-start gap-3 pt-4">
              <Checkbox 
                id={field.name} 
                checked={consent} 
                onCheckedChange={(val) => setConsent(val as boolean)}
                required={field.required}
                aria-required={field.required ? "true" : undefined}
                className="mt-1 size-5"
              />
              <Label htmlFor={field.name} className="font-normal text-text-secondary leading-relaxed min-h-[44px] flex items-start pt-0.5 cursor-pointer">
                <span>{formConfig.consent_text} <Link href={privacyPolicyUrl as any} className="text-brand-primary hover:underline font-medium">Privacy Policy</Link>.</span>
              </Label>
            </div>
          );
        }

        return null;
      })}

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={status === "loading"}
          className={cn(
            "w-full md:w-auto h-12 md:h-11 px-10",
            status === "loading" ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {status === "loading" ? "Sending..." : formConfig.submit_label}
        </Button>
      </div>
    </form>
  );
}
