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
      <div className="hidden md:block">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center relative">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                      isCompleted && "bg-gray-900 text-white",
                      isCurrent &&
                        "bg-white border-2 border-gray-900 text-gray-900",
                      !isCompleted &&
                        !isCurrent &&
                        "bg-gray-100 text-gray-400 border border-gray-200",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>

                  <div className="mt-3 text-center min-w-25">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isCurrent && "text-gray-900",
                        isCompleted && "text-gray-900",
                        !isCompleted && !isCurrent && "text-gray-400",
                      )}
                    >
                      {step.title}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-0.5",
                        isCurrent ? "text-gray-600" : "text-gray-400",
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex-1 h-px mx-2 -mt-6">
                    <div
                      className={cn(
                        "h-full transition-colors duration-200",
                        isCompleted ? "bg-gray-900" : "bg-gray-200",
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">
            Stap {currentStep} van {steps.length}
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>

        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F1592A] rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>

        <p className="mt-3 text-center font-medium text-gray-900">
          {steps.find((s) => s.id === currentStep)?.title}
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
    <div className={cn("flex items-center gap-1", className)}>
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                isCompleted && "bg-gray-900 text-white",
                isCurrent && "bg-white border-2 border-gray-900 text-gray-900",
                !isCompleted &&
                  !isCurrent &&
                  "bg-gray-100 text-gray-400 border border-gray-200",
              )}
            >
              {isCompleted ? <Check className="w-3 h-3" /> : step.id}
            </div>
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-px mx-1",
                  isCompleted ? "bg-gray-900" : "bg-gray-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
