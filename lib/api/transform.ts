import type { JobPostingFlow } from "@/app/types-employer";

export type RegisterPayload = {
  company: {
    name: string;
    bio: string;
    url: string;
    email: string;
    stripeId: string;
    logoFileId?: string;
  };
  user: {
    clerkId: string;
  };
  job: {
    title: string;
    description: string;
    summary: string;
    url: string;
    source: "post";
    status: "draft" | "published";
    tier: "free" | "basic";
    cao: true;
    currency: "eur";
    contract: string;
    hoursMin: number;
    hoursMax: number;
    salaryMin: number;
    salaryMax: number;
    salaryInterval: string;
    workplace: string;
    city: string;
    country: "the_netherlands";
    education: string;
    seniority: string;
    niches: string[];
    benefits: string[];
    keywords: string[];
    responsibilities: string[];
    requirements: string[];
  };
};

export function transformFlowToRegisterPayload(
  flowData: JobPostingFlow,
  clerkId: string,
  stripeId: string,
): RegisterPayload {
  const { jobDetails, company } = flowData;

  const jobUrl =
    jobDetails.url ||
    jobDetails.applicationEmail ||
    `https://placeholder.local/${Date.now()}`;

  const plainText = (jobDetails.description ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const summary = plainText.slice(0, 550);

  return {
    company: {
      name: company.name ?? "",
      bio: company.bio ?? "",
      url: company.url ?? "",
      email: company.email ?? "",
      stripeId,
      ...(company.logoFileId ? { logoFileId: company.logoFileId } : {}),
    },
    user: {
      clerkId,
    },
    job: {
      title: jobDetails.title ?? "",
      description: jobDetails.description ?? "",
      summary,
      url: jobUrl,
      source: "post",
      status: "draft",
      tier: flowData.pricing?.id === "single" ? "free" : "basic",
      cao: true,
      currency: "eur",
      contract: jobDetails.contract ?? "permanent",
      hoursMin: jobDetails.hours?.min ?? 0,
      hoursMax: jobDetails.hours?.max ?? 0,
      salaryMin: jobDetails.salary?.min ?? 0,
      salaryMax: jobDetails.salary?.max ?? 0,
      salaryInterval: jobDetails.salary?.interval ?? "monthly",
      workplace: jobDetails.workplace ?? "office",
      city: jobDetails.city ?? "",
      country: "the_netherlands",
      education: jobDetails.education ?? "unknown",
      seniority: jobDetails.seniority ?? "unknown",
      niches: jobDetails.niches ?? [],
      benefits: jobDetails.benefits ?? [],
      keywords: jobDetails.keywords ?? [],
      responsibilities: jobDetails.responsibilities ?? [],
      requirements: jobDetails.requirements ?? [],
    },
  };
}
