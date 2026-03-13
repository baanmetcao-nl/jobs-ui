"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProgressSteps } from "@/components/progress-steps";
import {
  JOB_POSTING_STEPS,
  STEP_SLUGS,
  StepSlug,
  JobDetailsFormData,
  CompanyFormData,
  PricingPlan,
  AccountFormData,
} from "@/app/types-employer";
import { JobDetailsForm } from "../steps/job-details";
import { CompanyForm } from "../steps/company";
import { PreviewStep } from "../steps/preview";
import { PricingStep } from "../steps/pricing";
import { AccountStep } from "../steps/account";

const DRAFT_STORAGE_KEY = "jobPostingDraft";

interface DraftData {
  jobData?: Partial<JobDetailsFormData>;
  companyData?: Partial<CompanyFormData>;
  pricing?: PricingPlan | null;
  accountData?: Partial<AccountFormData>;
  draftId?: string | null;
}

function getDraftData(): DraftData {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveDraftData(data: DraftData): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }
}

function getStepComponent(
  step: number,
  draftData: DraftData,
  updateData: (updates: Partial<DraftData>) => void,
  router: any,
  isLoading: boolean,
): React.ReactNode {
  switch (step) {
    case 1:
      return (
        <JobDetailsForm
          data={draftData.jobData || {}}
          onChange={(data) => updateData({ jobData: data })}
        />
      );
    case 2:
      return (
        <CompanyForm
          data={draftData.companyData || {}}
          onChange={(data) => updateData({ companyData: data })}
        />
      );
    case 3:
      return (
        <PreviewStep
          jobData={draftData.jobData || {}}
          companyData={draftData.companyData || {}}
        />
      );
    case 4:
      return (
        <PricingStep
          selectedPlan={draftData.pricing || null}
          onSelect={(plan) => {
            updateData({ pricing: plan });
            router.push("/plaats-vacature/account");
          }}
        />
      );
    case 5:
      return (
        <AccountStep
          data={draftData.accountData || {}}
          onChange={(data) => updateData({ accountData: data })}
          isLoading={isLoading}
        />
      );
    default:
      return null;
  }
}

export default function JobPostingStep() {
  const params = useParams();
  const router = useRouter();
  const [draftData, setDraftData] = useState<DraftData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStepSlug] = useState(params.step as StepSlug | string);

  const currentStep = STEP_SLUGS[currentStepSlug as StepSlug];

  if (!currentStep) {
    router.push("/plaats-vacature/vacature");
    return null;
  }

  useEffect(() => {
    const data = getDraftData();
    setDraftData(data);
  }, []);

  useEffect(() => {
    saveDraftData(draftData);
  }, [draftData]);

  const updateData = (updates: Partial<DraftData>): void => {
    setDraftData((prev) => ({ ...prev, ...updates }));
  };

  const validatePreviousSteps = (): boolean => {
    const data = getDraftData();

    switch (currentStep) {
      case 2:
        return !!data.jobData?.title;
      case 3:
        return !!data.jobData?.title && !!data.companyData?.name;
      case 4:
        return !!data.jobData?.title && !!data.companyData?.name;
      case 5:
        return (
          !!data.jobData?.title && !!data.companyData?.name && !!data.pricing
        );
      default:
        return true;
    }
  };

  useEffect(() => {
    if (!validatePreviousSteps()) {
      const previousStep = JOB_POSTING_STEPS[currentStep - 2];
      if (previousStep) {
        router.replace(`/plaats-vacature/${previousStep.slug}`);
      }
    }
  }, [currentStep, draftData]);

  const handleComplete = async (): Promise<void> => {
    setIsLoading(true);
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      router.push("/dashboard?new=true");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const StepComponent = getStepComponent(
    currentStep,
    draftData,
    updateData,
    router,
    isLoading,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plaats je vacature
          </h1>
          <p className="text-gray-600">
            Bereik duizenden werkzoekenden met jouw vacature
          </p>
        </div>

        <div className="mb-8 bg-white rounded-xl p-4 shadow-sm">
          <ProgressSteps steps={JOB_POSTING_STEPS} currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {StepComponent}
        </div>

        {currentStep === 1 && (
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
        )}
      </div>
    </div>
  );
}
