"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: readonly Step[] | Step[];
  currentStep: number;
  className?: string;
}

export function ProgressSteps({
  steps,
  currentStep,
  className,
}: ProgressStepsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border-2",
                    isCompleted && "bg-[#F1592A] border-[#F1592A] text-white",
                    isCurrent && "border-[#F1592A] text-[#F1592A] bg-white",
                    !isCompleted &&
                      !isCurrent &&
                      "border-gray-300 text-gray-400 bg-white",
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <div className="mt-2 text-center hidden sm:block">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent && "text-[#F1592A]",
                      isCompleted && "text-gray-900",
                      !isCompleted && !isCurrent && "text-gray-400",
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-all duration-300",
                      isCompleted ? "bg-[#F1592A]" : "bg-gray-200",
                    )}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 sm:hidden">
        <p className="text-center text-sm font-medium text-[#F1592A]">
          Stap {currentStep}: {steps.find((s) => s.id === currentStep)?.title}
        </p>
      </div>
    </div>
  );
}

export function ProgressStepsCompact({
  steps,
  currentStep,
  className,
}: {
  steps: Step[];
  currentStep: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                isCompleted && "bg-[#F1592A] text-white",
                isCurrent && "bg-[#F1592A] text-white ring-2 ring-[#F1592A]/30",
                !isCompleted && !isCurrent && "bg-gray-200 text-gray-500",
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : step.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-4 h-0.5",
                  isCompleted ? "bg-[#F1592A]" : "bg-gray-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
