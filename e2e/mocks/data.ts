import type { Job, MinimalJob, JobsResponse } from "../../app/types";

export const MOCK_COMPANY = {
  id: "company-1",
  name: "TechBedrijf B.V.",
  bio: "Een toonaangevend technologiebedrijf in Nederland met een sterke CAO en uitstekende arbeidsvoorwaarden.",
  logoUrl: "",
};

export const MOCK_JOBS: MinimalJob[] = [
  {
    id: "job-1",
    slug: "senior-software-developer",
    title: "Senior Software Developer",
    summary:
      "Wij zoeken een ervaren software developer voor ons team in Amsterdam.",
    country: "the_netherlands",
    city: "Amsterdam",
    niches: ["technology-it"],
    workplace: "hybrid",
    contract: "permanent",
    salary: {
      symbol: "€",
      min: 4500,
      max: 6500,
      interval: "monthly",
      currency: "EUR",
    },
    tags: ["React", "TypeScript", "Node.js"],
    company: { name: MOCK_COMPANY.name, logoUrl: MOCK_COMPANY.logoUrl },
    isFeatured: true,
  },
  {
    id: "job-2",
    slug: "project-manager",
    title: "Project Manager",
    summary: "Leid complexe IT-projecten bij een van de beste werkgevers.",
    country: "the_netherlands",
    city: "Utrecht",
    niches: ["technology-it"],
    workplace: "office",
    contract: "permanent",
    salary: {
      symbol: "€",
      min: 4000,
      max: 5500,
      interval: "monthly",
      currency: "EUR",
    },
    tags: ["Agile", "Scrum", "PRINCE2"],
    company: { name: "ConsultCorp", logoUrl: "" },
  },
  {
    id: "job-3",
    slug: "ux-designer",
    title: "UX Designer",
    summary: "Ontwerp gebruiksvriendelijke interfaces voor onze klanten.",
    country: "the_netherlands",
    city: "Rotterdam",
    niches: ["creative-design"],
    workplace: "hybrid",
    contract: "temporary",
    salary: {
      symbol: "€",
      min: 3500,
      max: 5000,
      interval: "monthly",
      currency: "EUR",
    },
    tags: ["Figma", "User Research", "Prototyping"],
    company: { name: "DesignStudio", logoUrl: "" },
  },
  {
    id: "job-4",
    slug: "marketing-manager",
    title: "Marketing Manager",
    summary: "Verantwoordelijk voor de gehele marketingstrategie.",
    country: "the_netherlands",
    city: "Den Haag",
    niches: ["marketing-advertising"],
    workplace: "office",
    contract: "permanent",
    salary: {
      symbol: "€",
      min: 3800,
      max: 5200,
      interval: "monthly",
      currency: "EUR",
    },
    tags: ["SEO", "Content Marketing", "Google Ads"],
    company: { name: "MarketingHuis", logoUrl: "" },
  },
  {
    id: "job-5",
    slug: "verpleegkundige",
    title: "Verpleegkundige",
    summary: "Werk in de zorg met uitstekende CAO-voorwaarden.",
    country: "the_netherlands",
    city: "Eindhoven",
    niches: ["healthcare-medical"],
    workplace: "office",
    contract: "permanent",
    salary: {
      symbol: "€",
      min: 2800,
      max: 4000,
      interval: "monthly",
      currency: "EUR",
    },
    tags: ["Zorg", "BIG-registratie"],
    company: { name: "ZorgInstelling", logoUrl: "" },
  },
];

export const MOCK_FULL_JOB: Job = {
  id: "job-1",
  slug: "senior-software-developer",
  title: "Senior Software Developer",
  description:
    "<p>Wij zijn op zoek naar een ervaren Senior Software Developer om ons team in Amsterdam te versterken. Je werkt aan innovatieve projecten met de nieuwste technologieën.</p><h3>Wat ga je doen?</h3><p>Als Senior Developer ben je verantwoordelijk voor het ontwerpen en implementeren van schaalbare webapplicaties.</p>",
  country: "the_netherlands",
  city: "Amsterdam",
  workplace: "hybrid",
  contract: "permanent",
  seniority: "senior",
  education: "university_bachelor",
  url: "https://example.com/apply",
  requirements: [
    "5+ jaar ervaring met React en TypeScript",
    "Ervaring met Node.js en REST API's",
    "Goede communicatieve vaardigheden in het Nederlands",
  ],
  responsibilities: [
    "Ontwerpen van software architectuur",
    "Code reviews uitvoeren",
    "Junior developers begeleiden",
  ],
  publishedAt: "2026-03-01T10:00:00Z",
  niches: ["technology-it"],
  hours: { min: 32, max: 40 },
  benefits: {
    extraFixedPayment: true,
    extraVariablePayment: false,
    pensionPlan: true,
    travelAllowance: true,
    extraTimeOff: true,
    stockPlan: false,
  },
  company: {
    ...MOCK_COMPANY,
  },
  salary: {
    min: 4500,
    max: 6500,
    interval: "monthly",
    currency: "EUR",
    symbol: "€",
  },
  tags: ["React", "TypeScript", "Node.js"],
  isFeatured: true,
};

export function buildJobsResponse(
  jobs: MinimalJob[] = MOCK_JOBS,
  offset = 0,
  limit = 10,
): JobsResponse {
  const slice = jobs.slice(offset, offset + limit);
  return {
    data: slice,
    pagination: {
      limit,
      offset,
      totalCount: jobs.length,
      hasMore: offset + limit < jobs.length,
    },
  };
}

export const MOCK_TOTAL_COUNT = 2347;
