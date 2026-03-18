"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Upload,
  Globe,
} from "lucide-react";
import { CompanyFormData } from "@/app/types-employer";
import { ensureHttps, sanitizeInput } from "@/lib/utils";

interface CompanyFormProps {
  data: Partial<CompanyFormData>;
  onChange: (data: Partial<CompanyFormData>) => void;
  goToStep?: (slug: string) => void;
}

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 medewerkers" },
  { value: "11-50", label: "11-50 medewerkers" },
  { value: "51-200", label: "51-200 medewerkers" },
  { value: "201-500", label: "201-500 medewerkers" },
  { value: "501-1000", label: "501-1000 medewerkers" },
  { value: "1000+", label: "1000+ medewerkers" },
];

export function CompanyForm({ data, onChange, goToStep }: CompanyFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const bioLength = (data.bio || "").length;

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.name?.trim() || data.name.trim().length < 2) {
      newErrors.name = "Bedrijfsnaam is verplicht en minimaal 2 tekens";
    }

    if (!data.bio?.trim()) {
      newErrors.bio = "Beschrijving over het bedrijf is verplicht";
    } else if (data.bio.length > 500) {
      newErrors.bio = "Beschrijving mag maximaal 500 tekens bevatten";
    }

    if (!data.location?.trim() || data.location.trim().length < 2) {
      newErrors.location = "Locatie is verplicht en minimaal 2 tekens";
    }

    if (data.website?.trim()) {
      const website = ensureHttps(data.website);
      if (website !== data.website) onChange({ website });
      try {
        new URL(website);
      } catch {
        newErrors.website = "Ongeldige website URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      goToStep?.("preview");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#F1592A]" />
          Bedrijfsgegevens
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Bedrijfsnaam <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Bijv. Acme B.V."
              value={data.name || ""}
              onChange={(e) => {
                onChange({ name: sanitizeInput(e.target.value) });
                if (e.target.value.trim().length >= 2) clearError("name");
              }}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="bio" className="mb-2">
              Over het bedrijf <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="bio"
              placeholder="Vertel iets over je bedrijf, cultuur en werkomgeving..."
              value={data.bio || ""}
              onChange={(e) => {
                const value = sanitizeInput(e.target.value.slice(0, 500));
                onChange({ bio: value });
                if (value.trim()) clearError("bio");
              }}
              className={errors.bio ? "border-red-500" : ""}
              rows={4}
            />
            <div className="flex justify-between text-xs mt-1">
              <p className={errors.bio ? "text-red-500" : "text-gray-500"}>
                Een goede beschrijving helpt om talent aan te trekken
              </p>
              <p className={bioLength > 500 ? "text-red-500" : "text-gray-500"}>
                {bioLength}/500
              </p>
            </div>
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website" className="mb-2">
                Website
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="website"
                  type="text"
                  placeholder="bedrijf.nl"
                  value={data.website || ""}
                  onChange={(e) => {
                    onChange({ website: sanitizeInput(e.target.value) });
                    clearError("website");
                  }}
                  className={`pl-10 ${errors.website ? "border-red-500" : ""}`}
                />
              </div>
              {errors.website && (
                <p className="text-sm text-red-500 mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <Label className="mb-2">Bedrijfsgrootte</Label>
              <Select
                value={data.size || ""}
                onValueChange={(value) => onChange({ size: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kies grootte" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="mb-2">
              Locatie (hoofdkantoor) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              placeholder="Bijv. Amsterdam"
              value={data.location || ""}
              onChange={(e) => {
                onChange({ location: sanitizeInput(e.target.value) });
                if (e.target.value.trim().length >= 2) clearError("location");
              }}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">{errors.location}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#F1592A]" />
          Bedrijfslogo
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#F1592A] transition-colors cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {data.logoUrl ? (
                <img
                  src={data.logoUrl}
                  alt="Logo preview"
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="font-medium text-gray-900">
              Klik om logo te uploaden
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG of SVG. Max 2MB.
            </p>
          </div>
        </div>

        {data.logoUrl && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange({ logoUrl: "" })}
            >
              Verwijder logo
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">
          💡 Waarom bedrijfsinformatie belangrijk is
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • 95% van de werkzoekenden zoekt informatie over het bedrijf voordat
            ze solliciteren
          </li>
          <li>
            • Een compleet bedrijfsprofiel verhoogt de vacatureviews met 30%
          </li>
          <li>
            • Werkzoekenden solliciteren vaker naar bedrijven met een duidelijke
            presentatie
          </li>
        </ul>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => goToStep?.("vacature")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vorige
        </Button>
        <Button
          type="submit"
          className="hover:bg-[#e04d1f] text-white min-w-[100px] outline"
        >
          Volgende stap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
