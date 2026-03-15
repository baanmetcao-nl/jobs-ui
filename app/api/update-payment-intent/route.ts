import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { paymentIntentId, firstName, lastName, email, companyName } =
      await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "paymentIntentId is verplicht" },
        { status: 400 },
      );
    }

    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        firstName,
        lastName,
        email,
        companyName,
      },
      receipt_email: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update payment intent error:", error);
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
