import { NextResponse } from "next/server";
import Stripe from "stripe";
import { backendFetch } from "@/lib/api/backend";

export const runtime = "nodejs";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Geen stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification mislukt" },
      { status: 400 },
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { clerkUserId, draftId, planId } = paymentIntent.metadata;

    try {
      const res = await backendFetch("/api/employer/payments/confirm", {
        method: "POST",
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          clerkUserId,
          draftId,
          planId,
        }),
      });

      if (!res.ok) {
        console.error(
          "Backend payment confirmation failed:",
          res.status,
          await res.text(),
        );
      }
    } catch (err) {
      console.error("Failed to confirm payment with backend:", err);
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.error("Payment failed:", paymentIntent.id);
  }

  return NextResponse.json({ received: true });
}
