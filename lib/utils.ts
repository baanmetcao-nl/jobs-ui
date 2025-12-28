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

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export async function fetchJobs(
  limit: number = DEFAULT_LIMIT,
  offset: number = DEFAULT_OFFSET
) {
  const res = await fetch(
    `https://api.baanmetcao.nl/jobs?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Er kunnen momenteel geen vacatures geladen worden.");
  }

  return res.json();
}
