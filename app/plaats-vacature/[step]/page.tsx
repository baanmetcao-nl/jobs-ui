"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProgressSteps } from "@/components/progress-steps";
import {
  JOB_POSTING_STEPS,
  STEP_SLUGS,
  type JobPostingFlow,
  type StepSlug,
} from "@/app/types-employer";
import { JobDetailsForm } from "@/app/plaats-vacature/steps/job-details";
import { CompanyForm } from "@/app/plaats-vacature/steps/company";
import { PreviewStep } from "@/app/plaats-vacature/steps/preview";
import { PricingStep } from "@/app/plaats-vacature/steps/pricing";
import { AccountStep } from "@/app/plaats-vacature/steps/account";

const STEP_COMPONENTS: Record<StepSlug, React.FC<any>> = {
  vacature: JobDetailsForm,
  bedrijf: CompanyForm,
  preview: PreviewStep,
  prijzen: PricingStep,
  account: AccountStep,
};

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.step as StepSlug | undefined;

  const [flowData, setFlowData] = useState<JobPostingFlow>({
    step: 1,
    jobDetails: {},
    company: {},
    pricing: null,
    account: {},
  });

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("job-posting-flow");
        if (saved) {
          setFlowData(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load flow data:", e);
        localStorage.removeItem("job-posting-flow");
      }
    }
  }, []);

  // Save to localStorage whenever flowData changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("job-posting-flow", JSON.stringify(flowData));
      } catch (e) {
        console.error("Failed to save flow data:", e);
      }
    }
  }, [flowData]);

  const currentStepNum = slug && STEP_SLUGS[slug] ? STEP_SLUGS[slug] : 1;

  // Step validation - check if previous steps have minimum data
  const isStepValid = (stepNum: number) => {
    switch (stepNum) {
      case 2: // bedrijf requires vacature data
        return !!flowData.jobDetails?.title;
      case 3: // preview requires vacature + bedrijf
        return !!flowData.jobDetails?.title && !!flowData.company?.name;
      case 4: // prijzen requires preview
        return !!flowData.jobDetails?.title && !!flowData.company?.name;
      case 5: // account requires all
        return (
          !!flowData.jobDetails?.title &&
          !!flowData.company?.name &&
          !!flowData.pricing
        );
      default:
        return true;
    }
  };

  // Redirect if trying to skip steps
  useEffect(() => {
    if (slug && currentStepNum > 1 && !isStepValid(currentStepNum)) {
      const prevStepSlug = JOB_POSTING_STEPS[currentStepNum - 2]
        ?.slug as StepSlug;
      router.replace(`/plaats-vacature/${prevStepSlug || "vacature"}`);
      return;
    }
  }, [slug, currentStepNum, flowData, router]);

  const stepProps = {
    vacature: {
      data: flowData.jobDetails,
      onChange: (updates: any) =>
        setFlowData((prev) => ({
          ...prev,
          jobDetails: { ...prev.jobDetails, ...updates },
        })),
    },
    bedrijf: {
      data: flowData.company,
      onChange: (updates: any) =>
        setFlowData((prev) => ({
          ...prev,
          company: { ...prev.company, ...updates },
        })),
    },
    preview: {
      jobData: flowData.jobDetails,
      companyData: flowData.company,
    },
    prijzen: {
      selectedPlan: flowData.pricing,
      onSelect: (plan: any) =>
        setFlowData((prev) => ({ ...prev, pricing: plan })),
    },
    account: {
      data: flowData.account,
      onChange: (updates: any) =>
        setFlowData((prev) => ({
          ...prev,
          account: { ...prev.account, ...updates },
        })),
    },
  };

  const StepComponent = slug && STEP_COMPONENTS[slug];

  const goToStep = (newSlug: StepSlug) => {
    const newStepNum = STEP_SLUGS[newSlug];
    setFlowData((prev) => ({ ...prev, step: newStepNum }));
    router.push(`/plaats-vacature/${newSlug}`);
  };

  if (!slug || !STEP_SLUGS[slug] || !StepComponent) {
    router.replace("/plaats-vacature/vacature");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
      <ProgressSteps steps={JOB_POSTING_STEPS} currentStep={currentStepNum} />

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <StepComponent {...stepProps[slug]} goToStep={goToStep} />
      </div>
    </div>
  );
}
