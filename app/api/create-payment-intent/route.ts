import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const PLAN_PRICES: Record<string, number> = {
  single: 19900,
  bundle3: 49900,
  bundle10: 149900,
};

const PLAN_JOB_COUNTS: Record<string, number> = {
  single: 1,
  bundle3: 3,
  bundle10: 10,
};

const FEATURED_PRICE_CENTS = 4900;

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { planId, featured } = await req.json();

    const baseAmount = PLAN_PRICES[planId];
    if (!baseAmount) {
      return NextResponse.json({ error: "Ongeldig pakket" }, { status: 400 });
    }

    const jobCount = PLAN_JOB_COUNTS[planId] ?? 1;
    const featuredAmount = featured ? FEATURED_PRICE_CENTS * jobCount : 0;
    const subtotal = baseAmount + featuredAmount;
    const totalWithVat = Math.round(subtotal * 1.21);

    const customer = await getStripe().customers.create({
      metadata: { clerkUserId: userId },
    });

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: totalWithVat,
      currency: "eur",
      customer: customer.id,
      metadata: { planId, clerkUserId: userId, featured: String(!!featured) },
      payment_method_types: ["ideal", "card", "bancontact"],
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
