import { Stepper } from "@chingu-x/components/stepper";
import type { SteppersItem } from "@/components/Stepper";

interface OnboardingStepperProps {
  currentStep: number;
  goToStep: (step: number) => void;
}

export function OnboardingStepper({
  currentStep,
  goToStep,
}: OnboardingStepperProps) {
  const showStepper = [1, 3, 5, 7].includes(currentStep);

  type StepperStatus = "completed" | "current" | "remaining";
  function getStatus(stepId: number, currentStep: number): StepperStatus {
    if (stepId < currentStep) return "completed";
    if (stepId > currentStep) return "remaining";
    return "current";
  }

  const steppers: SteppersItem[] = [
    {
      isActive: currentStep === 1,
      name: "Onboarding step 1",
      onClickEvent: () => goToStep(1),
      status: getStatus(1, currentStep),
    },
    {
      isActive: currentStep === 3,
      name: "Onboarding step 2",
      onClickEvent: () => goToStep(3),
      status: getStatus(3, currentStep),
    },
    {
      isActive: currentStep === 5,
      name: "Onboarding step 3",
      onClickEvent: () => goToStep(5),
      status: getStatus(5, currentStep),
    },
    {
      isActive: currentStep === 7,
      name: "Onboarding step 4",
      onClickEvent: () => goToStep(7),
      status: getStatus(7, currentStep),
    },
  ];

  if (!showStepper) return null;

  return (
    <div className="max-w-xl p-6">
      <Stepper styleType="chips" stepperWidth="w-[420px]" steppers={steppers} />
    </div>
  );
}
