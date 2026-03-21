import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const CHUNK_SIZE = 490;

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export function extractDraftFromMetadata(
  metadata: Record<string, string>,
): object | undefined {
  const totalChunks = parseInt(metadata.draft_chunks ?? "0", 10);
  if (!totalChunks) return undefined;

  let json = "";
  for (let i = 0; i < totalChunks; i++) {
    const chunk = metadata[`draft_${i}`];
    if (chunk === undefined) return undefined;
    json += chunk;
  }

  try {
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const { paymentIntentId, flowData } = await req.json();

    if (!paymentIntentId || !flowData) {
      return NextResponse.json(
        { error: "paymentIntentId en flowData zijn verplicht" },
        { status: 400 },
      );
    }

    const json = JSON.stringify(flowData);
    const totalChunks = Math.ceil(json.length / CHUNK_SIZE);
    const metadata: Record<string, string> = {
      draft_chunks: String(totalChunks),
    };

    for (let i = 0; i < totalChunks; i++) {
      metadata[`draft_${i}`] = json.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    }

    const stripe = getStripe();
    await stripe.paymentIntents.update(paymentIntentId, { metadata });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Store draft error:", error);
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
