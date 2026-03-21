import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Geen bestand gevonden" },
        { status: 400 },
      );
    }

    const ALLOWED_TYPES = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];
    const MAX_SIZE = 5 * 1024 * 1024;

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Ongeldig bestandstype. Gebruik JPG, PNG, WebP of SVG." },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Bestand te groot (max 5MB)" },
        { status: 400 },
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL niet geconfigureerd" },
        { status: 500 },
      );
    }

    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const headers: Record<string, string> = {};

    try {
      const { auth } = await import("@clerk/nextjs/server");
      const { getToken } = await auth();
      const token = await getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      const envToken = process.env.BEARER_TOKEN;
      if (envToken) {
        headers.Authorization = `Bearer ${envToken}`;
      }
    }

    const res = await fetch(`${backendUrl}/api/files`, {
      method: "POST",
      headers,
      body: backendFormData,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend file upload failed:", res.status, text);
      return NextResponse.json(
        { error: "Upload naar backend mislukt" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({ id: data.id, url: data.url });
  } catch (error) {
    console.error("Upload logo error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het uploaden" },
      { status: 500 },
    );
  }
}
