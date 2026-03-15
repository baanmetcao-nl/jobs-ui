import type { Contract, Interval, Niche, Workplace } from "./types";

export type JobDetailsFormData = {
  title: string;
  description: string;
  city: string;
  workplace: Workplace;
  contract: Contract;
  seniority: string;
  education: string;
  url: string;
  requirements: string[];
  responsibilities: string[];
  hours: {
    min: number;
    max: number;
  };
  salary: {
    min: number;
    max: number;
    interval: Interval;
  };
  benefits: {
    extraFixedPayment: boolean;
    extraVariablePayment: boolean;
    pensionPlan: boolean;
    travelAllowance: boolean;
    extraTimeOff: boolean;
    stockPlan: boolean;
  };
  tags: string[];
  niche: Niche | null;
  applicationMethod: "email" | "external" | "mollie";
  applicationEmail?: string;
};

export type CompanyFormData = {
  name: string;
  bio: string;
  logoUrl: string;
  website?: string;
  industry?: string;
  size?: string;
  foundedYear?: number;
  location?: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  jobCount: number;
  durationDays: number;
  features: string[];
  popular?: boolean;
  savings?: number;
};

export type AccountFormData = {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  invoiceDetails?: {
    companyName?: string;
    vatNumber?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    country?: string;
  };
  termsAccepted: boolean;
  newsletter: boolean;
};

export type JobPostingFlow = {
  step: number;
  jobDetails: Partial<JobDetailsFormData>;
  company: Partial<CompanyFormData>;
  pricing: PricingPlan | null;
  featured: boolean;
  account: Partial<AccountFormData>;
  draftId?: string;
};

export type JobStatus = "active" | "draft" | "expired" | "paused";

export type DashboardJob = {
  id: string;
  title: string;
  status: JobStatus;
  city: string;
  publishedAt: string;
  expiresAt: string;
  views: number;
  clicks: number;
  applications: number;
  package: string;
  isPromoted: boolean;
  company: {
    name: string;
    logoUrl: string;
  };
};

export type DashboardStats = {
  totalJobs: number;
  activeJobs: number;
  draftJobs: number;
  expiredJobs: number;
  totalViews: number;
  totalClicks: number;
  totalApplications: number;
  viewsThisMonth: number;
  clicksThisMonth: number;
  applicationsThisMonth: number;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  vat: number;
  total: number;
  status: "paid" | "pending" | "overdue";
  jobCount: number;
  description: string;
  pdfUrl?: string;
};

export type EmployerProfile = {
  id: string;
  companyName: string;
  slug: string;
  logoUrl: string;
  coverImage?: string;
  bio: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  foundedYear?: number;
  createdAt: string;
  totalJobsPosted: number;
  activeJobs: number;
};

export type CreateJobResponse = {
  success: boolean;
  jobId?: string;
  draftId?: string;
  paymentUrl?: string;
  errors?: Record<string, string>;
};

export type EmployerDashboardResponse = {
  stats: DashboardStats;
  jobs: DashboardJob[];
  recentInvoices: Invoice[];
};

export type DuplicateJobResponse = {
  success: boolean;
  newJobId?: string;
  draftId?: string;
};

export type ExtendJobResponse = {
  success: boolean;
  newExpiryDate?: string;
  paymentUrl?: string;
};

export const JOB_POSTING_STEPS = [
  {
    id: 1,
    title: "Vacature",
    description: "Functiegegevens",
    slug: "vacature",
  },
  {
    id: 2,
    title: "Bedrijf",
    description: "Bedrijfsinformatie",
    slug: "bedrijf",
  },
  { id: 3, title: "Preview", description: "Bekijk vacature", slug: "preview" },
  { id: 4, title: "Prijzen", description: "Kies pakket", slug: "prijzen" },
  {
    id: 5,
    title: "Betalen",
    description: "Betaling & account",
    slug: "account",
  },
] as const;

export const STEP_SLUGS = {
  vacature: 1,
  bedrijf: 2,
  preview: 3,
  prijzen: 4,
  account: 5,
} as const;

export type StepSlug = keyof typeof STEP_SLUGS;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "single",
    name: "Enkele vacature",
    price: 199,
    jobCount: 1,
    durationDays: 60,
    features: [
      "1 vacature voor 60 dagen",
      "Bedrijfsprofiel pagina",
      "Statistieken dashboard",
      "Verlengen mogelijk",
    ],
  },
  {
    id: "bundle3",
    name: "3 vacatures",
    price: 499,
    jobCount: 3,
    durationDays: 60,
    popular: true,
    savings: 98,
    features: [
      "3 vacatures voor 60 dagen",
      "Bedrijfsprofiel pagina",
      "Statistieken dashboard",
      "Verlengen mogelijk",
      "Voorrang in lijst",
    ],
  },
  {
    id: "bundle10",
    name: "10 vacatures",
    price: 1499,
    jobCount: 10,
    durationDays: 60,
    savings: 491,
    features: [
      "10 vacatures voor 60 dagen",
      "Bedrijfsprofiel pagina",
      "Statistieken dashboard",
      "Verlengen mogelijk",
      "Voorrang in lijst",
    ],
  },
];

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  active: "Actief",
  draft: "Concept",
  expired: "Verlopen",
  paused: "Gepauzeerd",
};

export const EXTEND_PRICE = 49;
export const FEATURED_PRICE = 49;
