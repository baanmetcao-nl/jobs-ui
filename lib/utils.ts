import { Interval, Job, JobsResponse } from "@/app/types";
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
  niches?: string;
};

export async function fetchJobs({
  limit = DEFAULT_LIMIT,
  offset = 0,
  search,
  contract,
  location,
  workplace,
  niches,
}: FetchJobsParams): Promise<JobsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (search) params.set("search", search);
  if (contract && contract !== "all") params.set("contract", contract);
  if (location && location !== "all") params.set("location", location);
  if (workplace && workplace !== "all") params.set("workplace", workplace);
  if (niches && niches !== "all") params.set("niches", niches);

  const url =
    typeof window === "undefined"
      ? `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`
      : `/api/jobs?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export function intervalFormat(interval: Interval) {
  const labels: Record<Interval, string> = {
    hourly: "per uur",
    monthly: "per maand",
    daily: "per dag",
    weekly: "per week",
    "4_weekly": "per 4 weken",
    yearly: "per jaar",
  };
  return labels[interval];
}

export function contractFormat(contract: Job["contract"]) {
  const labels: Record<Job["contract"], string> = {
    freelance: "Freelance",
    permanent: "Vast contract",
    temporary: "Tijdelijk contract",
    flex: "Flexibel contract",
  };
  return labels[contract];
}

export function educationFormat(education: Job["education"]) {
  const labels: Record<Job["education"], string> = {
    none: "Geen",
    primary: "Basisonderwijs",
    secondary: "Voortgezet onderwijs",
    vocational_training: "Beroepsopleiding",
    higher_professional: "Hoger beroepsonderwijs",
    university_bachelor: "Universitair bachelor",
    university_master: "Universitair master",
    doctorate: "Doctoraat",
    unknown: "Niet bekend",
  };
  return labels[education];
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
