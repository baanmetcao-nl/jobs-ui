import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Simple in-memory rate limiter
// Note: In production, use Redis or similar for distributed rate limiting
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per hour per IP

function getRateLimitKey(ip: string): string {
  return `contact:${ip}`;
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const key = getRateLimitKey(ip);
  const now = Date.now();

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    // New window, reset the count
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(key, entry);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
  };
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  try {
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);

    // Set rate limit headers
    const headers = {
      "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
      "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
    };

    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil(
        (rateLimit.resetTime - Date.now()) / 60000,
      );
      return NextResponse.json(
        {
          error: `Te veel aanvragen. Probeer het over ${resetMinutes} minuut${resetMinutes > 1 ? "en" : ""} opnieuw.`,
          retryAfter: resetMinutes,
        },
        {
          status: 429,
          headers,
        },
      );
    }

    const { name, email, subject, message, company } = await req.json();

    // Honeypot check - if company field is filled, silently succeed
    if (company && company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400, headers },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in." },
        { status: 400, headers },
      );
    }

    await resend.emails.send({
      from: "BaanmetCAO contactformulier <info@baanmetcao.nl>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: subject || "Nieuw bericht via contactformulier",
      html: `
        <h3>Nieuw bericht</h3>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bericht:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
