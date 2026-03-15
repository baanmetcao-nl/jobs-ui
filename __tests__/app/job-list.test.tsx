import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobList from "@/app/job-list";
import { JobsResponse } from "@/app/types";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/vacatures",
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("@/components/image-fallback", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("rehype-raw", () => ({ __esModule: true, default: () => {} }));

const makeJobsResponse = (
  overrides: Partial<JobsResponse["data"][number]>[] = []
): JobsResponse => ({
  data: overrides.length
    ? overrides.map((o, i) => ({
        id: String(i + 1),
        title: `Job ${i + 1}`,
        summary: `Summary ${i + 1}`,
        country: "the_netherlands",
        city: "Amsterdam",
        workplace: "hybrid",
        contract: "permanent",
        niches: ["technology-it"],
        salary: { symbol: "€", min: 3000, max: 5000, interval: "monthly", currency: "EUR" },
        tags: [],
        company: { name: `Company ${i + 1}`, logoUrl: "" },
        ...o,
      }))
    : [],
  pagination: { limit: 10, offset: 0, totalCount: overrides.length, hasMore: false },
});

describe("JobList", () => {
  beforeEach(() => jest.clearAllMocks());

  it("shows the empty state when there are no jobs", () => {
    render(<JobList jobsResponse={makeJobsResponse()} page={0} />);
    expect(screen.getByText("Geen vacatures gevonden")).toBeInTheDocument();
  });

  it("renders job titles", () => {
    render(
      <JobList
        jobsResponse={makeJobsResponse([{ title: "Senior React Developer" }])}
        page={0}
      />
    );
    expect(screen.getByText("Senior React Developer")).toBeInTheDocument();
  });

  it("renders company name and city", () => {
    render(
      <JobList
        jobsResponse={makeJobsResponse([
          { company: { name: "Acme Corp", logoUrl: "" }, city: "Rotterdam" },
        ])}
        page={0}
      />
    );
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("Rotterdam")).toBeInTheDocument();
  });

  it("renders salary badge with interval", () => {
    render(
      <JobList
        jobsResponse={makeJobsResponse([
          {
            salary: {
              symbol: "€",
              min: 4000,
              max: 6000,
              interval: "monthly",
              currency: "EUR",
            },
          },
        ])}
        page={0}
      />
    );
    expect(screen.getByText(/4000.*6000.*per maand/)).toBeInTheDocument();
  });

  it("renders contract badge", () => {
    render(
      <JobList
        jobsResponse={makeJobsResponse([{ contract: "freelance" }])}
        page={0}
      />
    );
    expect(screen.getByText("Freelance")).toBeInTheDocument();
  });

  it("renders job tags", () => {
    render(
      <JobList
        jobsResponse={makeJobsResponse([{ tags: ["React", "TypeScript"] }])}
        page={0}
      />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("navigates to the job detail page when 'Bekijk vacature' is clicked", () => {
    render(
      <JobList
        jobsResponse={makeJobsResponse([{ id: "42", title: "Vue Developer" }])}
        page={0}
      />
    );
    fireEvent.click(screen.getByText("Bekijk vacature"));
    expect(mockPush).toHaveBeenCalledWith("/vacature/42/vue-developer");
  });

  it("renders multiple jobs", () => {
    render(
      <JobList
        jobsResponse={makeJobsResponse([{}, {}, {}])}
        page={0}
      />
    );
    expect(screen.getAllByText("Bekijk vacature")).toHaveLength(3);
  });

  it("does not render Pagination when there is only one page", () => {
    const response = makeJobsResponse([{}]);
    // 1 job, limit 10 → totalPages = 1
    render(<JobList jobsResponse={response} page={0} />);
    expect(screen.queryByText(">>")).not.toBeInTheDocument();
  });
});
