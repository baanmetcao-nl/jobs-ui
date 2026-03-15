"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  Lock,
  Loader2,
  CreditCard,
} from "lucide-react";
import { AccountFormData, PricingPlan, FEATURED_PRICE } from "@/app/types-employer";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const stripeAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#F1592A",
    colorBackground: "#ffffff",
    colorText: "#111827",
    colorDanger: "#ef4444",
    borderRadius: "8px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
};

const stripeFonts = [
  {
    cssSrc:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
  },
];

interface AccountStepProps {
  data: Partial<AccountFormData>;
  onChange: (data: Partial<AccountFormData>) => void;
  selectedPlan: PricingPlan | null;
  featured: boolean;
  goToStep?: (slug: string) => void;
}

function OrderSummary({ selectedPlan, featured }: { selectedPlan: PricingPlan | null; featured: boolean }) {
  const planPrice = selectedPlan?.price ?? 199;
  const featuredTotal = featured ? FEATURED_PRICE * (selectedPlan?.jobCount ?? 1) : 0;
  const subtotal = planPrice + featuredTotal;
  const vatAmount = subtotal * 0.21;
  const totalAmount = subtotal + vatAmount;
  const fmt = (n: number) =>
    n.toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-5">
      <h3 className="font-semibold text-gray-900">Bestellingsoverzicht</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Pakket</span>
          <span className="font-medium">
            {selectedPlan?.name ?? "Enkele vacature"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Looptijd</span>
          <span>{selectedPlan?.durationDays ?? 60} dagen</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pakketprijs</span>
          <span>€{fmt(planPrice)}</span>
        </div>
        {featured && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Uitgelicht ({selectedPlan?.jobCount ?? 1}x €{FEATURED_PRICE})
            </span>
            <span>€{fmt(featuredTotal)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">BTW (21%)</span>
          <span>€{fmt(vatAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-200 mt-1">
          <span>Totaal</span>
          <span className="text-[#F1592A]">€{fmt(totalAmount)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
          <span>Veilig betalen via Stripe</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <RotateCcw className="w-4 h-4 text-blue-500 shrink-0" />
          <span>Niet tevreden? Geld terug binnen 7 dagen</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4 text-gray-400 shrink-0" />
          <span>256-bit SSL versleuteling</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4 text-gray-400 shrink-0" />
          <span>iDEAL, Visa, Mastercard en meer</span>
        </div>
      </div>
    </div>
  );
}

interface CheckoutFormProps {
  data: Partial<AccountFormData>;
  onChange: (data: Partial<AccountFormData>) => void;
  selectedPlan: PricingPlan | null;
  featured: boolean;
  paymentIntentId: string;
  goToStep?: (slug: string) => void;
}

function CheckoutForm({
  data,
  onChange,
  selectedPlan,
  featured,
  paymentIntentId,
  goToStep,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stripeError, setStripeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const planPrice = selectedPlan?.price ?? 199;
  const featuredTotal = featured ? FEATURED_PRICE * (selectedPlan?.jobCount ?? 1) : 0;
  const totalAmount = (planPrice + featuredTotal) * 1.21;
  const fmt = (n: number) =>
    n.toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.firstName?.trim()) newErrors.firstName = "Voornaam is verplicht";
    if (!data.lastName?.trim()) newErrors.lastName = "Achternaam is verplicht";
    if (!data.email?.trim()) {
      newErrors.email = "Email is verplicht";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Ongeldig emailadres";
    }
    if (!data.companyName?.trim())
      newErrors.companyName = "Bedrijfsnaam is verplicht";
    if (!data.termsAccepted)
      newErrors.termsAccepted = "Je moet akkoord gaan met de voorwaarden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !validate()) return;

    setIsLoading(true);
    setStripeError("");

    try {
      await fetch("/api/update-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          companyName: data.companyName,
        }),
      });
    } catch {
      // Non-critical — webhook will still process payment
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/bevestiging`,
        payment_method_data: {
          billing_details: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email ?? undefined,
          },
        },
      },
    });

    if (error) {
      setStripeError(
        error.message ?? "Er ging iets mis bij de betaling. Probeer opnieuw.",
      );
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Jouw gegevens
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="mb-2">
                Voornaam <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Jan"
                value={data.firstName || ""}
                onChange={(e) => {
                  onChange({ firstName: e.target.value });
                  if (e.target.value.trim()) clearError("firstName");
                }}
                className={errors.firstName ? "border-red-500" : ""}
              />
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
              E-mailadres <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jan@bedrijf.nl"
              value={data.email || ""}
              onChange={(e) => {
                onChange({ email: e.target.value });
                clearError("email");
              }}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              We sturen een activatielink naar dit adres om je account in te
              stellen.
            </p>
          </div>

          <div>
            <Label htmlFor="companyName" className="mb-2">
              Bedrijfsnaam <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              placeholder="Acme B.V."
              value={data.companyName || ""}
              onChange={(e) => {
                onChange({ companyName: e.target.value });
                if (e.target.value.trim()) clearError("companyName");
              }}
              className={errors.companyName ? "border-red-500" : ""}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Betaalmethode
        </h3>
        <PaymentElement
          options={{
            layout: "tabs",
            paymentMethodOrder: ["ideal", "card", "bancontact"],
            defaultValues: {
              billingDetails: {
                email: data.email || undefined,
                name:
                  data.firstName && data.lastName
                    ? `${data.firstName} ${data.lastName}`
                    : undefined,
              },
            },
          }}
        />
      </div>

      <div className="space-y-3">
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
            Ja, ik wil tips en vacature-updates per e-mail ontvangen
          </label>
        </div>
      </div>

      {stripeError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {stripeError}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-4 border-t">
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
          disabled={!stripe || !elements || isLoading}
          className="bg-[#F1592A] hover:bg-[#e04d1f] text-white sm:min-w-[220px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verwerken...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Betaal €{fmt(totalAmount)}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function AccountStep({
  data,
  onChange,
  selectedPlan,
  featured,
  goToStep,
}: AccountStepProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [initError, setInitError] = useState("");

  useEffect(() => {
    if (!selectedPlan) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: selectedPlan.id }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.clientSecret) {
          setClientSecret(d.clientSecret);
          setPaymentIntentId(d.paymentIntentId);
        } else {
          setInitError("Kon betaling niet initialiseren. Probeer opnieuw.");
        }
      })
      .catch(() =>
        setInitError("Kon betaling niet initialiseren. Probeer opnieuw."),
      );
  }, [selectedPlan?.id]);

  if (initError) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-red-600">{initError}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Opnieuw proberen
        </Button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Betaling</h2>
        <p className="text-gray-500 text-sm">
          Bijna klaar — vul je gegevens in en kies je betaalmethode.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: stripeAppearance, fonts: stripeFonts }}
        >
          <CheckoutForm
            data={data}
            onChange={onChange}
            selectedPlan={selectedPlan}
            featured={featured}
            paymentIntentId={paymentIntentId}
            goToStep={goToStep}
          />
        </Elements>

        <div className="lg:sticky lg:top-8">
          <OrderSummary selectedPlan={selectedPlan} featured={featured} />
        </div>
      </div>
    </div>
  );
}
