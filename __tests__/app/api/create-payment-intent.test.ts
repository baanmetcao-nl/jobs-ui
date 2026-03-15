/**
 * Tests for app/api/create-payment-intent/route.ts
 */

// ─── Mock next/server ─────────────────────────────────────────────────────────
jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: () => Promise.resolve(body),
    }),
  },
}));

// Use an arrow wrapper so mockCreate is evaluated at call-time, not factory-creation-time (avoids TDZ)
const mockCreate = jest.fn();

jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: { create: (...args: unknown[]) => mockCreate(...args) },
  }));
});

import { POST } from "@/app/api/create-payment-intent/route";

function makeRequest(body: Record<string, unknown>): Request {
  return { json: () => Promise.resolve(body) } as unknown as Request;
}

function callPost(body: Record<string, unknown>) {
  return POST(makeRequest(body));
}

describe("POST /api/create-payment-intent", () => {
  beforeEach(() => {
    mockCreate.mockClear();
  });

  it("returns 400 for an invalid planId", async () => {
    const res = await callPost({ planId: "unknown" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Ongeldig pakket");
  });

  it.each([
    ["single", 29900, Math.round(29900 * 1.21)],
    ["bundle3", 79900, Math.round(79900 * 1.21)],
    ["bundle10", 199900, Math.round(199900 * 1.21)],
  ])(
    "creates a payment intent for plan '%s' with the correct VAT-inclusive amount",
    async (planId, _base, totalWithVat) => {
      mockCreate.mockResolvedValue({
        client_secret: "secret_" + planId,
        id: "pi_" + planId,
      });

      const res = await callPost({ planId });
      expect(res.status).toBe(200);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({ amount: totalWithVat, currency: "eur" })
      );
    }
  );

  it("returns clientSecret and paymentIntentId on success", async () => {
    mockCreate.mockResolvedValue({
      client_secret: "cs_test_abc",
      id: "pi_test_abc",
    });
    const res = await callPost({ planId: "single" });
    const json = await res.json();
    expect(json.clientSecret).toBe("cs_test_abc");
    expect(json.paymentIntentId).toBe("pi_test_abc");
  });

  it("stores the planId in payment intent metadata", async () => {
    mockCreate.mockResolvedValue({ client_secret: "x", id: "y" });
    await callPost({ planId: "bundle3" });
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ metadata: { planId: "bundle3" } })
    );
  });

  it("includes ideal, card and bancontact as payment methods", async () => {
    mockCreate.mockResolvedValue({ client_secret: "x", id: "y" });
    await callPost({ planId: "single" });
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        payment_method_types: expect.arrayContaining([
          "ideal",
          "card",
          "bancontact",
        ]),
      })
    );
  });

  it("returns 500 when Stripe throws an error", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockCreate.mockRejectedValue(new Error("Stripe error"));
    const res = await callPost({ planId: "single" });
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Er ging iets mis");
    jest.restoreAllMocks();
  });
});
