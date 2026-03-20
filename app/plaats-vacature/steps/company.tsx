"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Upload,
  Globe,
  Mail,
  Loader2,
  X,
} from "lucide-react";
import { CompanyFormData } from "@/app/types-employer";
import { ensureHttps, sanitizeInput } from "@/lib/utils";

interface CompanyFormProps {
  data: Partial<CompanyFormData>;
  onChange: (data: Partial<CompanyFormData>) => void;
  goToStep?: (slug: string) => void;
}

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function CompanyForm({ data, onChange, goToStep }: CompanyFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    } else if (data.bio.length < 300) {
      newErrors.bio = "Beschrijving moet minimaal 300 tekens bevatten";
    } else if (data.bio.length > 600) {
      newErrors.bio = "Beschrijving mag maximaal 600 tekens bevatten";
    }

    if (!data.email?.trim()) {
      newErrors.email = "E-mailadres is verplicht";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Voer een geldig e-mailadres in";
    }

    if (!data.url?.trim()) {
      newErrors.url = "Website is verplicht";
    } else {
      const url = ensureHttps(data.url);
      if (url !== data.url) onChange({ url });
      try {
        new URL(url);
      } catch {
        newErrors.url = "Ongeldige website URL";
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

  const handleFileSelect = async (file: File) => {
    setUploadError("");

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setUploadError("Ongeldig bestandstype. Gebruik PNG, JPG, SVG, WebP of GIF.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("Bestand is te groot. Maximaal 5MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload mislukt");
      }

      const { id, url } = await res.json();
      onChange({ logoFileId: id, logoPreviewUrl: url });
    } catch {
      setUploadError("Logo uploaden mislukt. Probeer opnieuw.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
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
              placeholder="Vertel iets over je bedrijf, cultuur en werkomgeving (minimaal 300 tekens)..."
              value={data.bio || ""}
              onChange={(e) => {
                const value = sanitizeInput(e.target.value.slice(0, 600));
                onChange({ bio: value });
                if (value.trim().length >= 300) clearError("bio");
              }}
              className={errors.bio ? "border-red-500" : ""}
              rows={4}
            />
            <div className="flex justify-between text-xs mt-1">
              <p className={errors.bio ? "text-red-500" : "text-gray-500"}>
                Een goede beschrijving helpt om talent aan te trekken
              </p>
              <p
                className={
                  bioLength < 300 || bioLength > 600
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                {bioLength}/600
              </p>
            </div>
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="mb-2">
              E-mailadres <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="info@bedrijf.nl"
                value={data.email || ""}
                onChange={(e) => {
                  onChange({ email: sanitizeInput(e.target.value) });
                  clearError("email");
                }}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="url" className="mb-2">
              Website <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="url"
                type="text"
                placeholder="bedrijf.nl"
                value={data.url || ""}
                onChange={(e) => {
                  onChange({ url: sanitizeInput(e.target.value) });
                  clearError("url");
                }}
                className={`pl-10 ${errors.url ? "border-red-500" : ""}`}
              />
            </div>
            {errors.url && (
              <p className="text-sm text-red-500 mt-1">{errors.url}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#F1592A]" />
          Bedrijfslogo
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES.join(",")}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
            e.target.value = "";
          }}
        />

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#F1592A] transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {uploading ? (
                <Loader2 className="w-8 h-8 text-[#F1592A] animate-spin" />
              ) : data.logoPreviewUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={data.logoPreviewUrl}
                  alt="Logo preview"
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="font-medium text-gray-900">
              {uploading ? "Uploaden..." : "Klik of sleep om logo te uploaden"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, SVG, WebP of GIF. Max 5MB.
            </p>
          </div>
        </div>

        {uploadError && (
          <p className="text-sm text-red-500 mt-2">{uploadError}</p>
        )}

        {data.logoPreviewUrl && !uploading && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange({ logoFileId: undefined, logoPreviewUrl: undefined })
              }
            >
              <X className="w-4 h-4 mr-1" />
              Verwijder logo
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">
          Waarom bedrijfsinformatie belangrijk is
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            95% van de werkzoekenden zoekt informatie over het bedrijf voordat
            ze solliciteren
          </li>
          <li>
            Een compleet bedrijfsprofiel verhoogt de vacatureviews met 30%
          </li>
          <li>
            Werkzoekenden solliciteren vaker naar bedrijven met een duidelijke
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
          className="hover:bg-[#e04d1f] text-white min-w-25 outline"
        >
          Volgende stap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
