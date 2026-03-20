import { NextResponse } from "next/server";
import Stripe from "stripe";
import { backendFetch } from "@/lib/api/backend";
import { extractDraftFromMetadata } from "@/app/api/store-draft/route";
import { transformFlowToRegisterPayload } from "@/lib/api/transform";
import type { JobPostingFlow } from "@/app/types-employer";

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
    const { clerkUserId } = paymentIntent.metadata;
    const stripeCustomerId =
      typeof paymentIntent.customer === "string"
        ? paymentIntent.customer
        : paymentIntent.customer?.id ?? "";

    const flowData = extractDraftFromMetadata(
      paymentIntent.metadata as Record<string, string>,
    ) as JobPostingFlow | undefined;

    if (!flowData) {
      console.error(
        "No draft found in metadata for paymentIntent:",
        paymentIntent.id,
        "- job will not be created automatically",
      );
      return NextResponse.json({ received: true });
    }

    if (!clerkUserId || !stripeCustomerId) {
      console.error("Missing clerkUserId or stripeCustomerId in metadata");
      return NextResponse.json({ received: true });
    }

    try {
      const payload = transformFlowToRegisterPayload(
        flowData,
        clerkUserId,
        stripeCustomerId,
      );

      const res = await backendFetch("/api/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          "Backend registration failed:",
          res.status,
          errorText,
        );
      }
    } catch (err) {
      console.error("Failed to register with backend:", err);
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.error("Payment failed:", paymentIntent.id);
  }

  return NextResponse.json({ received: true });
}
