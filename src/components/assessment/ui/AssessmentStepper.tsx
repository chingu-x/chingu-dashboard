import { Stepper } from "@chingu-x/components/stepper";
import type { SteppersItem } from "@/components/Stepper";

interface AssessmentStepperProps {
  currentStep: number;
  goToStep: (step: number) => void;
  className: string;
}

export default function AssessmentStepper({
  currentStep,
  goToStep,
  className = "",
}: AssessmentStepperProps) {
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
        name: `Page ${stepNumber}`,
        onClickEvent: () => goToStep(stepQuestionIndex),
        status: getStatus(stepQuestionIndex, currentStep),
      };
    },
  );

  const showStepper = steppers.some((step) => step.isActive);

  if (!showStepper) return null;

  return (
    <div className={`flex justify-center text-black ${className || ""}`}>
      <Stepper styleType="chips" stepperWidth="w-1/2" steppers={steppers} />
    </div>
  );
}
