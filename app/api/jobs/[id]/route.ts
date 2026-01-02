import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const id = segments[segments.length - 1];

  try {
    const res = await fetch(`https://api.baanmetcao.nl/jobs/${id}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}
