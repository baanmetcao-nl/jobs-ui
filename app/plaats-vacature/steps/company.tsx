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
  Users,
  Calendar,
} from "lucide-react";
import { CompanyFormData } from "@/app/types-employer";

interface CompanyFormProps {
  data: Partial<CompanyFormData>;
  onChange: (data: Partial<CompanyFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function sanitizeInput(input: string): string {
  return input.replace(/</g, "<").replace(/>/g, ">");
}

export function CompanyForm({
  data,
  onChange,
  onNext,
  onBack,
}: CompanyFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.name?.trim()) {
      newErrors.name = "Bedrijfsnaam is verplicht";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNext();
    }
  };

  const companySizes = [
    { value: "1-10", label: "1-10 medewerkers" },
    { value: "11-50", label: "11-50 medewerkers" },
    { value: "51-200", label: "51-200 medewerkers" },
    { value: "201-500", label: "201-500 medewerkers" },
    { value: "501-1000", label: "501-1000 medewerkers" },
    { value: "1000+", label: "1000+ medewerkers" },
  ];

  const industries = [
    "Technologie",
    "Finance & Banken",
    "Healthcare",
    "Onderwijs",
    "Overheid",
    "Retail & E-commerce",
    "Manufacturing",
    "Logistiek & Transport",
    "Media & Communicatie",
    "Consulting",
    "Non-profit",
    "Real Estate",
    "Energie & Utilities",
    "Farmacie",
    "Overig",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#F1592A]" />
          Bedrijfsgegevens
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">
              Bedrijfsnaam <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Bijv. Acme B.V."
              value={data.name || ""}
              onChange={(e) => onChange({ name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="bio">Over het bedrijf</Label>
            <Textarea
              id="bio"
              placeholder="Vertel iets over je bedrijf, cultuur en werkomgeving..."
              value={data.bio || ""}
              onChange={(e) => onChange({ bio: e.target.value })}
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">
              Een goede beschrijving helpt om talent aan te trekken
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="website"
                  type="url"
                  placeholder="https://bedrijf.nl"
                  value={data.website || ""}
                  onChange={(e) => onChange({ website: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Bedrijfsgrootte</Label>
              <Select
                value={data.size || ""}
                onValueChange={(value) => onChange({ size: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kies grootte" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Branche</Label>
              <Select
                value={data.industry || ""}
                onValueChange={(value) => onChange({ industry: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kies branche" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Locatie (hoofdkantoor)</Label>
              <Input
                id="location"
                placeholder="Bijv. Amsterdam"
                value={data.location || ""}
                onChange={(e) => onChange({ location: e.target.value })}
              />
            </div>
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
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            onBack();
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vorige
        </Button>
        <Button
          type="submit"
          className="bg-[#F1592A] hover:bg-[#e04d1f] text-white min-w-[200px]"
        >
          Volgende stap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
