import { NextResponse } from "next/server";
import { ALLOWED_CONTRACTS } from "@/lib/contracts";
import { backendFetch } from "@/lib/api/backend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BASE_URL = "https://baanmetcao.nl";

interface JobData {
  id: string;
  title: string;
  slug?: string;
  summary: string;
  description: string;
  city: string;
  workplace: string;
  contract: string;
  seniority: string;
  education: string;
  publishedAt: string;
  niches: string[];
  hours: { min: number; max: number };
  salary: {
    min: number;
    max: number;
    interval: string;
    currency: string;
    symbol: string;
  };
  benefits: {
    extraFixedPayment: boolean;
    extraVariablePayment: boolean;
    pensionPlan: boolean;
    travelAllowance: boolean;
    extraTimeOff: boolean;
    stockPlan: boolean;
  };
  requirements: string[];
  responsibilities: string[];
  company: {
    name: string;
    bio: string;
    logoUrl: string;
    id: string;
  };
  url: string;
}

interface LLMJobOutput {
  id: string;
  title: string;
  url: string;
  location: {
    city: string;
    country: string;
    workplace_type: "remote" | "hybrid" | "office" | "other";
  };
  contract_type: string;
  seniority_level: string;
  education_required: string;
  hours_per_week: { min: number; max: number };
  salary: {
    min_eur: number;
    max_eur: number;
    interval: string;
  };
  benefits: {
    fixed_bonus: boolean;
    variable_bonus: boolean;
    pension: boolean;
    travel_allowance: boolean;
    extra_vacation: boolean;
    stock_options: boolean;
  };
  company: {
    name: string;
    description: string;
    logo_url: string;
  };
  responsibilities: string[];
  requirements: string[];
  full_description: string;
  published_date: string;
  categories: string[];
}

function mapWorkplace(
  workplace: string,
): LLMJobOutput["location"]["workplace_type"] {
  const mapping: Record<string, LLMJobOutput["location"]["workplace_type"]> = {
    remote: "remote",
    hybrid: "hybrid",
    office: "office",
    other: "other",
    free_choice: "hybrid",
  };
  return mapping[workplace] || "office";
}

function mapContract(contract: string): string {
  const mapping: Record<string, string> = {
    permanent: "Permanent",
    temporary: "Temporary",
  };
  return mapping[contract] || contract;
}

function mapSeniority(seniority: string): string {
  const mapping: Record<string, string> = {
    junior: "Junior (0-2 years)",
    medior: "Mid-Level (2-5 years)",
    senior: "Senior (5+ years)",
    principal: "Principal/Lead",
  };
  return mapping[seniority] || seniority;
}

function mapEducation(education: string): string {
  const mapping: Record<string, string> = {
    none: "No education required",
    primary: "Primary education",
    secondary: "Secondary education",
    vocational_training: "Vocational training",
    higher_professional: "Higher professional education (HBO)",
    university_bachelor: "Bachelor's degree",
    university_master: "Master's degree",
    doctorate: "PhD/Doctorate",
    unknown: "Not specified",
  };
  return mapping[education] || education;
}

function mapInterval(interval: string): string {
  const mapping: Record<string, string> = {
    hourly: "hour",
    monthly: "month",
    daily: "day",
    weekly: "week",
    "4_weekly": "4 weeks",
    yearly: "year",
  };
  return mapping[interval] || interval;
}

function transformJobForLLM(job: JobData): LLMJobOutput {
  return {
    id: job.id,
    title: job.title,
    url: `${BASE_URL}/vacature/${job.id}/${job.slug}`,
    location: {
      city: job.city,
      country: "Netherlands",
      workplace_type: mapWorkplace(job.workplace),
    },
    contract_type: mapContract(job.contract),
    seniority_level: mapSeniority(job.seniority),
    education_required: mapEducation(job.education),
    hours_per_week: {
      min: job.hours.min,
      max: job.hours.max,
    },
    salary: {
      min_eur: job.salary.min,
      max_eur: job.salary.max,
      interval: mapInterval(job.salary.interval),
    },
    benefits: {
      fixed_bonus: job.benefits.extraFixedPayment,
      variable_bonus: job.benefits.extraVariablePayment,
      pension: job.benefits.pensionPlan,
      travel_allowance: job.benefits.travelAllowance,
      extra_vacation: job.benefits.extraTimeOff,
      stock_options: job.benefits.stockPlan,
    },
    company: {
      name: job.company.name,
      description: job.company.bio,
      logo_url: job.company.logoUrl
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${job.company.logoUrl}`
        : "",
    },
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    full_description: job.description,
    published_date: job.publishedAt,
    categories: job.niches,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Math.min(
      parseInt(searchParams.get("limit") || "50", 10),
      200,
    );
    const niche = searchParams.get("niche");
    const location = searchParams.get("location");
    const contract = searchParams.get("contract");

    const params = new URLSearchParams();
    params.set("limit", limit.toString());
    params.set("offset", "0");

    ALLOWED_CONTRACTS.forEach((c) => params.append("contracts", c));

    if (niche) {
      params.append("niches", niche);
    }

    if (location) {
      params.append(
        "locations",
        `the_netherlands__${location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()}`,
      );
    }

    if (contract && contract !== "all") {
      params.set("contracts", contract);
    }

    const response = await backendFetch(`/api/jobs?${params.toString()}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch jobs from backend" },
        { status: 502 },
      );
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: "Invalid response from backend" },
        { status: 502 },
      );
    }

    const llmJobs = data.data.map(transformJobForLLM);

    const responseData = {
      meta: {
        source: "Baan met CAO",
        website: BASE_URL,
        total_results: data.pagination?.totalCount || llmJobs.length,
        retrieved_count: llmJobs.length,
        generated_at: new Date().toISOString(),
        description:
          "Jobs with CAO (Collective Labor Agreement) - ensuring fair working conditions",
      },
      jobs: llmJobs,
    };

    const origin = request.headers.get("origin") ?? "";
    const allowedOrigins = [
      "https://baanmetcao.nl",
      "https://www.baanmetcao.nl",
    ];
    const corsOrigin = allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0];

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": corsOrigin,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
