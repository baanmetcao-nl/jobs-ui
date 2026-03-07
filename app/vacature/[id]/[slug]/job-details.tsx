"use client";
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import {
  Award,
  BookUser,
  Calendar,
  Clock,
  EuroIcon,
  GraduationCap,
  Handshake,
  MapPin,
  MapPinned,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Image from "next/image";
import ApplyModal from "@/app/apply-modal";
import {
  capitalize,
  contractFormat,
  educationFormat,
  formatDate,
  intervalFormat,
  slugify,
} from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Job, MinimalJob } from "@/app/types";
import CompanyLogo from "@/components/image-fallback";

const workplaceLabels: Record<Job["workplace"], string> = {
  remote: "Remote",
  hybrid: "Hybride",
  office: "Kantoor",
  other: "Anders",
  free_choice: "Vrije keuze",
};

type JobDetailsProps = {
  job: Job;
  relatedJobs: MinimalJob[];
  relatedCompanyJobs: MinimalJob[];
};

type SidebarProps = {
  job: Job;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  relatedCompanyJobs: MinimalJob[];
  updatedSearchParams: URLSearchParams;
  router: ReturnType<typeof useRouter>;
  pathname: string;
};

export default function JobDetails({
  job,
  relatedJobs,
  relatedCompanyJobs,
}: JobDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);
  const [activeTab, setActiveTab] = useState("overview");

  if (!job) {
    notFound();
  }

  const hoursText =
    job.hours.min === job.hours.max
      ? `${job.hours.min} uur`
      : `${job.hours.min} - ${job.hours.max} uur`;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link prefetch={false} href="/" className="hover:text-gray-700">
              Start
            </Link>
            <span>›</span>
            <Link
              prefetch={false}
              href="/"
              className="hover:text-gray-700"
            ></Link>
            <span>›</span>
            <span className="text-gray-900">{job.title}</span>
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
                    <CompanyLogo
                      src={
                        job.company.logoUrl
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${job.company.logoUrl}`
                          : undefined
                      }
                      alt={"logo"}
                      size={60}
                    />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {job.title}
                      </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 text-gray-600 text-sm">
                      <span>door</span>
                      <span className="font-medium text-gray-900">
                        {job.company.name}
                      </span>
                      <span>in</span>
                      <Link
                        prefetch={false}
                        href="#"
                        className="text-teal-600 hover:underline"
                      >
                        {capitalize(job.niches[0])}
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
                  description={formatDate(job.publishedAt)}
                />
                <InfoItem
                  icon={<Calendar color="#F1693F" />}
                  label="Remote"
                  description={capitalize(workplaceLabels[job.workplace])}
                />
                <InfoItem
                  icon={<EuroIcon color="#F1693F" />}
                  label="Salaris"
                  description={`${job.salary.symbol} ${Math.trunc(job.salary.min)} - ${Math.trunc(job.salary.max)} ${intervalFormat(job.salary.interval)}`}
                />
                <InfoItem
                  icon={<Award color="#F1693F" />}
                  label="Carrièreniveau"
                  description={capitalize(job.seniority)}
                />
                <InfoItem
                  icon={<GraduationCap color="#F1693F" />}
                  label="Opleiding"
                  description={educationFormat(job.education)}
                />
                <InfoItem
                  icon={<Handshake color="#F1693F" />}
                  label="Contract"
                  description={contractFormat(job.contract)}
                />
                <InfoItem
                  icon={<MapPinned color="#F1693F" />}
                  label="Locatie"
                  description={capitalize(job.city)}
                />
                <InfoItem
                  icon={<Clock color="#F1693F" />}
                  label="Uren per week"
                  description={hoursText}
                />
              </div>
            </div>

            <div className="mb-8">
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
                    {job.benefits.extraFixedPayment ? "Ja" : "Nee"}
                  </li>
                  <li>
                    <strong>
                      Prestatiegebonden beloning (bijv. variabele uitkering,
                      prestatiebeloning, winstuitkering):
                    </strong>{" "}
                    {job.benefits.extraVariablePayment ? "Ja" : "Nee"}
                  </li>
                  <li>
                    <strong>Pensioen:</strong>{" "}
                    {job.benefits.pensionPlan ? "Ja" : "Nee"}
                  </li>
                  <li>
                    <strong>Reiskostenvergoeding:</strong>{" "}
                    {job.benefits.travelAllowance ? "Ja" : "Nee"}
                  </li>
                  <li>
                    <strong>Aandelen:</strong>{" "}
                    {job.benefits.stockPlan ? "Ja" : "Nee"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Geïnteresseerd in de vacature?
                </h3>
                <p className="text-[#F1592A] text-sm font-medium">
                  Neem de volgende stap
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
              <div className="flex max-sm:flex-col items-center gap-2 justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Vergelijkbare vacatures
                </h2>
                <Link
                  prefetch={false}
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
            relatedCompanyJobs={relatedCompanyJobs}
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

function RelatedJobCard({ vacature }: { vacature: MinimalJob }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white font-semibold text-sm">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${vacature.company.logoUrl}`}
              alt={"logo"}
              width={60}
              height={60}
            />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">
            <Link
              prefetch={false}
              href={`/vacature/${vacature.id}/${slugify(vacature.title)}`}
            >
              {vacature.title}
            </Link>
          </h3>
          <div className="text-sm text-gray-600">
            door <span className="font-medium">{vacature.company.name}</span> in
            <Link
              prefetch={false}
              href="#"
              className="text-teal-600 hover:underline ml-1"
            >
              {capitalize(vacature.niches[0])}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
              {vacature.workplace}
            </Badge>
            <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
              <MapPin size={16} style={{ marginRight: 5 }} />
              {vacature.city}
            </Badge>
            <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
              {vacature.salary.symbol} {Math.trunc(vacature.salary.min)} -{" "}
              {Math.trunc(vacature.salary.max)}{" "}
            </Badge>
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
  relatedCompanyJobs,
  updatedSearchParams,
  router,
  pathname,
}: SidebarProps) {
  return (
    <div className="lg:w-80 lg:flex-shrink-0">
      <div className="lg:sticky lg:top-24 space-y-6">
        <div className="bg-gray-50 rounded-lg p-6 max-sm:hidden">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Geïnteresseerd in de vacature?
          </h3>

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
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${job.company.logoUrl}`}
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
                  {relatedCompanyJobs.length}
                </span>
              </button>
            </div>

            <div className="mt-4">
              {activeTab === "overview" && (
                <div className="space-y-4 text-sm/6 text-gray-600">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {job.company.bio}
                  </ReactMarkdown>
                </div>
              )}

              {activeTab === "jobs" && (
                <div className="space-y-3">
                  {relatedCompanyJobs.map((job: MinimalJob) => (
                    <Link
                      prefetch={false}
                      key={job.id}
                      href={`/vacature/${job.id}/${slugify(job.title)}`}
                      className="block border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
                    >
                      <h4 className="font-medium text-gray-900 mb-1 hover:text-teal-600">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
                          {job.workplace}
                        </Badge>
                        <span>{job.city}</span>
                      </div>
                      <div>
                        <Badge className="bg-[#F4F4F4] text-[#333333] text-xs">
                          {job.salary.symbol} {Math.trunc(job.salary.min)} -{" "}
                          {Math.trunc(job.salary.max)}{" "}
                          {intervalFormat(job.salary.interval)}
                        </Badge>
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
