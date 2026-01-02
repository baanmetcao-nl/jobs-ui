import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const externalUrl = new URL("https://api.baanmetcao.nl/jobs");

  req.nextUrl.searchParams.forEach((value, key) => {
    externalUrl.searchParams.set(key, value);
  });

  try {
    const res = await fetch(externalUrl.toString());
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
