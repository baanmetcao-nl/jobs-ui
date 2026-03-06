type Seniority = "trainee" | "junior" | "medior" | "senior" | "principal";

type Workplace = "remote" | "hybrid" | "office" | "other" | "free_choice";

export type Contract = "freelance" | "temporary" | "permanent" | "flex";

type Education =
  | "none"
  | "primary"
  | "secondary"
  | "vocational_training"
  | "higher_professional"
  | "university_bachelor"
  | "university_master"
  | "doctorate"
  | "unknown";

type Country = "the_netherlands" | "unknown";

export type Interval =
  | "hourly"
  | "monthly"
  | "daily"
  | "weekly"
  | "4_weekly"
  | "yearly";

export type Niche =
  | "communications"
  | "creative-design"
  | "education-training"
  | "engineering"
  | "electrical-installation"
  | "finance-accounting"
  | "healthcare-medical"
  | "human-resources"
  | "legal"
  | "logistics-supply-chain"
  | "marketing-advertising"
  | "public-sector-non-profit"
  | "real-estate"
  | "sales-retail"
  | "science-research"
  | "technology-it"
  | "skilled-trades"
  | "other"
  | "unknown";

export type Job = {
  id: string;
  title: string;
  description: string;
  country: Country;
  city: string;
  workplace: Workplace;
  contract: Contract;
  seniority: Seniority;
  education: Education;
  url: string;
  requirements: string[];
  responsibilities: string[];
  publishedAt: string;
  niches: Niche[];
  hours: {
    min: number;
    max: number;
  };
  benefits: {
    extraFixedPayment: boolean;
    extraVariablePayment: boolean;
    pensionPlan: boolean;
    travelAllowance: boolean;
    extraTimeOff: boolean;
    stockPlan: boolean;
  };
  company: {
    name: string;
    bio: string;
    logoUrl: string;
    id: string;
  };
  salary: {
    min: number;
    max: number;
    interval: Interval;
    currency: string;
    symbol: "€";
  };
  tags: string[];
};

export type MinimalJob = {
  id: string;
  salary: {
    symbol: string;
    min: number;
    max: number;
    interval: Interval;
    currency: string;
  };
  tags: string[];
  title: string;
  summary: string;
  country: string;
  city: string;
  niches: Niche[];
  workplace: Workplace;
  contract: Contract;
  company: {
    name: string;
    logoUrl: string;
  };
};

export type JobsResponse = {
  data: MinimalJob[];
  pagination: {
    limit: number;
    offset: number;
    totalCount: number;
    hasMore: boolean;
  };
};

export type BoardConfig = {
  key: string;
  primaryNiches: Niche[];
  displayName: string;
  shortName: string;
  domain: string;
  locale: "nl-NL";
  seo: {
    title: string;
    description: string;
  };
};
