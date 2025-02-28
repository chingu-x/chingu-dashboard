import { useState } from "react";
import Button from "@/components/Button";
import AssessmentStepper from "@/app/(main)/assessment/ui/AssessmentStepper";

export default function Header() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="absolute left-0 top-0 flex w-full items-center justify-between gap-2 px-[24px]">
      <Button variant="outline" className="whitespace-nowrap">
        Exit Assessment
      </Button>

      <AssessmentStepper
        className="flex h-[80px] items-center justify-center"
        currentStep={currentStep}
        goToStep={goToStep}
      />
      <div className="text-sm text-neutral">Last saved 4 minutes ago</div>
    </div>
  );
}
