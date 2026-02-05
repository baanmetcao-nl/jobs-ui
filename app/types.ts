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
  data: {
      id: string;
      salary: {
          symbol: string
          min: number
          max: number
          interval: string
          currency: string
      }
      tags: string[]
      id: string
      title: string
      summary: string
      country: string
      city: string
      workplace: string
      contract: string
      company: {
          name: string,
          logoUrl: string
      },
  }[];
  pagination: {
    limit: number;
    offset: number;
    totalCount: number;
    hasMore: boolean;
  };
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
