import { onboardingSteps } from "./onboardingSteps";
import OnboardingNavigation from "@/app/(auth)/sign-up/(onboarding)/components/OnboardingNavigation";
import { useOnboardingStep } from "@/app/(auth)/sign-up/(onboarding)/hooks/useOnboardingStep";
import { OnboardingStepper } from "@/app/(auth)/sign-up/(onboarding)/components/OnboardingStepper";

export default function OnboardingContainer() {
  const totalSteps = 7;
  const { currentStep, goToStep, handleNext, handleBack } =
    useOnboardingStep(totalSteps);

  const StepContent = onboardingSteps[currentStep];

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-base-200">
      <div className="flex h-full max-w-4xl flex-col p-10 pt-0">
        <OnboardingStepper currentStep={currentStep} goToStep={goToStep} />
        <StepContent handleNext={handleNext} />
      </div>
      <OnboardingNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
      />
    </div>
  );
}
