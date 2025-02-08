"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export default function OnboardingNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: OnboardingNavigationProps) {
  if (currentStep === 0) return null;

  return (
    <div className="flex w-full justify-center bg-base-content py-6">
      <div className="flex w-[800px] justify-center gap-10">
        <Button variant="outline" className="w-full" onClick={onBack}>
          <ArrowLeftIcon className="h-[18px] w-[18px]" />
          Back
        </Button>
        <Button
          className="w-full"
          onClick={onNext}
          disabled={currentStep === totalSteps}
        >
          {currentStep === totalSteps ? "Submit" : "Continue"}
          <ArrowRightIcon className="h-[18px] w-[18px]" />
        </Button>
      </div>
    </div>
  );
}
