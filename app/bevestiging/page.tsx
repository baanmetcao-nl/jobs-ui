"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Mail, ArrowRight, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentStatus = "loading" | "success" | "failed";

function BevestigingContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>("loading");

  const redirectStatus = searchParams.get("redirect_status");
  const paymentIntentId = searchParams.get("payment_intent");

  useEffect(() => {
    if (!paymentIntentId) {
      setStatus("failed");
      return;
    }

    if (redirectStatus === "succeeded") {
      setStatus("success");
      try {
        localStorage.removeItem("job-posting-flow");
      } catch {}
    } else if (redirectStatus === "failed") {
      setStatus("failed");
    } else {
      setStatus("loading");
    }
  }, [redirectStatus, paymentIntentId]);

  if (status === "loading") {
    return (
      <div className="text-center py-16 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#F1592A] mx-auto" />
        <p className="text-gray-500">Betaling wordt verwerkt...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Betaling mislukt
          </h1>
          <p className="text-gray-600">
            Er is iets misgegaan met de betaling. Je wordt niet in rekening
            gebracht. Probeer het opnieuw.
          </p>
        </div>
        <Button
          asChild
          className="bg-[#F1592A] hover:bg-[#e04d1f] text-white w-full"
        >
          <Link href="/plaats-vacature/account">Opnieuw proberen</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Betaling geslaagd!
          </h1>
          <p className="text-gray-600">
            Je vacature wordt zo snel mogelijk gepubliceerd op BaanmetCAO.
          </p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-[#F1592A] mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-sm text-gray-900 mb-1">
              Controleer je e-mail
            </p>
            <p className="text-sm text-gray-600">
              We hebben een e-mail gestuurd met een link om je wachtwoord in te
              stellen en je account te activeren.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          asChild
          className="w-full bg-[#F1592A] hover:bg-[#e04d1f] text-white"
        >
          <Link href="/dashboard">
            Naar je dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Terug naar BaanmetCAO</Link>
        </Button>
      </div>

      <p className="text-xs text-center text-gray-400">
        Betalingskenmerk: {paymentIntentId}
      </p>
    </div>
  );
}

export default function BevestigingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <Suspense
          fallback={
            <div className="text-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-[#F1592A] mx-auto" />
            </div>
          }
        >
          <BevestigingContent />
        </Suspense>
      </div>
    </div>
  );
}
