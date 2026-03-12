"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Briefcase,
  MapPin,
  Euro,
  FileText,
  Clock,
  Globe,
  ArrowRight,
  HelpCircle,
  X,
} from "lucide-react";
import { JobDetailsFormData } from "@/app/types-employer";
import { Contract, Interval, Niche, Workplace } from "@/app/types";
import { nicheSeo } from "@/lib/niches";

interface JobDetailsFormProps {
  data: Partial<JobDetailsFormData>;
  onChange: (data: Partial<JobDetailsFormData>) => void;
  onNext: () => void;
}

function sanitizeInput(input: string): string {
  return input.replace(/</g, "<").replace(/>/g, ">");
}

export function JobDetailsForm({
  data,
  onChange,
  onNext,
}: JobDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.title?.trim()) {
      newErrors.title = "Functietitel is verplicht";
    }
    const strippedDescription =
      data.description?.replace(/<[^>]*>/g, "").trim() || "";
    if (!strippedDescription) {
      newErrors.description = "Beschrijving is verplicht";
    }
    if (!data.city?.trim()) {
      newErrors.city = "Locatie is verplicht";
    }
    if (!data.contract) {
      newErrors.contract = "Contract type is verplicht";
    }

    if (!data.workplace) {
      newErrors.workplace = "Werkplek is verplicht";
    }

    if (!data.seniority) {
      newErrors.seniority = "Senioriteit is verplicht";
    }

    if (!data.salary?.min || data.salary.min <= 0) {
      newErrors.salaryMin = "Minimum salaris is verplicht";
    }
    if (!data.salary?.max || data.salary.max <= 0) {
      newErrors.salaryMax = "Maximum salaris is verplicht";
    }
    if (
      data.salary?.min &&
      data.salary?.max &&
      data.salary.min > data.salary.max
    ) {
      newErrors.salaryMax = "Maximum moet hoger zijn dan minimum";
    }

    if (!data.salary?.interval) {
      newErrors.interval = "Salaris periode is verplicht";
    }

    if (!data.hours?.min || data.hours.min <= 0) {
      newErrors.hoursMin = "Minimum uren is verplicht";
    }
    if (!data.hours?.max || data.hours.max <= 0) {
      newErrors.hoursMax = "Maximum uren is verplicht";
    }
    if (data.hours?.min && data.hours?.max && data.hours.min > data.hours.max) {
      newErrors.hoursMax = "Maximum moet hoger zijn dan minimum";
    }

    if (!data.applicationMethod) {
      newErrors.applicationMethod = "Sollicitatie methode is verplicht";
    }

    if (data.applicationMethod === "email") {
      if (!data.applicationEmail?.trim()) {
        newErrors.applicationEmail =
          "Emailadres voor sollicitaties is verplicht";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.applicationEmail)) {
        newErrors.applicationEmail = "Voer een geldig emailadres in";
      }
    }

    if (data.applicationMethod === "external") {
      if (!data.url?.trim()) {
        newErrors.url = "URL naar sollicitatiepagina is verplicht";
      } else if (!/^https?:\/\/.+/.test(data.url)) {
        newErrors.url = "Voer een geldige URL in (met http:// of https://)";
      }
    }

    if (!data.niche) {
      newErrors.niches = "Categorie is verplicht";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNext();
    }
  };

  const MAX_TAGS = 10;

  const addTag = (tag: string) => {
    const currentTags = data.tags || [];
    if (currentTags.length >= MAX_TAGS) {
      return;
    }
    const sanitizedTag = sanitizeInput(tag);
    if (sanitizedTag && !currentTags.includes(sanitizedTag)) {
      onChange({ tags: [...currentTags, sanitizedTag] });
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = data.tags || [];
    onChange({ tags: currentTags.filter((t) => t !== tag) });
  };

  const addNiche = (niche: string) => {
    onChange({ niche: niche as Niche });
  };

  const tagCount = data.tags?.length || 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#F1592A]" />
          Functiegegevens
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="titel" className="mb-4">
              Functietitel <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Bijv. Senior Software Developer"
              value={data.title || ""}
              onChange={(e) => {
                onChange({ title: e.target.value });
                if (e.target.value.trim()) clearError("title");
              }}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Kies een duidelijke functietitel die de functie goed omschrijft
            </p>
          </div>

          <div>
            <Label htmlFor="omschrijving" className="mb-4">
              Vacaturetekst <span className="text-red-500">*</span>
            </Label>
            <RichTextEditor
              value={data.description || ""}
              onChange={(value) => onChange({ description: value })}
              error={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="locatie" className="mb-4">
                Locatie <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="city"
                  placeholder="Bijv. Amsterdam"
                  value={data.city || ""}
                  onChange={(e) => {
                    onChange({ city: e.target.value });
                    if (e.target.value.trim()) clearError("city");
                  }}
                  className={`pl-10 ${errors.city ? "border-red-500" : ""}`}
                />
              </div>
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <Label htmlFor="werkplek" className="mb-4">
                Werkplek <span className="text-red-500">*</span>
              </Label>
              <Select
                value={data.workplace || ""}
                onValueChange={(value: Workplace) => {
                  onChange({ workplace: value });
                  clearError("workplace");
                }}
              >
                <SelectTrigger
                  className={errors.workplace ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Kies werkplek" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Op kantoor</SelectItem>
                  <SelectItem value="hybrid">Hybride</SelectItem>
                  <SelectItem value="remote">Thuiswerken</SelectItem>
                  <SelectItem value="free_choice">Vrije keuze</SelectItem>
                </SelectContent>
              </Select>
              {errors.workplace && (
                <p className="text-sm text-red-500 mt-1">{errors.workplace}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#F1592A]" />
          Contract & Salaris
        </h2>

        <div className="space-y-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contract" className="mb-4">
                Contract type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={data.contract || ""}
                onValueChange={(value: Contract) =>
                  onChange({ contract: value })
                }
              >
                <SelectTrigger
                  className={errors.contract ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Kies contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Vast contract</SelectItem>
                  <SelectItem value="temporary">Tijdelijk contract</SelectItem>
                  <SelectItem value="flex">Flexibel / Uitzendwerk</SelectItem>
                  <SelectItem value="freelance">Freelance / ZZP</SelectItem>
                </SelectContent>
              </Select>
              {errors.contract && (
                <p className="text-sm text-red-500 mt-1">{errors.contract}</p>
              )}
            </div>

            <div>
              <Label htmlFor="senioriteit" className="mb-4">
                Senioriteit <span className="text-red-500">*</span>
              </Label>
              <Select
                value={data.seniority || ""}
                onValueChange={(value) => onChange({ seniority: value })}
              >
                <SelectTrigger
                  className={errors.seniority ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Kies senioriteit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="medior">Medior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="principal">Lead</SelectItem>
                </SelectContent>
              </Select>
              {errors.seniority && (
                <p className="text-sm text-red-500 mt-1">{errors.seniority}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="salaris-van" className="mb-4">
                Salaris van (€) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  min="0"
                  placeholder="3000"
                  value={data.salary?.min || ""}
                  onChange={(e) =>
                    onChange({
                      salary: {
                        min: Math.max(0, Number(e.target.value)),
                        max: data.salary?.max ?? 0,
                        interval: data.salary?.interval ?? "monthly",
                      },
                    })
                  }
                  className={`pl-10 ${errors.salaryMin ? "border-red-500" : ""}`}
                />
              </div>
              {errors.salaryMin && (
                <p className="text-sm text-red-500 mt-1">{errors.salaryMin}</p>
              )}
            </div>

            <div>
              <Label htmlFor="salaris-tot" className="mb-4">
                Salaris tot (€) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  min="0"
                  placeholder="4000"
                  value={data.salary?.max || ""}
                  onChange={(e) =>
                    onChange({
                      salary: {
                        min: data.salary?.min ?? 0,
                        max: Math.max(0, Number(e.target.value)),
                        interval: data.salary?.interval ?? "monthly",
                      },
                    })
                  }
                  className={`pl-10 ${errors.salaryMax ? "border-red-500" : ""}`}
                />
              </div>
              {errors.salaryMax && (
                <p className="text-sm text-red-500 mt-1">{errors.salaryMax}</p>
              )}
            </div>

            <div>
              <Label htmlFor="interval" className="mb-4">
                Periode <span className="text-red-500">*</span>
              </Label>
              <Select
                value={data.salary?.interval || ""}
                onValueChange={(value: Interval) =>
                  onChange({
                    salary: {
                      min: data.salary?.min ?? 0,
                      max: data.salary?.max ?? 0,
                      interval: value,
                    },
                  })
                }
              >
                <SelectTrigger
                  className={errors.interval ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Kies periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Per uur</SelectItem>
                  <SelectItem value="daily">Per dag</SelectItem>
                  <SelectItem value="weekly">Per week</SelectItem>
                  <SelectItem value="4_weekly">Per 4 weken</SelectItem>
                  <SelectItem value="monthly">Per maand</SelectItem>
                  <SelectItem value="yearly">Per jaar</SelectItem>
                </SelectContent>
              </Select>
              {errors.interval && (
                <p className="text-sm text-red-500 mt-1">{errors.interval}</p>
              )}
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">
                  Transparant salaris verhoogt respons
                </p>
                <p className="text-sm text-blue-800">
                  Vacatures met een vast salaris krijgen gemiddeld 40% meer
                  reacties. Vermeld ook of er een CAO van toepassing is.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#F1592A]" />
          Arbeidsvoorwaarden
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="uren-min" className="mb-4">
                Uren per week (min) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                min="0"
                placeholder="32"
                value={data.hours?.min || ""}
                onChange={(e) =>
                  onChange({
                    hours: {
                      min: Math.max(0, Number(e.target.value)),
                      max: data.hours?.max ?? 0,
                    },
                  })
                }
                className={errors.hoursMin ? "border-red-500" : ""}
              />
              {errors.hoursMin && (
                <p className="text-sm text-red-500 mt-1">{errors.hoursMin}</p>
              )}
            </div>

            <div>
              <Label htmlFor="uren-max" className="mb-4">
                Uren per week (max) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                min="0"
                placeholder="40"
                value={data.hours?.max || ""}
                onChange={(e) =>
                  onChange({
                    hours: {
                      min: data.hours?.min ?? 0,
                      max: Math.max(0, Number(e.target.value)),
                    },
                  })
                }
                className={errors.hoursMax ? "border-red-500" : ""}
              />
              {errors.hoursMax && (
                <p className="text-sm text-red-500 mt-1">{errors.hoursMax}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="arbeidsvoorwaarden" className="mb-4">
              Arbeidsvoorwaarden
            </Label>
            <div
              className={`grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 ${errors.benefits ? "border border-red-500 rounded-lg p-2" : ""}`}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extraFixedPayment"
                  checked={data.benefits?.extraFixedPayment || false}
                  onCheckedChange={(checked) =>
                    onChange({
                      benefits: {
                        extraFixedPayment: checked as boolean,
                        extraVariablePayment:
                          data.benefits?.extraVariablePayment ?? false,
                        pensionPlan: data.benefits?.pensionPlan ?? false,
                        travelAllowance:
                          data.benefits?.travelAllowance ?? false,
                        extraTimeOff: data.benefits?.extraTimeOff ?? false,
                        stockPlan: data.benefits?.stockPlan ?? false,
                      },
                    })
                  }
                />
                <label
                  htmlFor="extraFixedPayment"
                  className="text-sm cursor-pointer"
                >
                  13e maand
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pensionPlan"
                  checked={data.benefits?.pensionPlan || false}
                  onCheckedChange={(checked) =>
                    onChange({
                      benefits: {
                        extraFixedPayment:
                          data.benefits?.extraFixedPayment ?? false,
                        extraVariablePayment:
                          data.benefits?.extraVariablePayment ?? false,
                        pensionPlan: checked as boolean,
                        travelAllowance:
                          data.benefits?.travelAllowance ?? false,
                        extraTimeOff: data.benefits?.extraTimeOff ?? false,
                        stockPlan: data.benefits?.stockPlan ?? false,
                      },
                    })
                  }
                />
                <label htmlFor="pensionPlan" className="text-sm cursor-pointer">
                  Pensioen
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="travelAllowance"
                  checked={data.benefits?.travelAllowance || false}
                  onCheckedChange={(checked) =>
                    onChange({
                      benefits: {
                        extraFixedPayment:
                          data.benefits?.extraFixedPayment ?? false,
                        extraVariablePayment:
                          data.benefits?.extraVariablePayment ?? false,
                        pensionPlan: data.benefits?.pensionPlan ?? false,
                        travelAllowance: checked as boolean,
                        extraTimeOff: data.benefits?.extraTimeOff ?? false,
                        stockPlan: data.benefits?.stockPlan ?? false,
                      },
                    })
                  }
                />
                <label
                  htmlFor="travelAllowance"
                  className="text-sm cursor-pointer"
                >
                  Reiskostenvergoeding
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extraTimeOff"
                  checked={data.benefits?.extraTimeOff || false}
                  onCheckedChange={(checked) =>
                    onChange({
                      benefits: {
                        extraFixedPayment:
                          data.benefits?.extraFixedPayment ?? false,
                        extraVariablePayment:
                          data.benefits?.extraVariablePayment ?? false,
                        pensionPlan: data.benefits?.pensionPlan ?? false,
                        travelAllowance:
                          data.benefits?.travelAllowance ?? false,
                        extraTimeOff: checked as boolean,
                        stockPlan: data.benefits?.stockPlan ?? false,
                      },
                    })
                  }
                />
                <label
                  htmlFor="extraTimeOff"
                  className="text-sm cursor-pointer"
                >
                  Extra vakantiedagen
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extraVariablePayment"
                  checked={data.benefits?.extraVariablePayment || false}
                  onCheckedChange={(checked) =>
                    onChange({
                      benefits: {
                        extraFixedPayment:
                          data.benefits?.extraFixedPayment ?? false,
                        extraVariablePayment: checked as boolean,
                        pensionPlan: data.benefits?.pensionPlan ?? false,
                        travelAllowance:
                          data.benefits?.travelAllowance ?? false,
                        extraTimeOff: data.benefits?.extraTimeOff ?? false,
                        stockPlan: data.benefits?.stockPlan ?? false,
                      },
                    })
                  }
                />
                <label
                  htmlFor="extraVariablePayment"
                  className="text-sm cursor-pointer"
                >
                  Bonus / Variabel
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stockPlan"
                  checked={data.benefits?.stockPlan || false}
                  onCheckedChange={(checked) =>
                    onChange({
                      benefits: {
                        extraFixedPayment:
                          data.benefits?.extraFixedPayment ?? false,
                        extraVariablePayment:
                          data.benefits?.extraVariablePayment ?? false,
                        pensionPlan: data.benefits?.pensionPlan ?? false,
                        travelAllowance:
                          data.benefits?.travelAllowance ?? false,
                        extraTimeOff: data.benefits?.extraTimeOff ?? false,
                        stockPlan: checked as boolean,
                      },
                    })
                  }
                />
                <label htmlFor="stockPlan" className="text-sm cursor-pointer">
                  Aandelen
                </label>
              </div>
              {errors.benefits && (
                <p className="text-sm text-red-500 mt-1">{errors.benefits}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#F1592A]" />
          Sollicitatie
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="methode" className="mb-4">
              Sollicitatie methode <span className="text-red-500">*</span>
            </Label>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 ${errors.applicationMethod ? "border border-red-500 rounded-lg p-2" : ""}`}
            >
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  data.applicationMethod === "email"
                    ? "border-[#F1592A] bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => onChange({ applicationMethod: "email" })}
              >
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">
                  Direct solliciteren via email
                </p>
              </div>
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  data.applicationMethod === "external"
                    ? "border-[#F1592A] bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => onChange({ applicationMethod: "external" })}
              >
                <p className="font-medium">Externe link</p>
                <p className="text-sm text-gray-500">Verwijs naar eigen site</p>
              </div>
            </div>
          </div>

          {data.applicationMethod === "email" && (
            <div>
              <Label className={errors.applicationEmail ? "text-red-500" : ""}>
                Emailadres voor sollicitaties{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                placeholder="hr@bedrijf.nl"
                value={data.applicationEmail || ""}
                onChange={(e) => onChange({ applicationEmail: e.target.value })}
                className={errors.applicationEmail ? "border-red-500" : ""}
              />
              {errors.applicationEmail && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.applicationEmail}
                </p>
              )}
            </div>
          )}

          {data.applicationMethod === "external" && (
            <div>
              <Label className={errors.url ? "text-red-500" : ""}>
                URL naar sollicitatiepagina{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="url"
                placeholder="https://bedrijf.nl/vacatures/..."
                value={data.url || ""}
                onChange={(e) => onChange({ url: e.target.value })}
                className={errors.url ? "border-red-500" : ""}
              />
              {errors.url && (
                <p className="text-sm text-red-500 mt-1">{errors.url}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Tags & Categorieën</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="tags" className="mb-4">
              Tags (druk Enter om toe te voegen)
              {tagCount >= MAX_TAGS && (
                <span className="text-orange-500 text-xs">
                  {" "}
                  (max {MAX_TAGS})
                </span>
              )}
            </Label>
            <Input
              placeholder="Typ en druk Enter..."
              disabled={tagCount >= MAX_TAGS}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value) {
                    addTag(value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
              className="mt-2"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {data.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label
              htmlFor="niche"
              className={`${errors.niches ? "text-red-500" : ""} mb-3`}
            >
              Categorie <span className="text-red-500">*</span>
            </Label>
            <Select value={data.niche || ""} onValueChange={addNiche}>
              <SelectTrigger className={errors.niches ? "border-red-500" : ""}>
                <SelectValue placeholder="Kies een categorie" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(nicheSeo)
                  .filter((niche) => niche.slug !== "alle-vacatures")
                  .map((niche) => (
                    <SelectItem key={niche.slug} value={niche.slug}>
                      {niche.heading}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.niches && (
              <p className="text-sm text-red-500 mt-1">{errors.niches}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button
          type="submit"
          className="hover:bg-[#e04d1f] text-white min-w-[100px]"
        >
          Volgende stap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
