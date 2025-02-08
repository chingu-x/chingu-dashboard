import { useState } from "react";

export function useOnboardingStep(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const goToStep = (stepNumber: number): void => {
    setCurrentStep(stepNumber);
  };

  const handleNext = (): void => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

  const handleBack = (): void => {
    if (currentStep > 0) {
      setCurrentStep((prev: number) => prev - 1);
    }
  };

  return {
    currentStep,
    goToStep,
    handleNext,
    handleBack,
  } as const;
}
