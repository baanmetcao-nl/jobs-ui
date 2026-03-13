"use client";

import { redirect } from "next/navigation";
import { STEP_SLUGS } from "@/app/types-employer";

export default function PlaceJobPage() {
  redirect(`/plaats-vacature/vacature`);
}
