import { useState } from "react";
import Button from "@/components/Button";
import AssessmentStepper from "@/components/assessment/ui/AssessmentStepper";

export default function Header() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="absolute left-[250px] top-[75px] flex w-full px-[24px]">
      <div className="w-[163px] flex-shrink-0">
        <Button className="h-[40px] w-full gap-[8px] rounded-tl-[8px] border border-[#217A56] border-gray-400 bg-[#F5F5F5] px-[20px] py-[12px] text-black">
          Exit Assessment
        </Button>
      </div>

      <div className="flex flex-1 justify-center">
        <AssessmentStepper
          className="h-[80px] w-full max-w-[812px] items-center justify-center"
          currentStep={currentStep}
          goToStep={goToStep}
        />
      </div>
    </div>
  );
}
