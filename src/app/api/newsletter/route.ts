import { NextRequest, NextResponse } from "next/server";
import { getNewsletterData } from "@/lib/data/loaders";
import { getNewsletterProvider } from "@/lib/email/newsletter-provider";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_COUNT = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (limit.count >= RATE_LIMIT_COUNT) {
    return true;
  }

  limit.count++;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const newsletterData = await getNewsletterData();
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { email, consent } = body;

    // 1. Validate Email
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: newsletterData.error_message || "Invalid email address",
        },
        { status: 400 },
      );
    }

    // 2. Validate Consent
    if (consent !== true) {
      return NextResponse.json(
        { success: false, message: "Consent is required." },
        { status: 400 },
      );
    }

    // 3. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    // 4. Provider Call
    const provider = getNewsletterProvider();
    try {
      await provider.subscribe({
        email,
        consentGiven: consent,
        source: "website-footer",
        tags: ["newsletter-form"],
      });

      return NextResponse.json(
        {
          success: true,
          message:
            newsletterData.success_message || "Thank you for subscribing.",
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("[Newsletter API] Provider Error:", error);
      return NextResponse.json(
        { success: false, message: "An error occurred. Please try again." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("[Newsletter API] Unexpected Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return new NextResponse(null, { status: 405 });
}

export async function PUT() {
  return new NextResponse(null, { status: 405 });
}

export async function DELETE() {
  return new NextResponse(null, { status: 405 });
}

export async function PATCH() {
  return new NextResponse(null, { status: 405 });
}
