"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PlaceJobPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const plan = searchParams.get("plan");
    const url = plan
      ? `/plaats-vacature/vacature?plan=${plan}`
      : "/plaats-vacature/vacature";
    router.replace(url);
  }, [router, searchParams]);

  return null;
}
