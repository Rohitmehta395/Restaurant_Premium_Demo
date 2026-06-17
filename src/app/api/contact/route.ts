import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ContactPageData, ContactFormField } from "@/types";

// In-memory rate limit map (use Redis/Upstash for production across multiple instances)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const IP_RATE_LIMIT = 5; // 5 requests per minute per IP
const EMAIL_RATE_LIMIT = 3; // 3 requests per minute per email
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window

// Periodic cleanup to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.expiresAt) {
      rateLimitMap.delete(key);
    }
  }
}, 60000);

function checkRateLimit(key: string, limit: number, now: number): boolean {
  const rateData = rateLimitMap.get(key) || { count: 0, expiresAt: now + RATE_LIMIT_WINDOW_MS };
  
  if (now > rateData.expiresAt) {
    rateData.count = 0;
    rateData.expiresAt = now + RATE_LIMIT_WINDOW_MS;
  }
  
  if (rateData.count >= limit) {
    return false;
  }
  
  rateData.count++;
  rateLimitMap.set(key, rateData);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    // 1. Check IP rate limit first
    if (!checkRateLimit(`ip:${ip}`, IP_RATE_LIMIT, now)) {
      return NextResponse.json({ success: false, message: "Too many requests from this IP, please try again later." }, { status: 429 });
    }

    const formData = await req.formData();
    
    // 2. Try to extract email for rate limiting
    let submittedEmail: string | null = null;
    const emailField = formData.get("email");
    if (typeof emailField === "string" && emailField.trim() !== "") {
      submittedEmail = emailField.toLowerCase().trim();
    }
    
    // 3. Check Email rate limit if email is provided
    if (submittedEmail) {
      if (!checkRateLimit(`email:${submittedEmail}`, EMAIL_RATE_LIMIT, now)) {
        return NextResponse.json({ success: false, message: "Too many requests from this email address, please try again later." }, { status: 429 });
      }
    }
    
    // Read config to validate required fields
    const dataPath = path.join(process.cwd(), "data", "pages", "contact.json");
    const fileContent = await fs.readFile(dataPath, "utf-8");
    const contactData = JSON.parse(fileContent) as ContactPageData;
    const fields = contactData.form_config.fields;

    const errors: string[] = [];

    fields.forEach((field: ContactFormField) => {
      if (field.type === "file") {
        const file = formData.get(field.name) as File | null;
        if (field.required && (!file || file.size === 0)) {
          errors.push(`Missing required file: ${field.label}`);
        } else if (file && file.size > 0 && field.max_file_size_mb) {
          const sizeMB = file.size / (1024 * 1024);
          if (sizeMB > field.max_file_size_mb) {
            errors.push(field.validation_message || `File ${field.label} exceeds maximum size of ${field.max_file_size_mb}MB.`);
          }
        }
      } else {
        const value = formData.get(field.name) as string | null;
        if (field.required && (!value || value.trim() === "")) {
          errors.push(`Missing required field: ${field.label}`);
        }
      }
    });

    if (errors.length > 0) {
      return NextResponse.json({ success: false, message: "Validation failed.", errors }, { status: 400 });
    }

    // In production, integrate with SendGrid, Resend, or CRM.
    // For now, log success:
    console.log(`Received contact form submission from IP ${ip} / Email ${submittedEmail || "none"}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}