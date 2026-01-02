import { JobsResponse } from "@/app/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted;
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

const DEFAULT_LIMIT = 10;

export type FetchJobsParams = {
  limit?: number;
  offset?: number;
  contract?: string;
  search?: string;
  location?: string;
  workplace?: string;
};

export async function fetchJobs({
  limit = DEFAULT_LIMIT,
  offset = 0,
  search,
  contract,
  location,
  workplace,
}: FetchJobsParams): Promise<JobsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (search) params.set("search", search);
  if (contract && contract !== "all") params.set("contract", contract);
  if (location && location !== "all") params.set("location", location);
  if (workplace && workplace !== "all") params.set("workplace", workplace);

  const url =
    typeof window === "undefined"
      ? `https://api.baanmetcao.nl/jobs?${params.toString()}`
      : `/api/jobs?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}
