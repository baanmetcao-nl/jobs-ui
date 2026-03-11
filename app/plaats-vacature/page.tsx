"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressSteps } from "@/components/progress-steps";
import { JobDetailsForm } from "./steps/job-details";
import { CompanyForm } from "./steps/company";
import { PreviewStep } from "./steps/preview";
import { PricingStep } from "./steps/pricing";
import { AccountStep } from "./steps/account";
import {
  JOB_POSTING_STEPS,
  JobDetailsFormData,
  CompanyFormData,
  AccountFormData,
  PricingPlan,
} from "@/app/types-employer";

const DRAFT_STORAGE_KEY = "jobPostingDraft";

export default function PlaceJobPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [savedDraftId, setSavedDraftId] = useState<string | null>(null);

  const [jobData, setJobData] = useState<Partial<JobDetailsFormData>>({});
  const [companyData, setCompanyData] = useState<Partial<CompanyFormData>>({});
  const [pricing, setPricing] = useState<PricingPlan | null>(null);
  const [accountData, setAccountData] = useState<Partial<AccountFormData>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.jobData && typeof parsed.jobData === "object") {
          setJobData(parsed.jobData);
        }
        if (parsed.companyData && typeof parsed.companyData === "object") {
          setCompanyData(parsed.companyData);
        }
        if (parsed.pricing && typeof parsed.pricing === "object") {
          setPricing(parsed.pricing);
        }
        if (parsed.accountData && typeof parsed.accountData === "object") {
          setAccountData(parsed.accountData);
        }
        if (typeof parsed.draftId === "string") {
          setSavedDraftId(parsed.draftId);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const draftData = {
      jobData,
      companyData,
      pricing,
      accountData,
      draftId: savedDraftId,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
  }, [jobData, companyData, pricing, accountData, savedDraftId]);

  const updateJobData = (data: Partial<JobDetailsFormData>): void => {
    setJobData((prev) => ({ ...prev, ...data }));
  };

  const updateCompanyData = (data: Partial<CompanyFormData>): void => {
    setCompanyData((prev) => ({ ...prev, ...data }));
  };

  const updateAccountData = (data: Partial<AccountFormData>): void => {
    setAccountData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = (): void => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async (): Promise<void> => {
    setIsLoading(true);
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      router.push("/dashboard?new=true");
    } catch {
      // Handle error silently
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = (): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <JobDetailsForm
            data={jobData}
            onChange={updateJobData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <CompanyForm
            data={companyData}
            onChange={updateCompanyData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <PreviewStep
            jobData={jobData}
            companyData={companyData}
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case 4:
        return (
          <PricingStep
            selectedPlan={pricing}
            onSelect={(plan: PricingPlan) => {
              setPricing(plan);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <AccountStep
            data={accountData}
            onChange={updateAccountData}
            onBack={prevStep}
            onComplete={handleComplete}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plaats je vacature
          </h1>
          <p className="text-gray-600">
            Bereik duizenden werkzoekenden met een CAO-vacature
          </p>
        </div>

        <div className="mb-8 bg-white rounded-xl p-4 shadow-sm">
          <ProgressSteps steps={JOB_POSTING_STEPS} currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {renderStep()}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">
            Tips voor een goede vacature
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>💰 Vermeld het salaris of de salarisschaal (cao)</li>
            <li>📍 Geef de werklocatie en werktijden duidelijk aan</li>
            <li>📋 Beschrijf kort de belangrijkste taken</li>
            <li>📑 Noem de cao en belangrijkste arbeidsvoorwaarden</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
