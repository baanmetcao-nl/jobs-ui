"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  MapPin,
  Clock,
  Award,
  Calendar,
  Euro as EuroIcon,
  GraduationCap,
  Handshake,
  MapPinned,
  HelpCircle,
} from "lucide-react";

import { JobDetailsFormData, CompanyFormData } from "@/app/types-employer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface PreviewStepProps {
  jobData: Partial<JobDetailsFormData>;
  companyData: Partial<CompanyFormData>;
  onBack: () => void;
  onNext: () => void;
}

export function PreviewStep({
  jobData,
  companyData,
  onBack,
  onNext,
}: PreviewStepProps) {
  const salaryDisplay = () => {
    if (jobData.salary?.min && jobData.salary?.max) {
      return `€${jobData.salary.min.toLocaleString("nl-NL")} - €${jobData.salary.max.toLocaleString("nl-NL")}`;
    }
    if (jobData.salary?.min) {
      return `Vanaf €${jobData.salary.min.toLocaleString("nl-NL")}`;
    }
    return "Salaris op aanvraag";
  };

  const workplaceDisplay = () => {
    const workplaceMap: Record<string, string> = {
      office: "Kantoor",
      hybrid: "Hybride",
      remote: "Remote",
      free_choice: "Vrije keuze",
      other: "Anders",
    };
    return workplaceMap[jobData.workplace || ""] || "Onbekend";
  };

  const contractDisplay = () => {
    const contractMap: Record<string, string> = {
      permanent: "Vast contract",
      temporary: "Tijdelijk contract",
      flex: "Flexibel / Uitzendwerk",
      freelance: "Freelance / ZZP",
    };
    return (
      contractMap[jobData.contract || ""] || jobData.contract || "Onbekend"
    );
  };

  const hoursText =
    jobData.hours?.min && jobData.hours?.max
      ? `${jobData.hours.min} - ${jobData.hours.max} uur`
      : "Onbekend";

  const now = new Date().toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const InfoItem = ({
    icon,
    label,
    description,
  }: {
    icon: React.ReactNode;
    label: string;
    description: string;
  }) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#FFF4EC] rounded flex items-center justify-center p-1">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#F1592A]" />
          Preview vacature
        </h2>
        <div className="p-4 bg-blue-50 rounded-lg mt-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 mb-0">
                Zo zal je vacature eruitzien op de website. Je kunt nog terug om
                aanpassingen te maken.
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-600"></p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0">
              <img
                src={companyData.logoUrl || "/web-app-manifest-512x512.png"}
                alt={companyData.name || "Bedrijf"}
                className="w-16 h-16 object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {jobData.title || "Functietitel"}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-1 text-gray-600 text-sm">
                <span>door</span>
                <span className="font-medium text-gray-900">
                  {companyData.name || "Bedrijfsnaam"}
                </span>
                <span>in</span>
                <span className="font-medium text-teal-600">Techniek</span>
              </div>
            </div>
          </div>
        </div>

        {jobData.tags && jobData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {jobData.tags.map((tag) => (
              <Badge key={tag} className="bg-[#E6F4F1] text-[#3FAFA1]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Inzichten over de functie
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <InfoItem
            icon={<Calendar color="#F1693F" size={16} />}
            label="Gepubliceerd"
            description={now}
          />
          <InfoItem
            icon={<MapPinned color="#F1693F" size={16} />}
            label="Werkplek"
            description={workplaceDisplay()}
          />
          <InfoItem
            icon={<EuroIcon color="#F1693F" size={16} />}
            label="Salaris"
            description={salaryDisplay()}
          />
          <InfoItem
            icon={<Award color="#F1693F" size={16} />}
            label="Ervaringsniveau"
            description="Medior"
          />
          <InfoItem
            icon={<GraduationCap color="#F1693F" size={16} />}
            label="Opleiding"
            description="HBO"
          />
          <InfoItem
            icon={<Handshake color="#F1693F" size={16} />}
            label="Contract"
            description={contractDisplay()}
          />
          <InfoItem
            icon={<MapPin color="#F1693F" size={16} />}
            label="Locatie"
            description={jobData.city || "Onbekend"}
          />
          <InfoItem
            icon={<Clock color="#F1693F" size={16} />}
            label="Uren per week"
            description={hoursText}
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="prose max-w-none text-gray-700 mb-6">
          <div className="whitespace-pre-wrap mb-6">
            {jobData.description ? (
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {jobData.description}
              </ReactMarkdown>
            ) : (
              "Vacaturetekst hier..."
            )}
          </div>
          {jobData.benefits && (
            <>
              <h3 className="text-lg font-medium mt-6 mb-3 text-gray-900">
                Secundaire arbeidsvoorwaarden
              </h3>
              <ul className="space-y-2">
                <li>
                  <strong>Extra beloning (bijv. 13e maand):</strong>{" "}
                  {jobData.benefits.extraFixedPayment ? "Ja" : "Nee"}
                </li>
                <li>
                  <strong>Prestatiegebonden beloning:</strong>{" "}
                  {jobData.benefits.extraVariablePayment ? "Ja" : "Nee"}
                </li>
                <li>
                  <strong>Pensioen:</strong>{" "}
                  {jobData.benefits.pensionPlan ? "Ja" : "Nee"}
                </li>
                <li>
                  <strong>Reiskostenvergoeding:</strong>{" "}
                  {jobData.benefits.travelAllowance ? "Ja" : "Nee"}
                </li>
                <li>
                  <strong>Aandelen:</strong>{" "}
                  {jobData.benefits.stockPlan ? "Ja" : "Nee"}
                </li>
              </ul>
            </>
          )}
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
        <Button className="bg-[#F1592A] hover:bg-[#F1592A]/90 text-white font-medium px-8 py-2 sm:w-auto w-full">
          Solliciteer nu (preview button)
        </Button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">
          Over {companyData.name || "het bedrijf"}
        </h3>
        <p className="text-gray-600 text-sm">
          {companyData.bio || "Geen beschrijving beschikbaar."}
        </p>
        {companyData.website && (
          <a
            href={companyData.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F1592A] text-sm hover:underline mt-2 inline-block"
          >
            {companyData.website}
          </a>
        )}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            onBack();
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vorige
        </Button>
        <Button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            onNext();
          }}
          className="hover:bg-[#e04d1f] text-white min-w-[100px]"
        >
          Volgende stap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
