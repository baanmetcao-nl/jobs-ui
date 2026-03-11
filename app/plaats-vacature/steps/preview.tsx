"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { JobDetailsFormData, CompanyFormData } from "@/app/types-employer";

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
      office: "Op kantoor",
      hybrid: "Hybride",
      remote: "Thuiswerken",
      free_choice: "Flexibel",
    };
    return workplaceMap[jobData.workplace || ""] || "On-site";
  };

  const contractDisplay = () => {
    const contractMap: Record<string, string> = {
      permanent: "Vast contract",
      temporary: "Tijdelijk contract",
      flex: "Flexibel / Uitzendwerk",
      freelance: "Freelance / ZZP",
    };
    return contractMap[jobData.contract || ""] || jobData.contract;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#F1592A]" />
          Preview vacature
        </h2>
        <p className="text-gray-600">
          Zo zal je vacature eruitzien op de website. Je kunt nog terug om
          aanpassingen te maken.
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#F1592A] to-[#e04d1f] h-24 relative">
          {companyData.logoUrl && (
            <div className="absolute -bottom-8 left-6 bg-white p-2 rounded-lg shadow-md">
              <img
                src={companyData.logoUrl}
                alt={companyData.name || "Bedrijf"}
                className="w-16 h-16 object-contain"
              />
            </div>
          )}
        </div>

        <div className="p-6 pt-12">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {jobData.title || "Functietitel"}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {companyData.name || "Bedrijfsnaam"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {jobData.city || "Locatie"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              <DollarSign className="w-3 h-3" />
              {salaryDisplay()}
              {jobData.salary?.interval &&
                jobData.salary.interval !== "monthly" && (
                  <span className="text-xs text-gray-500">/maand</span>
                )}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              {contractDisplay()}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              <MapPin className="w-3 h-3" />
              {workplaceDisplay()}
            </Badge>
            {jobData.hours?.min && jobData.hours?.max && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 py-1.5"
              >
                <Clock className="w-3 h-3" />
                {jobData.hours.min} - {jobData.hours.max} uur
              </Badge>
            )}
          </div>

          <div className="prose prose-sm max-w-none mb-6">
            <h3 className="text-lg font-semibold mb-2">Functieomschrijving</h3>
            <div className="text-gray-600 whitespace-pre-wrap">
              {jobData.description || "Vacaturetekst hier..."}
            </div>
          </div>

          {jobData.benefits && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Arbeidsvoorwaarden</h3>
              <div className="flex flex-wrap gap-2">
                {jobData.benefits.extraFixedPayment && (
                  <Badge className="bg-green-100 text-green-800">
                    13e maand
                  </Badge>
                )}
                {jobData.benefits.pensionPlan && (
                  <Badge className="bg-green-100 text-green-800">
                    Pensioen
                  </Badge>
                )}
                {jobData.benefits.travelAllowance && (
                  <Badge className="bg-green-100 text-green-800">
                    Reiskosten
                  </Badge>
                )}
                {jobData.benefits.extraTimeOff && (
                  <Badge className="bg-green-100 text-green-800">
                    Extra vakantie
                  </Badge>
                )}
                {jobData.benefits.extraVariablePayment && (
                  <Badge className="bg-green-100 text-green-800">Bonus</Badge>
                )}
                {jobData.benefits.stockPlan && (
                  <Badge className="bg-green-100 text-green-800">
                    Aandelen
                  </Badge>
                )}
              </div>
            </div>
          )}

          {jobData.tags && jobData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {jobData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <Button className="bg-[#F1592A] hover:bg-[#e04d1f] text-white w-full sm:w-auto">
              Solliciteren
            </Button>
          </div>
        </div>
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
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vorige
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="bg-[#F1592A] hover:bg-[#e04d1f] text-white min-w-[200px]"
        >
          Verder naar prijzen
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
