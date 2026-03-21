import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { sanitizeString } from "@/lib/sanitize-string";

export const runtime = "nodejs";

const CHUNK_SIZE = 490;
const MAX_DRAFT_CHUNKS = 48;

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const {
      paymentIntentId,
      flowData,
      firstName,
      lastName,
      email,
      companyName,
    } = await req.json();

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

    const json = JSON.stringify(flowData);
    const totalChunks = Math.ceil(json.length / CHUNK_SIZE);

    if (totalChunks > MAX_DRAFT_CHUNKS) {
      return NextResponse.json(
        { error: "Data te groot om op te slaan" },
        { status: 400 },
      );
    }

    const metadata: Record<string, string> = {
      draft_chunks: String(totalChunks),
      firstName: sanitizeString(firstName),
      lastName: sanitizeString(lastName),
      email: sanitizedEmail,
      companyName: sanitizeString(companyName),
      clerkUserId: userId,
    };

    for (let i = 0; i < totalChunks; i++) {
      metadata[`draft_${i}`] = json.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    }

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
