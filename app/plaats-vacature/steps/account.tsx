"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Building,
  CreditCard,
  Check,
  Loader2,
} from "lucide-react";
import { AccountFormData, PricingPlan } from "@/app/types-employer";

interface AccountStepProps {
  data: Partial<AccountFormData>;
  onChange: (data: Partial<AccountFormData>) => void;
  isLoading: boolean;
}

export function AccountStep({ data, onChange, isLoading }: AccountStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName?.trim()) {
      newErrors.firstName = "Voornaam is verplicht";
    }
    if (!data.lastName?.trim()) {
      newErrors.lastName = "Achternaam is verplicht";
    }
    if (!data.email?.trim()) {
      newErrors.email = "Email is verplicht";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Ongeldig emailadres";
    }
    if (!data.password || data.password.length < 8) {
      newErrors.password = "Wachtwoord moet minimaal 8 tekens zijn";
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Wachtwoorden komen niet overeen";
    }
    if (!data.termsAccepted) {
      newErrors.termsAccepted = "Je moet akkoord gaan met de voorwaarden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.location.href = "/dashboard?new=true";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <User className="w-5 h-5 text-[#F1592A]" />
          Account aanmaken
        </h2>
        <p className="text-gray-600">
          Maak een account aan om je vacature te publiceren en toegang te
          krijgen tot je dashboard.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">
              Voornaam <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="firstName"
                placeholder="Jan"
                value={data.firstName || ""}
                onChange={(e) => onChange({ firstName: e.target.value })}
                className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">
              Achternaam <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Jansen"
              value={data.lastName || ""}
              onChange={(e) => onChange({ lastName: e.target.value })}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">
            Emailadres <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="jan@bedrijf.nl"
              value={data.email || ""}
              onChange={(e) => onChange({ email: e.target.value })}
              className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="companyName">Bedrijfsnaam</Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="companyName"
              placeholder="Acme B.V."
              value={data.companyName || ""}
              onChange={(e) => onChange({ companyName: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">
              Wachtwoord <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Minimaal 8 tekens"
                value={data.password || ""}
                onChange={(e) => onChange({ password: e.target.value })}
                className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">
              Wachtwoord bevestigen <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Herhaal wachtwoord"
              value={data.confirmPassword || ""}
              onChange={(e) => onChange({ confirmPassword: e.target.value })}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            id="showInvoice"
            checked={showInvoiceDetails}
            onCheckedChange={(checked) =>
              setShowInvoiceDetails(checked as boolean)
            }
          />
          <label
            htmlFor="showInvoice"
            className="text-sm cursor-pointer font-medium"
          >
            Ik wil een factuur met BTW
          </label>
        </div>

        {showInvoiceDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="md:col-span-2">
              <Label htmlFor="invoiceCompanyName">
                Factuur naam (bedrijfsnaam)
              </Label>
              <Input
                id="invoiceCompanyName"
                placeholder="Acme B.V."
                value={data.invoiceDetails?.companyName || ""}
                onChange={(e) =>
                  onChange({
                    invoiceDetails: {
                      ...data.invoiceDetails,
                      companyName: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="vatNumber">BTW-nummer</Label>
              <Input
                id="vatNumber"
                placeholder="NL123456789B01"
                value={data.invoiceDetails?.vatNumber || ""}
                onChange={(e) =>
                  onChange({
                    invoiceDetails: {
                      ...data.invoiceDetails,
                      vatNumber: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="invoicePostalCode">Postcode</Label>
              <Input
                id="invoicePostalCode"
                placeholder="1234 AB"
                value={data.invoiceDetails?.postalCode || ""}
                onChange={(e) =>
                  onChange({
                    invoiceDetails: {
                      ...data.invoiceDetails,
                      postalCode: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="invoiceAddress">Adres</Label>
              <Input
                id="invoiceAddress"
                placeholder="Straatnaam 123"
                value={data.invoiceDetails?.address || ""}
                onChange={(e) =>
                  onChange({
                    invoiceDetails: {
                      ...data.invoiceDetails,
                      address: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="invoiceCity">Plaats</Label>
              <Input
                id="invoiceCity"
                placeholder="Amsterdam"
                value={data.invoiceDetails?.city || ""}
                onChange={(e) =>
                  onChange({
                    invoiceDetails: {
                      ...data.invoiceDetails,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="invoiceCountry">Land</Label>
              <Input
                id="invoiceCountry"
                placeholder="Nederland"
                value={data.invoiceDetails?.country || ""}
                onChange={(e) =>
                  onChange({
                    invoiceDetails: {
                      ...data.invoiceDetails,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <Checkbox
            id="termsAccepted"
            checked={data.termsAccepted || false}
            onCheckedChange={(checked) =>
              onChange({ termsAccepted: checked as boolean })
            }
          />
          <label htmlFor="termsAccepted" className="text-sm cursor-pointer">
            Ik ga akkoord met de{" "}
            <a
              href="/algemene-voorwaarden"
              className="text-[#F1592A] underline"
            >
              algemene voorwaarden
            </a>{" "}
            en{" "}
            <a href="/privacy" className="text-[#F1592A] underline">
              privacybeleid
            </a>
            . <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-sm text-red-500">{errors.termsAccepted}</p>
        )}

        <div className="flex items-start gap-2">
          <Checkbox
            id="newsletter"
            checked={data.newsletter || false}
            onCheckedChange={(checked) =>
              onChange({ newsletter: checked as boolean })
            }
          />
          <label htmlFor="newsletter" className="text-sm cursor-pointer">
            Ja, ik wil de nieuwsbrief ontvangen met tips en vacature-updates
          </label>
        </div>
      </div>

      <div className="bg-[#F1592A]/5 border border-[#F1592A]/20 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Bestellingsoverzicht</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Pakket:</span>
            <span className="font-medium">Enkele vacature</span>
          </div>
          <div className="flex justify-between">
            <span>Looptijd:</span>
            <span>30 dagen</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotaal:</span>
            <span>€299,00</span>
          </div>
          <div className="flex justify-between">
            <span>BTW (21%):</span>
            <span>€62,79</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Totaal:</span>
            <span>€361,79</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <CreditCard className="w-4 h-4" />
          <span>iDEAL</span>
        </div>
        <div className="flex items-center gap-1">
          <Check className="w-4 h-4" />
          <span>Veilig betalen</span>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => (window.location.href = "/plaats-vacature/prijzen")}
          disabled={isLoading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vorige
        </Button>
        <Button
          type="submit"
          className="bg-[#F1592A] hover:bg-[#e04d1f] text-white min-w-[250px]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verwerken...
            </>
          ) : (
            <>Account aanmaken & betalen</>
          )}
        </Button>
      </div>
    </form>
  );
}
