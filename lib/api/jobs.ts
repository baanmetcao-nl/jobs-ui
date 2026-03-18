import { JobsResponse } from "@/app/types";
import { backendFetch } from "./backend";
import { ALLOWED_CONTRACTS } from "../contracts";

function formatLocationForAPI(location: string): string {
  if (location.includes("__")) return location;

  const formatted = location
    .split(/[-\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return `the_netherlands__${formatted}`;
}

const DEFAULT_LIMIT = 10;

type FetchJobsParams = {
  limit?: number;
  offset?: number;
  contracts?: string;
  seniorities?: string[];
  search?: string;
  locations?: string[];
  workplace?: string;
  niches?: string[];
};

export async function fetchTotalJobCount(): Promise<number> {
  const res = await backendFetch("/api/jobs/count", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return 0;
  }

  const data = await res.json();
  return data.count || 0;
}

export async function fetchJobCount({
  niches,
  contracts,
  seniorities,
  locations,
  workplace,
}: FetchJobsParams): Promise<{ count: number }> {
  const params = new URLSearchParams();

  if (contracts && contracts !== "all") {
    params.set("contracts", contracts);
  } else {
    ALLOWED_CONTRACTS.forEach((c) => params.append("contracts", c));
  }

  if (workplace && workplace !== "all") {
    params.set("workplace", workplace);
  }

  seniorities?.forEach((s) => params.append("seniorities", s));
  locations?.forEach((l) =>
    params.append("locations", formatLocationForAPI(l)),
  );
  niches?.forEach((n) => params.append("niches", n));

  const res = await backendFetch(`/api/jobs/count?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    throw new Error(`API request failed (${res.status})`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error("API returned non-JSON response");
  }

  return res.json();
}

export async function fetchJobs({
  limit = DEFAULT_LIMIT,
  offset = 0,
  search,
  contracts,
  seniorities,
  locations,
  workplace,
  niches,
}: FetchJobsParams): Promise<JobsResponse> {
  const params = new URLSearchParams();

  params.set("limit", limit.toString());
  params.set("offset", offset.toString());

  if (search) params.set("search", search);

  if (contracts && contracts !== "all") {
    params.set("contracts", contracts);
  } else {
    ALLOWED_CONTRACTS.forEach((c) => params.append("contracts", c));
  }

  if (workplace && workplace !== "all") {
    params.set("workplace", workplace);
  }

  seniorities?.forEach((s) => params.append("seniorities", s));
  locations?.forEach((l) =>
    params.append("locations", formatLocationForAPI(l)),
  );
  niches?.forEach((n) => params.append("niches", n));

  const res = await backendFetch(`/api/jobs?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    throw new Error(`API request failed (${res.status})`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error("API returned non-JSON response");
  }

  const data = await res.json();

  return data;
}
