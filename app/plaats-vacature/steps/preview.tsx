"use client";

import { sanitize } from "@/lib/sanitize";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  MapPin,
  Clock,
  Award,
  Calendar,
  Euro as EuroIcon,
  Handshake,
  MapPinned,
  HelpCircle,
} from "lucide-react";

import type {
  JobDetailsFormData,
  CompanyFormData,
  Benefit,
} from "@/app/types-employer";
import { locationDisplayName } from "@/components/location-autocomplete";
import { nicheSeo } from "@/lib/niches";
import { intervalFormat } from "@/lib/utils";

interface PreviewStepProps {
  jobData: Partial<JobDetailsFormData>;
  companyData: Partial<CompanyFormData>;
  goToStep?: (slug: string) => void;
}

const BENEFIT_LABELS: Record<string, string> = {
  extra_fixed_payment: "13e maand",
  extra_variable_payment: "Bonus / Variabel",
  pension_plan: "Pensioen",
  travel_allowance: "Reiskostenvergoeding",
  extra_time_off: "Extra vakantiedagen",
  extraFixedPayment: "13e maand",
  extraVariablePayment: "Bonus / Variabel",
  pensionPlan: "Pensioen",
  travelAllowance: "Reiskostenvergoeding",
  extraTimeOff: "Extra vakantiedagen",
};

export function PreviewStep({
  jobData,
  companyData,
  goToStep,
}: PreviewStepProps) {
  const salaryDisplay = () => {
    if (jobData.salary?.min && jobData.salary?.max) {
      return `\u20AC${jobData.salary.min.toLocaleString("nl-NL")} - \u20AC${jobData.salary.max.toLocaleString("nl-NL")} ${intervalFormat(jobData.salary.interval)}`;
    }
    if (jobData.salary?.min) {
      return `Vanaf \u20AC${jobData.salary.min.toLocaleString("nl-NL")}`;
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
    };
    return (
      contractMap[jobData.contract || ""] || jobData.contract || "Onbekend"
    );
  };

  const seniorityDisplay = () => {
    const seniorityMap: Record<string, string> = {
      junior: "Junior",
      medior: "Medior",
      senior: "Senior",
      principal: "Lead",
    };
    return (
      seniorityMap[jobData.seniority || ""] || jobData.seniority || "Onbekend"
    );
  };

  const nicheDisplay = () => {
    if (!jobData.niches?.length) return "Onbekend";
    return jobData.niches.map((n) => nicheSeo[n]?.heading || n).join(", ");
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
            <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-800 mb-0">
              Zo zal je vacature eruitzien op de website. Je kunt nog terug om
              aanpassingen te maken.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  companyData.logoPreviewUrl || "/web-app-manifest-512x512.png"
                }
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
                <span className="font-medium text-teal-600">
                  {nicheDisplay()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {jobData.keywords && jobData.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {jobData.keywords.map((keyword) => (
              <Badge key={keyword} className="bg-[#E6F4F1] text-[#3FAFA1]">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Inzichten over de functie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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
            description={seniorityDisplay()}
          />
          <InfoItem
            icon={<Handshake color="#F1693F" size={16} />}
            label="Contract"
            description={contractDisplay()}
          />
          <InfoItem
            icon={<MapPin color="#F1693F" size={16} />}
            label="Locatie"
            description={locationDisplayName(jobData.city || "") || "Onbekend"}
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
          {jobData.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(jobData.description),
              }}
            />
          ) : (
            <p>Vacaturetekst hier...</p>
          )}

          {jobData.requirements && jobData.requirements.length > 0 && (
            <>
              <h3 className="text-lg font-medium mt-6 mb-3 text-gray-900">
                Functie-eisen
              </h3>
              <ul className="space-y-1">
                {jobData.requirements.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </>
          )}

          {jobData.responsibilities && jobData.responsibilities.length > 0 && (
            <>
              <h3 className="text-lg font-medium mt-6 mb-3 text-gray-900">
                Verantwoordelijkheden
              </h3>
              <ul className="space-y-1">
                {jobData.responsibilities.map((resp) => (
                  <li key={resp}>{resp}</li>
                ))}
              </ul>
            </>
          )}

          {jobData.benefits && jobData.benefits.length > 0 && (
            <>
              <h3 className="text-lg font-medium mt-6 mb-3 text-gray-900">
                Secundaire arbeidsvoorwaarden
              </h3>
              <ul className="space-y-1">
                {jobData.benefits.map((benefit) => (
                  <li key={benefit}>{BENEFIT_LABELS[benefit] || benefit}</li>
                ))}
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
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="sm:w-auto w-full">
                <Button
                  disabled
                  className="bg-[#F1592A] text-white font-medium px-8 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Solliciteer nu
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Dit is een preview — de knop werkt na publicatie</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">
          Over {companyData.name || "het bedrijf"}
        </h3>
        <p className="text-gray-600 text-sm whitespace-pre-line break-words">
          {companyData.bio
            ? companyData.bio.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                /^https?:\/\//.test(part) ? (
                  <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F1592A] hover:underline"
                  >
                    {part}
                  </a>
                ) : (
                  part
                ),
              )
            : "Geen beschrijving beschikbaar."}
        </p>
        {companyData.url && (
          <a
            href={companyData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F1592A] text-sm hover:underline mt-2 inline-block"
          >
            {companyData.url}
          </a>
        )}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => goToStep?.("bedrijf")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vorige
        </Button>
        <Button
          type="button"
          onClick={() => goToStep?.("prijzen")}
          className="hover:bg-[#e04d1f] text-white min-w-25"
        >
          Volgende stap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
