"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Tag, Zap, Crown } from "lucide-react";
import { PRICING_PLANS, PricingPlan } from "@/app/types-employer";

interface PricingStepProps {
  selectedPlan: PricingPlan | null;
  onSelect: (plan: PricingPlan) => void;
  onBack: () => void;
}

export function PricingStep({
  selectedPlan,
  onSelect,
  onBack,
}: PricingStepProps) {
  const getIcon = (planId: string) => {
    switch (planId) {
      case "bundle3":
        return <Zap className="w-6 h-6" />;
      case "bundle10":
        return <Crown className="w-6 h-6" />;
      default:
        return <Tag className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#F1592A]" />
          Kies je pakket
        </h2>
        <p className="text-gray-600">
          Selecteer het pakket dat het beste bij je wensen past. Je kunt altijd
          uitbreiden.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative border-2 rounded-xl p-6 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#F1592A] bg-orange-50 shadow-lg"
                  : isPopular
                    ? "border-blue-200 hover:border-blue-300"
                    : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onSelect(plan)}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-3 py-1">
                    Meest gekozen
                  </Badge>
                </div>
              )}

              <div className="text-center mb-4">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    isPopular
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getIcon(plan.id)}
                </div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">€{plan.price}</span>
                  <span className="text-gray-500 text-sm"> excl. BTW</span>
                </div>
                {plan.savings && (
                  <p className="text-sm text-green-600 mt-1">
                    Je bespaart €{plan.savings}!
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  isSelected
                    ? "bg-[#F1592A] hover:bg-[#e04d1f] text-white"
                    : isPopular
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {isSelected ? "Geselecteerd" : "Kies dit pakket"}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">
          💡 Extra informatie
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>Alle pakketten zijn 30 dagen geldig vanaf publicatiedatum</li>
          <li>Verlengen kan altijd voor €99 per vacature</li>
          <li>Betaling via iDEAL, Bancontact of factuur (zakelijk)</li>
          <li>Btw wordt apart in rekening gebracht</li>
          <li>Niet tevreden? Volledige refund binnen 7 dagen</li>
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
      </div>
    </div>
  );
}
