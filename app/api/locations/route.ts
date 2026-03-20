import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

const MAX_QUERY_LENGTH = 200;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const safeParams = new URLSearchParams();

  for (const [key, value] of searchParams.entries()) {
    if (!/^[a-zA-Z_]+$/.test(key)) continue;
    if (value.length > MAX_QUERY_LENGTH) continue;
    safeParams.set(key, value);
  }

  const query = safeParams.toString();
  const path = query ? `/api/jobs/locations?${query}` : "/api/jobs/locations";
  const res = await backendFetch(path);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: res.status },
    );
  }

  return NextResponse.json(await res.json());
}
