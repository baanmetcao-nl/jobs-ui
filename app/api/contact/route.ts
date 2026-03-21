import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// Detect dangerous content
function containsDangerous(input: string): boolean {
  return /<script|<iframe|javascript:|on\w+=/i.test(input);
}

// Escape HTML entities
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br/>");
}

interface ValidationResult {
  valid: boolean;
  value: string;
  error?: string;
}

function validateString(
  input: unknown,
  maxLen: number,
  name: string,
): ValidationResult {
  if (typeof input !== "string") {
    return { valid: false, value: "", error: name + " moet een tekst zijn." };
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, value: "", error: name + " is verplicht." };
  }
  if (trimmed.length > maxLen) {
    return {
      valid: false,
      value: "",
      error: name + " mag maximaal " + maxLen + " karakters bevatten.",
    };
  }
  if (containsDangerous(trimmed)) {
    return {
      valid: false,
      value: "",
      error: name + " bevat ongeoorloofde content.",
    };
  }
  return { valid: true, value: trimmed };
}

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
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

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
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  try {
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);

    const securityHeaders = {
      "X-Content-Type-Options": "nosniff",
      "Content-Type": "application/json",
    };

    const headers = {
      ...securityHeaders,
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
        },
        { status: 429, headers },
      );
    }

    const body = await req.json();
    const { name, email, subject, message, company } = body;

    if (company && typeof company === "string" && company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const nameVal = validateString(name, MAX_NAME_LENGTH, "Naam");
    if (!nameVal.valid)
      return NextResponse.json(
        { error: nameVal.error || "Ongeldige naam" },
        { status: 400, headers },
      );

    const emailVal = validateString(email, 254, "E-mailadres");
    if (!emailVal.valid)
      return NextResponse.json(
        { error: emailVal.error || "Ongeldig e-mailadres" },
        { status: 400, headers },
      );

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.value)) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in." },
        { status: 400, headers },
      );
    }

    const msgVal = validateString(message, MAX_MESSAGE_LENGTH, "Bericht");
    if (!msgVal.valid)
      return NextResponse.json(
        { error: msgVal.error || "Ongeldig bericht" },
        { status: 400, headers },
      );

    let subjVal: ValidationResult = { valid: true, value: "" };
    if (subject !== undefined && subject !== null) {
      subjVal = validateString(subject, MAX_SUBJECT_LENGTH, "Onderwerp");
      if (!subjVal.valid)
        return NextResponse.json(
          { error: subjVal.error || "Ongeldig onderwerp" },
          { status: 400, headers },
        );
    }

    const safeName = escapeHtml(nameVal.value);
    const safeEmail = escapeHtml(emailVal.value);
    const safeMessage = escapeHtml(msgVal.value);
    const safeSubject = subjVal.value
      ? escapeHtml(subjVal.value)
      : "Nieuw bericht via contactformulier";

    await resend.emails.send({
      from: "BaanmetCAO contactformulier <info@baanmetcao.nl>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: safeEmail,
      subject: safeSubject,
      html:
        "<h3>Nieuw bericht</h3><p><strong>Naam:</strong> " +
        safeName +
        "</p><p><strong>Email:</strong> " +
        safeEmail +
        "</p><p><strong>Bericht:</strong><br/>" +
        safeMessage +
        "</p>",
    });

    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
