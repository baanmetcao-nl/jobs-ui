import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .slice(0, 200)
    .replace(/[<>"'&]/g, (ch) => {
      const entities: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };
      return entities[ch] ?? ch;
    });
}

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

    const sanitizedEmail = sanitize(email);
    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Ongeldig emailadres" },
        { status: 400 },
      );
    }

    await getStripe().paymentIntents.update(paymentIntentId, {
      metadata: {
        firstName: sanitize(firstName),
        lastName: sanitize(lastName),
        email: sanitizedEmail,
        companyName: sanitize(companyName),
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
