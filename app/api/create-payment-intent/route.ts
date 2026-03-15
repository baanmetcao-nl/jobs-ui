import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_PRICES: Record<string, number> = {
  single: 29900,
  bundle3: 79900,
  bundle10: 199900,
};

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    const baseAmount = PLAN_PRICES[planId];
    if (!baseAmount) {
      return NextResponse.json({ error: "Ongeldig pakket" }, { status: 400 });
    }

    const totalWithVat = Math.round(baseAmount * 1.21);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalWithVat,
      currency: "eur",
      metadata: { planId },
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
