import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { sanitizeString } from "@/lib/sanitize-string";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { paymentIntentId, firstName, lastName, email, companyName } =
      await req.json();

    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return NextResponse.json(
        { error: "paymentIntentId is verplicht" },
        { status: 400 },
      );
    }

    const sanitizedEmail = sanitizeString(email);
    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Ongeldig emailadres" },
        { status: 400 },
      );
    }

    const stripe = getStripe();

    const existing = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (existing.metadata.clerkUserId !== userId) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 403 },
      );
    }

    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        firstName: sanitizeString(firstName),
        lastName: sanitizeString(lastName),
        email: sanitizedEmail,
        companyName: sanitizeString(companyName),
        clerkUserId: userId,
      },
      receipt_email: sanitizedEmail || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update payment intent error:", error);
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
