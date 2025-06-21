export type Job = {
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
