import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    event = stripe.webhooks.constructEvent(
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
    const { firstName, lastName, email, companyName, planId } =
      paymentIntent.metadata;

    console.log("Payment succeeded:", {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      email,
      firstName,
      lastName,
      companyName,
      planId,
    });

    // TODO: Create user account in your database
    // TODO: Send activation email via Resend
    // TODO: Publish the job posting
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.error("Payment failed:", paymentIntent.id);
  }

  return NextResponse.json({ received: true });
}
