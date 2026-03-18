import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobDetails from "@/app/vacature/[id]/[slug]/job-details";
import { Job, MinimalJob } from "@/app/types";

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockPathname = "/vacature/1/test-job";
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
  // notFound throws in Next.js — mimic that so the component guard stops execution
  notFound: jest.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}));

jest.mock("isomorphic-dompurify", () => ({
  sanitize: (html: string) => html,
}));

jest.mock("@/app/apply-modal", () => ({
  __esModule: true,
  default: ({
    onClose,
    onAccept,
  }: {
    onClose: () => void;
    onAccept: () => void;
  }) => (
    <div data-testid="apply-modal">
      <button onClick={onClose}>Close</button>
      <button onClick={onAccept}>Accept</button>
    </div>
  ),
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

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const mockJob: Job = {
  id: "1",
  title: "Senior Frontend Developer",
  description: "A great job opportunity.",
  country: "the_netherlands",
  city: "amsterdam",
  workplace: "hybrid",
  contract: "permanent",
  seniority: "senior",
  education: "university_bachelor",
  url: "https://example.com/apply",
  requirements: ["React experience", "TypeScript knowledge"],
  responsibilities: ["Build UI components", "Write tests"],
  publishedAt: "2024-03-15",
  niches: ["technology-it"],
  hours: { min: 32, max: 40 },
  benefits: {
    extraFixedPayment: true,
    extraVariablePayment: false,
    pensionPlan: true,
    travelAllowance: true,
    extraTimeOff: false,
    stockPlan: false,
  },
  company: {
    name: "Acme Corp",
    bio: "We build great things.",
    logoUrl: "/logos/acme.png",
    id: "company-1",
  },
  salary: {
    min: 4000,
    max: 6000,
    interval: "monthly",
    currency: "EUR",
    symbol: "€",
  },
  tags: ["React", "TypeScript", "Next.js"],
};

const mockRelatedJob: MinimalJob = {
  id: "2",
  title: "Frontend Developer",
  summary: "Another job",
  country: "the_netherlands",
  city: "Rotterdam",
  workplace: "remote",
  contract: "permanent",
  niches: ["technology-it"],
  salary: { symbol: "€", min: 3000, max: 5000, interval: "monthly", currency: "EUR" },
  tags: ["Vue"],
  company: { name: "Beta Inc", logoUrl: "/logos/beta.png" },
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("JobDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset search params to a clean state before each test
    mockSearchParams.delete("exitModal");
  });

  it("renders the job title", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(
      screen.getAllByText("Senior Frontend Developer").length
    ).toBeGreaterThan(0);
  });

  it("renders the company name", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getAllByText("Acme Corp").length).toBeGreaterThan(0);
  });

  it("renders all job tags as badges", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("renders job insight fields", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getByText("Werkplek")).toBeInTheDocument();
    expect(screen.getByText("Hybride")).toBeInTheDocument();
    expect(screen.getByText("Ervaringsniveau")).toBeInTheDocument();
    expect(screen.getByText("Senior")).toBeInTheDocument();
    expect(screen.getByText("Contract")).toBeInTheDocument();
    expect(screen.getByText("Vast contract")).toBeInTheDocument();
    expect(screen.getByText("Locatie")).toBeInTheDocument();
    expect(screen.getByText("Amsterdam")).toBeInTheDocument();
  });

  it("renders hour range when min and max differ", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getByText("32 - 40 uur")).toBeInTheDocument();
  });

  it("renders single hour value when min equals max", () => {
    const fixedHoursJob = { ...mockJob, hours: { min: 40, max: 40 } };
    render(
      <JobDetails
        job={fixedHoursJob}
        relatedJobs={[]}
        relatedCompanyJobs={[]}
      />
    );
    expect(screen.getByText("40 uur")).toBeInTheDocument();
  });

  it("renders salary information", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getByText("Salaris")).toBeInTheDocument();
    expect(screen.getByText("€ 4000 - 6000 per maand")).toBeInTheDocument();
  });

  it("renders benefits section correctly", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    // extraFixedPayment = true
    const extraFixed = screen.getByText("Pensioen:").closest("li");
    expect(extraFixed).toHaveTextContent("Ja");
    // extraVariablePayment = false
    const variableEl = screen
      .getByText(/Prestatiegebonden beloning/)
      .closest("li");
    expect(variableEl).toHaveTextContent("Nee");
  });

  it("renders responsibilities and requirements", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(
      screen.getByText("Belangrijkste verantwoordelijkheden")
    ).toBeInTheDocument();
    expect(screen.getByText("Vereisten")).toBeInTheDocument();
    expect(screen.getByText("Build UI components")).toBeInTheDocument();
    expect(screen.getByText("React experience")).toBeInTheDocument();
  });

  it("renders related jobs", () => {
    render(
      <JobDetails
        job={mockJob}
        relatedJobs={[mockRelatedJob]}
        relatedCompanyJobs={[]}
      />
    );
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Beta Inc")).toBeInTheDocument();
  });

  it("apply buttons navigate to modal URL", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    const applyButtons = screen.getAllByText(/Solliciteer/);
    fireEvent.click(applyButtons[0]);
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("exitModal=true")
    );
  });

  it("does not render ApplyModal when exitModal param is absent", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.queryByTestId("apply-modal")).not.toBeInTheDocument();
  });

  it("renders ApplyModal when exitModal param is present", () => {
    mockSearchParams.set("exitModal", "true");
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getByTestId("apply-modal")).toBeInTheDocument();
  });

  it("closes the modal when onClose is called", () => {
    mockSearchParams.set("exitModal", "true");
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    fireEvent.click(screen.getByText("Close"));
    expect(mockPush).toHaveBeenCalledWith(
      expect.not.stringContaining("exitModal")
    );
  });

  it("opens the job URL in a new tab when onAccept is called", () => {
    mockSearchParams.set("exitModal", "true");
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    fireEvent.click(screen.getByText("Accept"));
    expect(openSpy).toHaveBeenCalledWith("https://example.com/apply", "_blank");
    openSpy.mockRestore();
  });

  it("main apply block button navigates to modal URL", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    const applyButtons = screen.getAllByText("Solliciteer nu");
    fireEvent.click(applyButtons[0]);
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("exitModal=true")
    );
  });

  it("calls notFound when job is null", () => {
    expect(() =>
      render(
        // @ts-expect-error intentionally passing null to test guard
        <JobDetails job={null} relatedJobs={[]} relatedCompanyJobs={[]} />
      )
    ).toThrow("NEXT_NOT_FOUND");
  });
});

describe("Sidebar", () => {
  it("renders the company name in the sidebar", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getAllByText("Acme Corp").length).toBeGreaterThan(0);
  });

  it("shows company bio on the Overview tab by default", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    expect(screen.getByText("We build great things.")).toBeInTheDocument();
  });

  it("shows related company jobs after clicking the Vacatures tab", () => {
    render(
      <JobDetails
        job={mockJob}
        relatedJobs={[]}
        relatedCompanyJobs={[mockRelatedJob]}
      />
    );
    fireEvent.click(screen.getByText("Vacatures"));
    expect(screen.getAllByText("Frontend Developer").length).toBeGreaterThan(0);
  });

  it("shows the count of related company jobs on the tab", () => {
    render(
      <JobDetails
        job={mockJob}
        relatedJobs={[]}
        relatedCompanyJobs={[mockRelatedJob]}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("switches back to overview tab", () => {
    render(
      <JobDetails
        job={mockJob}
        relatedJobs={[]}
        relatedCompanyJobs={[mockRelatedJob]}
      />
    );
    fireEvent.click(screen.getByText("Vacatures"));
    fireEvent.click(screen.getByText("Overzicht"));
    expect(screen.getByText("We build great things.")).toBeInTheDocument();
  });

  it("sidebar apply button navigates to modal URL", () => {
    render(
      <JobDetails job={mockJob} relatedJobs={[]} relatedCompanyJobs={[]} />
    );
    // "Solliciteer nu" buttons: first is in main apply block, second is in sidebar
    const buttons = screen.getAllByText("Solliciteer nu");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("exitModal=true")
    );
  });
});
