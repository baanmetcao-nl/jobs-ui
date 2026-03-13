"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Mail, Lock, User, Building, Loader2 } from "lucide-react";
import { AccountFormData, PricingPlan } from "@/app/types-employer";

interface AccountStepProps {
  data: Partial<AccountFormData>;
  onChange: (data: Partial<AccountFormData>) => void;
  selectedPlan: PricingPlan | null;
  goToStep?: (slug: string) => void;
}

export function AccountStep({
  data,
  onChange,
  selectedPlan,
  goToStep,
}: AccountStepProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!data.companyName?.trim()) {
      newErrors.companyName = "Bedrijfsnaam is verplicht";
    }
    const passwordValid = data.password && data.password.length >= 8;
    if (!passwordValid) {
      newErrors.password = "Wachtwoord moet minimaal 8 tekens zijn";
    }
    if (passwordValid && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Wachtwoorden komen niet overeen";
    }
    if (!data.termsAccepted) {
      newErrors.termsAccepted = "Je moet akkoord gaan met de voorwaarden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        const saved = localStorage.getItem("job-posting-flow");
        if (saved) {
          const flow = JSON.parse(saved);
          localStorage.setItem(
            "new-job",
            JSON.stringify({
              title: flow.jobDetails?.title || "Nieuwe vacature",
              city: flow.jobDetails?.city || "",
              company: {
                name: flow.company?.name || "",
                logoUrl: flow.company?.logoUrl || "",
              },
              package:
                flow.pricing?.name || selectedPlan?.name || "Enkele vacature",
            }),
          );
        }
      } catch {}

      localStorage.removeItem("job-posting-flow");
      router.push("/dashboard?new=true");
    } finally {
      setIsLoading(false);
    }
  };

  const planPrice = selectedPlan?.price ?? 299;
  const vatAmount = planPrice * 0.21;
  const totalAmount = planPrice + vatAmount;
  const formatPrice = (amount: number) =>
    amount.toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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
            <Label htmlFor="firstName" className="mb-2">
              Voornaam <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="firstName"
                placeholder="Jan"
                value={data.firstName || ""}
                onChange={(e) => {
                  onChange({ firstName: e.target.value });
                  if (e.target.value.trim()) clearError("firstName");
                }}
                className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-2">
              Achternaam <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Jansen"
              value={data.lastName || ""}
              onChange={(e) => {
                onChange({ lastName: e.target.value });
                if (e.target.value.trim()) clearError("lastName");
              }}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="mb-2">
            Emailadres <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="jan@bedrijf.nl"
              value={data.email || ""}
              onChange={(e) => {
                onChange({ email: e.target.value });
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
          <Label htmlFor="companyName" className="mb-2">
            Bedrijfsnaam <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="companyName"
              placeholder="Acme B.V."
              value={data.companyName || ""}
              onChange={(e) => onChange({ companyName: e.target.value })}
              className={`pl-10 ${errors.companyName ? "border-red-500" : ""}`}
            />
          </div>
          {errors.companyName && (
            <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password" className="mb-2">
              Wachtwoord <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Minimaal 8 tekens"
                value={data.password || ""}
                onChange={(e) => {
                  onChange({ password: e.target.value });
                  if (e.target.value.length >= 8) clearError("password");
                }}
                className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="mb-2">
              Wachtwoord bevestigen <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Herhaal wachtwoord"
              value={data.confirmPassword || ""}
              onChange={(e) => {
                onChange({ confirmPassword: e.target.value });
                if (e.target.value === data.password)
                  clearError("confirmPassword");
              }}
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
        <div className="flex items-center gap-2 mb-2">
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
              <Label htmlFor="invoiceCompanyName" className="mb-2">
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
              <Label htmlFor="vatNumber" className="mb-2">
                BTW-nummer
              </Label>
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
              <Label htmlFor="invoicePostalCode" className="mb-2">
                Postcode
              </Label>
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
              <Label htmlFor="invoiceAddress" className="mb-2">
                Adres
              </Label>
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
              <Label htmlFor="invoiceCity" className="mb-2">
                Plaats
              </Label>
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
              <Label htmlFor="invoiceCountry" className="mb-2">
                Land
              </Label>
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
        <h3 className="font-semibold mb-2">Bestellingsoverzicht</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Pakket:</span>
            <span className="font-medium">
              {selectedPlan?.name ?? "Enkele vacature"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Looptijd:</span>
            <span>{selectedPlan?.durationDays ?? 30} dagen</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotaal:</span>
            <span>€{formatPrice(planPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>BTW (21%):</span>
            <span>€{formatPrice(vatAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Totaal:</span>
            <span>€{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        {/* iDEAL */}
        <div className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 bg-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="50" height="50" rx="6" fill="white" />
            <path d="M8 8h15c11 0 19 7 19 17s-8 17-19 17H8V8z" fill="#CC0066" />
            <path
              d="M13 13h10c7.5 0 13 5 13 12s-5.5 12-13 12H13V13z"
              fill="white"
            />
            <circle cx="20" cy="21" r="3" fill="#CC0066" />
            <rect
              x="13"
              y="26"
              width="20"
              height="2.5"
              rx="1.25"
              fill="#CC0066"
            />
          </svg>
          <span className="text-xs font-semibold text-[#CC0066]">iDEAL</span>
        </div>

        {/* Visa */}
        <div className="flex items-center border border-gray-200 rounded px-3 py-1.5 bg-white">
          <svg
            width="38"
            height="14"
            viewBox="0 0 38 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 1L11 13H8L11.5 1H14.5Z" fill="#1A1F71" />
            <path
              d="M25.5 1.2C24.7 0.9 23.5 0.6 22 0.6C18.5 0.6 16 2.4 16 5C16 7 17.8 8.1 19.2 8.7C20.6 9.4 21 9.8 21 10.4C21 11.3 19.9 11.7 18.9 11.7C17.5 11.7 16.7 11.5 15.5 11L15 10.8L14.5 13.5C15.5 14 17.2 14.3 19 14.3C22.7 14.3 25.2 12.5 25.2 9.7C25.2 8.2 24.2 7 22 6.1C20.8 5.5 20 5.1 20 4.4C20 3.8 20.7 3.2 22.2 3.2C23.5 3.2 24.4 3.5 25.1 3.8L25.5 4L25.5 1.2Z"
              fill="#1A1F71"
            />
            <path
              d="M30 1H27.3C26.5 1 25.9 1.3 25.6 2.1L20.5 13H24.2L25 10.8H29.4L29.9 13H33.2L30 1ZM26 8.2L27.8 3.4L28.8 8.2H26Z"
              fill="#1A1F71"
            />
            <path
              d="M11 1L7.5 9.5L7.1 7.5C6.4 5.4 4.4 3.1 2.2 2L5.4 13H9.1L14.7 1H11Z"
              fill="#1A1F71"
            />
            <path
              d="M4.2 1H0.1L0 1.2C3.2 2 5.4 3.9 6.3 6.3L5.3 2.1C5.1 1.3 4.7 1 4.2 1Z"
              fill="#F9A533"
            />
          </svg>
        </div>

        {/* Mastercard */}
        <div className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 bg-white">
          <svg
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="10" r="9" fill="#EB001B" />
            <circle cx="19" cy="10" r="9" fill="#F79E1B" />
            <path d="M15 3.5a9 9 0 0 1 0 13A9 9 0 0 1 15 3.5z" fill="#FF5F00" />
          </svg>
          <span className="text-xs font-medium text-gray-600">Mastercard</span>
        </div>

        <span className="text-xs text-gray-400">· Veilig betalen</span>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => goToStep?.("prijzen")}
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
