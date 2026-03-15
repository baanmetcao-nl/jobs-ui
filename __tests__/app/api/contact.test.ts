/**
 * Tests for app/api/contact/route.ts
 */

// ─── Mock next/server before the route is imported ───────────────────────────
jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number; headers?: Record<string, string> }) => ({
      status: init?.status ?? 200,
      headers: {
        get: (key: string) =>
          (init?.headers as Record<string, string> | undefined)?.[key] ?? null,
      },
      json: () => Promise.resolve(body),
    }),
  },
}));

// ─── Mock Resend ──────────────────────────────────────────────────────────────
// Use an arrow wrapper so mockSend is evaluated at call-time, not factory-creation-time (avoids TDZ)
const mockSend = jest.fn().mockResolvedValue({ id: "email-id" });
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: (...args: unknown[]) => mockSend(...args) },
  })),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

import { POST } from "@/app/api/contact/route";

function makeRequest(body: Record<string, unknown>, ip = "1.2.3.4") {
  return {
    json: () => Promise.resolve(body),
    headers: {
      get: (key: string) => {
        if (key === "x-forwarded-for") return ip;
        return null;
      },
    },
  };
}

function callPost(body: Record<string, unknown>, ip = "1.2.3.4") {
  return POST(makeRequest(body, ip) as unknown as Request);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("POST /api/contact", () => {
  beforeEach(() => {
    mockSend.mockClear();
  });

  const validBody = {
    name: "Jan Jansen",
    email: "jan@example.com",
    message: "Hallo!",
  };

  it("returns 200 and sends an email for valid input", async () => {
    const res = await callPost(validBody, "10.0.0.1");
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("returns 400 when name is missing", async () => {
    const res = await callPost({ ...validBody, name: "" }, "10.0.0.2");
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/Naam/);
  });

  it("returns 400 when email is missing", async () => {
    const res = await callPost({ ...validBody, email: "" }, "10.0.0.3");
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/E-mailadres/);
  });

  it("returns 400 for an invalid email format", async () => {
    const res = await callPost(
      { ...validBody, email: "not-an-email" },
      "10.0.0.4"
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/geldig e-mailadres/);
  });

  it("returns 400 when message is missing", async () => {
    const res = await callPost({ ...validBody, message: "" }, "10.0.0.5");
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/Bericht/);
  });

  it("returns 400 when name contains dangerous content", async () => {
    const res = await callPost(
      { ...validBody, name: '<script>alert("xss")</script>' },
      "10.0.0.6"
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/ongeoorloofde content/);
  });

  it("returns 400 when message contains a javascript: URI", async () => {
    const res = await callPost(
      { ...validBody, message: "Click javascript:void(0)" },
      "10.0.0.7"
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/ongeoorloofde content/);
  });

  it("silently succeeds (honeypot) when company field is filled", async () => {
    const res = await callPost(
      { ...validBody, company: "spambot" },
      "10.0.0.8"
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 when subject exceeds the max length", async () => {
    const res = await callPost(
      { ...validBody, subject: "x".repeat(201) },
      "10.0.0.9"
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/200 karakters/);
  });

  it("accepts an optional subject and includes it in the sent email", async () => {
    const res = await callPost(
      { ...validBody, subject: "Vraag over samenwerking" },
      "10.0.0.10"
    );
    expect(res.status).toBe(200);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ subject: "Vraag over samenwerking" })
    );
  });

  it("uses a default subject when none is provided", async () => {
    const res = await callPost(validBody, "10.0.0.11");
    expect(res.status).toBe(200);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "Nieuw bericht via contactformulier",
      })
    );
  });

  it("returns 429 after exceeding the rate limit", async () => {
    const ip = "10.9.9.9";
    // First 3 requests are allowed
    await callPost(validBody, ip);
    await callPost(validBody, ip);
    await callPost(validBody, ip);
    // 4th request should be rate-limited
    const res = await callPost(validBody, ip);
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toMatch(/Te veel aanvragen/);
  });

  it("sets X-RateLimit headers on successful responses", async () => {
    const res = await callPost(validBody, "10.1.1.1");
    expect(res.headers.get("X-RateLimit-Limit")).toBe("3");
    expect(res.headers.get("X-RateLimit-Remaining")).toBeDefined();
  });
});
