import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ContactPageData, ContactFormField } from "@/types";

// Very basic in-memory rate limit: 5 reqs per minute
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 60000;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, expiresAt: now + RATE_LIMIT_WINDOW_MS };

    if (now > rateData.expiresAt) {
      rateData.count = 0;
      rateData.expiresAt = now + RATE_LIMIT_WINDOW_MS;
    }

    if (rateData.count >= RATE_LIMIT) {
      return NextResponse.json({ success: false, message: "Too many requests, please try again later." }, { status: 429 });
    }

    rateData.count++;
    rateLimitMap.set(ip, rateData);

    const formData = await req.formData();
    
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
    console.log(`Received contact form submission from IP ${ip}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}