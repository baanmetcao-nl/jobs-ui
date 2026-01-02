export type Job = {
  createdAt: string;
  description: string;
  id: number;
  location: string;
  position: string;
  requirements: string[];
  responsibilities: string[];
  tags: string[];
  url: string;
  workplace: "remote" | "hybrid" | "office" | "other";
  contract: "internship" | "permanent" | "temporary" | "freelance";
  seniority: string;
  education: string;
  field: string;
  metadata: {
    collected: boolean;
  };
  salaryRange: {
    min: number;
    max: number;
    currency: "EUR";
    interval: "month";
  };
  company: {
    name: string;
    logoUrl: string;
  };
  collectiveLaborAgreement: {
    extraMoney: boolean;
    pension: boolean;
    travelAllowance: boolean;
    stocks: boolean;
    bonus: boolean;
  };
};

export type JobsResponse = {
  data: Job[];
  pagination: {
    limit: number;
    offset: number;
    totalCount: number;
    isFinished: boolean;
  };
};

export type PaginationProps = {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
};

export type RelatedJobsProps = {
  id: number;
  position: string;
  company: {
    logoUrl: string;
    name: string;
  };
  field: string;
  workplace: string;
  location: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
    interval: string;
  };
};
