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
  Euro,
  FileText,
  Clock,
  Globe,
  ArrowRight,
  HelpCircle,
  X,
  Plus,
  GraduationCap,
} from "lucide-react";
import { LocationAutocomplete } from "@/components/location-autocomplete";
import type { Benefit, JobDetailsFormData } from "@/app/types-employer";
import type { Contract, Interval, Niche, Workplace } from "@/app/types";
import { nicheSeo } from "@/lib/niches";
import { ensureHttps, sanitizeInput } from "@/lib/utils";

interface JobDetailsFormProps {
  data: Partial<JobDetailsFormData>;
  onChange: (data: Partial<JobDetailsFormData>) => void;
  goToStep?: (slug: string) => void;
}

const BENEFIT_OPTIONS: { value: Benefit; label: string }[] = [
  { value: "extra_fixed_payment", label: "13e maand" },
  { value: "pension_plan", label: "Pensioen" },
  { value: "travel_allowance", label: "Reiskostenvergoeding" },
  { value: "extra_time_off", label: "Extra vakantiedagen" },
  { value: "extra_variable_payment", label: "Bonus / Variabel" },
];

const EDUCATION_OPTIONS = [
  { value: "none", label: "Geen vereiste" },
  { value: "primary", label: "Basisonderwijs" },
  { value: "secondary", label: "Voortgezet onderwijs" },
  { value: "vocational_training", label: "MBO" },
  { value: "higher_professional", label: "HBO" },
  { value: "university_bachelor", label: "WO Bachelor" },
  { value: "university_master", label: "WO Master" },
  { value: "doctorate", label: "Doctoraat" },
] as const;

export function JobDetailsForm({
  data,
  onChange,
  goToStep,
}: JobDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [keywordInput, setKeywordInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");

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
    if (!data.education) {
      newErrors.education = "Opleidingsniveau is verplicht";
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
      } else {
        const url = ensureHttps(data.url);
        if (url !== data.url) onChange({ url });
      }
    }

    if (!data.niches?.length) {
      newErrors.niches = "Selecteer minimaal 1 categorie";
    }

    if (!data.requirements?.length) {
      newErrors.requirements = "Voeg minimaal 1 functie-eis toe";
    }
    if (!data.responsibilities?.length) {
      newErrors.responsibilities = "Voeg minimaal 1 verantwoordelijkheid toe";
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
      goToStep?.("bedrijf");
    }
  };

  const toggleBenefit = (benefit: Benefit, checked: boolean) => {
    const current = data.benefits ?? [];
    const updated = checked
      ? [...current, benefit]
      : current.filter((b) => b !== benefit);
    onChange({ benefits: updated });
  };

  function getMethodCardClass(method: "email" | "external"): string {
    if (data.applicationMethod === method) {
      return "border-[#F1592A] bg-orange-50";
    }
    if (errors.applicationMethod) {
      return "border-red-500 hover:border-red-400";
    }
    return "border-gray-200 hover:border-gray-300";
  }

  const MAX_KEYWORDS = 20;

  const addKeyword = (keyword: string) => {
    const current = data.keywords || [];
    if (current.length >= MAX_KEYWORDS) return;
    const sanitized = sanitizeInput(keyword);
    if (sanitized && !current.includes(sanitized)) {
      onChange({ keywords: [...current, sanitized] });
    }
  };

  const removeKeyword = (keyword: string) => {
    const current = data.keywords || [];
    onChange({ keywords: current.filter((k) => k !== keyword) });
  };

  const keywordCount = data.keywords?.length || 0;

  const addListItem = (
    field: "requirements" | "responsibilities",
    value: string,
  ) => {
    const current = data[field] || [];
    if (current.length >= 20) return;
    const sanitized = sanitizeInput(value);
    if (sanitized && !current.includes(sanitized)) {
      onChange({ [field]: [...current, sanitized] });
      clearError(field);
    }
  };

  const removeListItem = (
    field: "requirements" | "responsibilities",
    value: string,
  ) => {
    const current = data[field] || [];
    onChange({ [field]: current.filter((item) => item !== value) });
  };

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
              <LocationAutocomplete
                value={data.city || ""}
                onChange={(val) => {
                  onChange({ city: val });
                  if (val.trim()) clearError("city");
                }}
                error={!!errors.city}
                showCount={false}
              />
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

          <div>
            <Label className="mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#F1592A]" />
                Opleidingsniveau <span className="text-red-500">*</span>
              </div>
            </Label>
            <Select
              value={data.education || ""}
              onValueChange={(value) => {
                onChange({ education: value });
                clearError("education");
              }}
            >
              <SelectTrigger
                className={errors.education ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Kies opleidingsniveau" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.education && (
              <p className="text-sm text-red-500 mt-1">{errors.education}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="salaris-van" className="mb-4">
                Salaris van (&euro;) <span className="text-red-500">*</span>
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
                        ...data.salary,
                        min: Math.max(0, Number(e.target.value)),
                      } as JobDetailsFormData["salary"],
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
                Salaris tot (&euro;) <span className="text-red-500">*</span>
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
                        ...data.salary,
                        max: Math.max(0, Number(e.target.value)),
                      } as JobDetailsFormData["salary"],
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
              <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-blue-900">
                  Transparant salaris verhoogt respons
                </p>
                <p className="text-sm text-blue-800">
                  Vacatures met een vast salaris krijgen gemiddeld 40% meer
                  reacties.
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
                placeholder=""
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
                placeholder=""
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
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              {BENEFIT_OPTIONS.map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={value}
                    checked={data.benefits?.includes(value) ?? false}
                    onCheckedChange={(checked) =>
                      toggleBenefit(value, !!checked)
                    }
                  />
                  <label htmlFor={value} className="text-sm cursor-pointer">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#F1592A]" />
          Functie-eisen & Verantwoordelijkheden
        </h2>

        <div className="space-y-6">
          <div>
            <Label
              className={`${errors.requirements ? "text-red-500" : ""} mb-4`}
            >
              Functie-eisen <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Bijv. 3+ jaar ervaring met TypeScript"
                value={requirementInput}
                disabled={(data.requirements?.length ?? 0) >= 20}
                onChange={(e) => setRequirementInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = requirementInput.trim();
                    if (value) {
                      addListItem("requirements", value);
                      setRequirementInput("");
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={(data.requirements?.length ?? 0) >= 20}
                onClick={() => {
                  const value = requirementInput.trim();
                  if (value) {
                    addListItem("requirements", value);
                    setRequirementInput("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <ul className="space-y-2 mt-2">
              {data.requirements?.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeListItem("requirements", item)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
            {errors.requirements && (
              <p className="text-sm text-red-500 mt-1">{errors.requirements}</p>
            )}
          </div>

          <div>
            <Label
              className={`${errors.responsibilities ? "text-red-500" : ""} mb-4`}
            >
              Verantwoordelijkheden <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Bijv. Ontwikkelen van nieuwe features"
                value={responsibilityInput}
                disabled={(data.responsibilities?.length ?? 0) >= 20}
                onChange={(e) => setResponsibilityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = responsibilityInput.trim();
                    if (value) {
                      addListItem("responsibilities", value);
                      setResponsibilityInput("");
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={(data.responsibilities?.length ?? 0) >= 20}
                onClick={() => {
                  const value = responsibilityInput.trim();
                  if (value) {
                    addListItem("responsibilities", value);
                    setResponsibilityInput("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <ul className="space-y-2 mt-2">
              {data.responsibilities?.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeListItem("responsibilities", item)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
            {errors.responsibilities && (
              <p className="text-sm text-red-500 mt-1">
                {errors.responsibilities}
              </p>
            )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${getMethodCardClass("email")}`}
                onClick={() => {
                  onChange({ applicationMethod: "email" });
                  clearError("applicationMethod");
                }}
              >
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">
                  Direct solliciteren via email
                </p>
              </div>
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${getMethodCardClass("external")}`}
                onClick={() => {
                  onChange({ applicationMethod: "external" });
                  clearError("applicationMethod");
                }}
              >
                <p className="font-medium">Externe link</p>
                <p className="text-sm text-gray-500">Verwijs naar eigen site</p>
              </div>
            </div>
            {errors.applicationMethod && (
              <p className="text-sm text-red-500 mt-1">
                {errors.applicationMethod}
              </p>
            )}
          </div>

          {data.applicationMethod === "email" && (
            <div>
              <Label
                className={`${errors.applicationEmail ? "text-red-500" : ""} mb-4`}
              >
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
              <Label className={`${errors.url ? "text-red-500" : ""} mb-4`}>
                URL naar sollicitatiepagina{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
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
        <h2 className="text-xl font-semibold mb-4">Keywords & Categorieën</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="keywords" className="mb-4">
              Keywords (druk Enter om toe te voegen)
              {keywordCount >= MAX_KEYWORDS && (
                <span className="text-orange-500 text-xs">
                  {" "}
                  (max {MAX_KEYWORDS})
                </span>
              )}
            </Label>
            <Input
              placeholder="Typ en druk Enter..."
              disabled={keywordCount >= MAX_KEYWORDS}
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = keywordInput.trim();
                  if (value) {
                    addKeyword(value);
                    setKeywordInput("");
                  }
                }
              }}
              className="mt-2"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {data.keywords?.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword}
                  <X className="w-3 h-3 hover:text-red-500" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label
              htmlFor="niches"
              className={`${errors.niches ? "text-red-500" : ""} mb-3`}
            >
              Categorieën (max 10) <span className="text-red-500">*</span>
            </Label>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              {Object.entries(nicheSeo)
                .filter(([key]) => key !== "unknown")
                .map(([key, niche]) => {
                  if (niche.slug === "alle-vacatures") return null;
                  const selected = data.niches?.includes(key as Niche) ?? false;
                  const atMax = (data.niches?.length ?? 0) >= 10;
                  return (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`niche-${key}`}
                        checked={selected}
                        disabled={!selected && atMax}
                        onCheckedChange={(checked) => {
                          const current = data.niches ?? [];
                          const updated = checked
                            ? [...current, key as Niche]
                            : current.filter((n) => n !== key);
                          onChange({ niches: updated });
                          if (updated.length > 0) clearError("niches");
                        }}
                      />
                      <label
                        htmlFor={`niche-${key}`}
                        className={`text-sm cursor-pointer ${!selected && atMax ? "text-gray-400" : ""}`}
                      >
                        {niche.heading}
                      </label>
                    </div>
                  );
                })}
            </div>
            {errors.niches && (
              <p className="text-sm text-red-500 mt-1">{errors.niches}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button
          type="submit"
          className="hover:bg-[#e04d1f] text-white min-w-25"
        >
          Volgende stap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
