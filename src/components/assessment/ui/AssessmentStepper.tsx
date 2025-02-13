import { Stepper } from "@chingu-x/components/stepper";
import type { SteppersItem } from "@/components/Stepper";

interface AseessmentStepperProps {
  currentStep: number;
  goToStep: (step: number) => void;
}

export function AseessmentStepper({
  currentStep,
  goToStep,
}: AseessmentStepperProps) {
  const totalQuestions = 60;
  const questionsPerStep = 6;
  const totalSteps = totalQuestions / questionsPerStep;

  function getStatus(
    stepId: number,
    currentStep: number,
  ): "completed" | "current" | "remaining" {
    if (stepId < currentStep) return "completed";
    if (stepId > currentStep) return "remaining";
    return "current";
  }

  const steppers: SteppersItem[] = Array.from(
    { length: totalSteps },
    (_, i) => {
      const stepNumber = i + 1;
      const stepQuestionIndex =
        stepNumber * questionsPerStep - (questionsPerStep - 1);

      return {
        isActive: currentStep === stepQuestionIndex,
        name: `Assessment question ${stepNumber}`,
        onClickEvent: () => goToStep(stepQuestionIndex),
        status: getStatus(stepQuestionIndex, currentStep),
      };
    },
  );

  const showStepper = steppers.some((step) => step.isActive);

  if (!showStepper) return null;

  return (
    <div className="max-w-xl p-6">
      <Stepper styleType="chips" stepperWidth="w-[420px]" steppers={steppers} />
    </div>
  );
}
