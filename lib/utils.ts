import { Interval, Job } from "@/app/types";
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

export function formatNumber(num:number) {
  return new Intl.NumberFormat("nl-NL").format(num);
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
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
    permanent: "Vast contract",
    temporary: "Tijdelijk contract",
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

export function sanitizeInput(input: string): string {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function ensureHttps(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
