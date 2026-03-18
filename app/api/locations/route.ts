import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/api/backend";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.toString();
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
