import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const CHUNK_SIZE = 490;

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
    const { paymentIntentId, flowData, firstName, lastName, email, companyName } =
      await req.json();

    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return NextResponse.json(
        { error: "paymentIntentId is verplicht" },
        { status: 400 },
      );
    }

    if (!flowData) {
      return NextResponse.json(
        { error: "flowData is verplicht" },
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

    const json = JSON.stringify(flowData);
    const totalChunks = Math.ceil(json.length / CHUNK_SIZE);
    const metadata: Record<string, string> = {
      draft_chunks: String(totalChunks),
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      email: sanitizedEmail,
      companyName: sanitize(companyName),
      clerkUserId: userId,
    };

    for (let i = 0; i < totalChunks; i++) {
      metadata[`draft_${i}`] = json.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    }

    const stripe = getStripe();
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata,
      receipt_email: sanitizedEmail || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Prepare payment error:", error);
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
