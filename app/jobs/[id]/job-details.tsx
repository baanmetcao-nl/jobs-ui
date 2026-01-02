"use client";
import {
  notFound,
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  GraduationCap,
  Award,
  EuroIcon,
  MapPin,
  Handshake,
  MapPinned,
  BookUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Image from "next/image";
import ApplyModal from "@/app/apply-modal";
import { Job } from "@/app/types";
import { capitalize, formatDate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const relatedJobs = [
  {
    id: 5,
    title: "Burger flipper",
    company: "Yomama",
    category: "Horeca",
    type: "Voltijds",
    location: "Planeet Jupiter",
    salary: "€25 - €40",
    daysLeft: 22,
    logo: "bg-purple-500",
  },
  {
    id: 6,
    title: "Tomatenplukker",
    company: "Babymomma",
    category: "Ontwikkeling & IT",
    type: "Remote",
    location: "Kas in Meteren",
    salary: "€450 - €900/maand",
    daysLeft: 22,
    logo: "bg-gray-800",
  },
  {
    id: 7,
    title: "Autopoetser",
    company: "Bayla's poetsbedrijf",
    category: "Ontwikkeling & IT",
    type: "Hybride",
    location: "Californië",
    salary: "Prijs bespreekbaar",
    daysLeft: 22,
    logo: "bg-red-500",
  },
];

const CompanyJobs = [
  {
    id: 8,
    title: "Frontend Ontwikkelaar",
    type: "Voltijds",
    location: "Amsterdam",
    daysLeft: 15,
  },
  {
    id: 9,
    title: "Backend Engineer",
    type: "Remote",
    location: "Remote",
    daysLeft: 30,
  },
  {
    id: 10,
    title: "DevOps Engineer",
    type: "Voltijds",
    location: "Amsterdam",
    daysLeft: 45,
  },
  {
    id: 11,
    title: "Productmanager",
    type: "Voltijds",
    location: "Amsterdam",
    daysLeft: 20,
  },
];

type ContractType = "freelance" | "permanent" | "temporary" | "internship";
const contractLabels: Record<ContractType, string> = {
  freelance: "Freelance",
  permanent: "Vast contract",
  temporary: "Tijdelijk contract",
  internship: "Stage",
};

type WorkPlaceType = "remote" | "hybrid" | "office" | "other";
const workplaceLabels: Record<WorkPlaceType, string> = {
  remote: "Remote",
  hybrid: "Hybride",
  office: "Kantoor",
  other: "Anders",
};

export default function JobDetails({ job }: { job: Job }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);
  const [activeTab, setActiveTab] = useState("overview");

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Start
            </Link>
            <span>›</span>
            <Link href="/" className="hover:text-gray-700">
              Ontwikkeling & IT
            </Link>
            <span>›</span>
            <span className="text-gray-900">{job.position}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 lg:pr-8">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src={job.company.logoUrl}
                      alt={job.company.name}
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {job.position}
                      </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 text-gray-600 text-sm">
                      <span>door</span>
                      <span className="font-medium text-gray-900">
                        {job.company.name}
                      </span>
                      <span>in</span>
                      <Link href="#" className="text-teal-600 hover:underline">
                        Ontwikkeling & IT
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag: string) => (
                  <Badge key={tag} className="bg-[#E6F4F1] text-[#3FAFA1]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                Inzichten over de functie
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem
                  icon={<Calendar color="#F1693F" />}
                  label="Gepubliceerd"
                  description={formatDate(job.createdAt)}
                />
                <InfoItem
                  icon={<Calendar color="#F1693F" />}
                  label="Remote"
                  description={capitalize(workplaceLabels[job.workplace])}
                />
                <InfoItem
                  icon={<EuroIcon color="#F1693F" />}
                  label="Salaris"
                  description={`${job.salaryRange.currency} ${job.salaryRange.min}-${job.salaryRange.max}`}
                />
                <InfoItem
                  icon={<Award color="#F1693F" />}
                  label="Carrièreniveau"
                  description={capitalize(job.seniority)}
                />
                <InfoItem
                  icon={<GraduationCap color="#F1693F" />}
                  label="Opleiding"
                  description={capitalize(job.education)}
                />
                <InfoItem
                  icon={<Handshake color="#F1693F" />}
                  label="Contract"
                  description={contractLabels[job.contract]}
                />
                <InfoItem
                  icon={<MapPinned color="#F1693F" />}
                  label="Locatie"
                  description={capitalize(job.location)}
                />
                <InfoItem
                  icon={<BookUser color="#F1693F" />}
                  label="Beroep"
                  description={capitalize(job.field)}
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Beschrijving
              </h2>
              <div className="prose max-w-none text-gray-700">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {job.description}
                </ReactMarkdown>

                <h3 className="text-lg font-medium mt-6 mb-3 text-gray-900">
                  Belangrijkste verantwoordelijkheden
                </h3>
                <ul className="mb-6">
                  {job.responsibilities.map((r: string, i: number) => (
                    <li key={i}>
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          p: ({ children }) => (
                            <p className="my-0">{children}</p>
                          ),
                        }}
                      >
                        {r}
                      </ReactMarkdown>
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium mt-6 mb-3 text-gray-900">
                  Vereisten
                </h3>
                <ul>
                  {job.requirements.map((r: string, i: number) => (
                    <li key={i}>
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          p: ({ children }) => (
                            <p className="my-0">{children}</p>
                          ),
                        }}
                      >
                        {r}
                      </ReactMarkdown>
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium mt-6 mb-3 text-gray-900">
                  Secundaire arbeidsvoorwaarden
                </h3>
                <ul>
                  <li>
                    <strong>
                      Extra beloning (bijv. 13e maand, vaste
                      eindejaarsuitkering, vaste toelage):
                    </strong>{" "}
                    {job.collectiveLaborAgreement.extraMoney ? "Ja" : "Nee"}
                  </li>
                  <li>
                    <strong>
                      Prestatiegebonden beloning (bijv. variabele uitkering,
                      prestatiebeloning, winstuitkering):
                    </strong>{" "}
                    {job.collectiveLaborAgreement.bonus ? "Ja" : "Nee"}
                  </li>
                  <li>
                    <strong>Pensioen:</strong>{" "}
                    {job.collectiveLaborAgreement.pension ? "Ja" : "Nee"}
                  </li>
                  <li>
                    <strong>Reiskostenvergoeding:</strong>{" "}
                    {job.collectiveLaborAgreement.travelAllowance
                      ? "Ja"
                      : "Nee"}
                  </li>
                  <li>
                    <strong>Aandelen:</strong>{" "}
                    {job.collectiveLaborAgreement.stocks ? "Ja" : "Nee"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Geïnteresseerd in deze vacature?
                </h3>
                <p className="text-[#F1592A] text-sm font-medium">
                  64 dagen over om te solliciteren
                </p>
              </div>

              <Button
                onClick={() => {
                  updatedSearchParams.set("exitModal", "true");
                  router.push(`${pathname}?${updatedSearchParams.toString()}`);
                }}
                className="bg-[#F1592A] hover:bg-[#F1592A]/90 text-white font-medium px-8 py-2 sm:w-auto w-full"
              >
                Solliciteer nu
              </Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Vergelijkbare vacatures
                </h2>
                <Link
                  href="/"
                  className="text-teal-600 hover:underline text-sm font-medium"
                >
                  Bekijk alle vacatures
                </Link>
              </div>
              <div className="space-y-4">
                {relatedJobs.map((v) => (
                  <RelatedJobCard key={v.id} vacature={v} />
                ))}
              </div>
            </div>
          </div>

          <Sidebar
            job={job}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bedrijfVacatures={CompanyJobs}
            updatedSearchParams={updatedSearchParams}
            router={router}
            pathname={pathname}
          />
        </div>
      </div>
      {updatedSearchParams.has("exitModal") && (
        <ApplyModal
          onClose={() => {
            updatedSearchParams.delete("exitModal");
            router.push(`${pathname}?${updatedSearchParams.toString()}`);
          }}
          onAccept={() => {
            window.open(job.url, "_blank");
          }}
        />
      )}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#FFF4EC] rounded flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

function RelatedJobCard({ vacature }: { vacature: any }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white font-semibold text-sm">
            <Image
              src={"https://api.baanmetcao.nl/images/logos/rijksoverheid.svg"}
              alt={"logo"}
              width={60}
              height={60}
            />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{vacature.title}</h3>
          <div className="text-sm text-gray-600">
            door <span className="font-medium">{vacature.company}</span> in
            <Link href="#" className="text-teal-600 hover:underline ml-1">
              {vacature.category}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
              {vacature.type}
            </Badge>
            <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
              <MapPin size={16} style={{ marginRight: 5 }} />
              {vacature.location}
            </Badge>
            <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
              {vacature.salary}
            </Badge>
          </div>
          <div className="text-sm text-[#333333] font-medium mt-2">
            {vacature.daysLeft} dagen over om te solliciteren
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  job,
  activeTab,
  setActiveTab,
  bedrijfVacatures,
  updatedSearchParams,
  router,
  pathname,
}: any) {
  return (
    <div className="lg:w-80 lg:flex-shrink-0">
      <div className="lg:sticky lg:top-8 space-y-6">
        <div className="bg-gray-50 rounded-lg p-6 max-sm:hidden">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Geïnteresseerd?
          </h3>
          <p className="text-[#F1592A] text-sm mb-4 font-medium">
            64 dagen over om te solliciteren
          </p>

          <Button
            onClick={() => {
              updatedSearchParams.set("exitModal", "true");
              router.push(`${pathname}?${updatedSearchParams.toString()}`);
            }}
            className="bg-[#F1592A] hover:bg-[#F1592A]/90 text-white font-medium px-8 py-2 sm:w-auto w-full"
          >
            Solliciteer nu
          </Button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <Image
                src={job.company.logoUrl}
                alt={job.company.name}
                width={60}
                height={60}
              />
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {job.company.name}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "overview"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500"
                }`}
              >
                Overzicht
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "jobs"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500"
                }`}
              >
                Vacatures
                <span className="ml-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded">
                  {bedrijfVacatures.length}
                </span>
              </button>
            </div>

            <div className="mt-4">
              {activeTab === "overview" && (
                <div className="space-y-4 text-sm text-gray-600">
                  <p className="leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua....
                  </p>
                </div>
              )}

              {activeTab === "jobs" && (
                <div className="space-y-3">
                  {bedrijfVacatures.map((job: any) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="block border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
                    >
                      <h4 className="font-medium text-gray-900 mb-1 hover:text-teal-600">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
                          {job.type}
                        </Badge>
                        <span>{job.location}</span>
                      </div>
                      <div className="text-xs text-teal-600 font-medium">
                        {job.daysLeft} dagen over om te solliciteren
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
