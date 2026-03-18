"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ProgressSteps } from "@/components/progress-steps";
import {
  JOB_POSTING_STEPS,
  STEP_SLUGS,
  PRICING_PLANS,
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

const DEFAULT_FLOW: JobPostingFlow = {
  step: 1,
  jobDetails: {},
  company: {},
  pricing: null,
  featured: false,
  account: {},
};

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params?.step as StepSlug | undefined;

  const [flowData, setFlowData] = useState<JobPostingFlow | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("job-posting-flow");
      const data = saved ? JSON.parse(saved) : DEFAULT_FLOW;

      const planParam = searchParams.get("plan");
      if (planParam && !data.pricing) {
        const matchedPlan = PRICING_PLANS.find((p) => p.id === planParam);
        if (matchedPlan) {
          data.pricing = matchedPlan;
        }
      }

      setFlowData(data);
    } catch (e) {
      console.error("Failed to load flow data:", e);
      localStorage.removeItem("job-posting-flow");
      setFlowData(DEFAULT_FLOW);
    }
  }, []);

  useEffect(() => {
    if (!flowData) return;
    try {
      localStorage.setItem("job-posting-flow", JSON.stringify(flowData));
    } catch (e) {
      console.error("Failed to save flow data:", e);
    }
  }, [flowData]);

  const currentStepNum = slug && STEP_SLUGS[slug] ? STEP_SLUGS[slug] : 1;

  const isStepValid = (stepNum: number) => {
    if (!flowData) return false;
    switch (stepNum) {
      case 2:
        return !!flowData.jobDetails?.title;
      case 3:
        return !!flowData.jobDetails?.title && !!flowData.company?.name;
      case 4:
        return !!flowData.jobDetails?.title && !!flowData.company?.name;
      case 5:
        return (
          !!flowData.jobDetails?.title &&
          !!flowData.company?.name &&
          !!flowData.pricing
        );
      default:
        return true;
    }
  };

  useEffect(() => {
    if (!flowData) return;
    if (slug && currentStepNum > 1 && !isStepValid(currentStepNum)) {
      const prevStepSlug = JOB_POSTING_STEPS[currentStepNum - 2]
        ?.slug as StepSlug;
      router.replace(`/plaats-vacature/${prevStepSlug || "vacature"}`);
    }
  }, [slug, currentStepNum, flowData, router]);

  useEffect(() => {
    if (!slug || !STEP_SLUGS[slug]) {
      router.replace("/plaats-vacature/vacature");
    }
  }, [slug, router]);

  const goToStep = (newSlug: StepSlug) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/plaats-vacature/${newSlug}`);
  };

  const StepComponent = slug && STEP_COMPONENTS[slug];

  if (!slug || !STEP_SLUGS[slug] || !StepComponent) {
    return null;
  }

  if (!flowData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 md:p-8 space-y-8">
        <ProgressSteps steps={JOB_POSTING_STEPS} currentStep={currentStepNum} />
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-8 h-96 animate-pulse" />
      </div>
    );
  }

  const stepProps = {
    vacature: {
      data: flowData.jobDetails,
      onChange: (updates: any) =>
        setFlowData((prev) => prev && ({
          ...prev,
          jobDetails: { ...prev.jobDetails, ...updates },
        })),
      goToStep,
    },
    bedrijf: {
      data: flowData.company,
      onChange: (updates: any) =>
        setFlowData((prev) => prev && ({
          ...prev,
          company: { ...prev.company, ...updates },
        })),
      goToStep,
    },
    preview: {
      jobData: flowData.jobDetails,
      companyData: flowData.company,
      goToStep,
    },
    prijzen: {
      selectedPlan: flowData.pricing,
      onSelect: (plan: any) =>
        setFlowData((prev) => prev && ({ ...prev, pricing: plan })),
      featured: flowData.featured,
      onFeaturedChange: (featured: boolean) =>
        setFlowData((prev) => prev && ({ ...prev, featured })),
      goToStep,
    },
    account: {
      data: flowData.account,
      onChange: (updates: any) =>
        setFlowData((prev) => prev && ({
          ...prev,
          account: { ...prev.account, ...updates },
        })),
      selectedPlan: flowData.pricing,
      featured: flowData.featured,
      goToStep,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:p-8 space-y-8">
      <ProgressSteps steps={JOB_POSTING_STEPS} currentStep={currentStepNum} />
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-8">
        <StepComponent {...stepProps[slug]} />
      </div>
    </div>
  );
}
