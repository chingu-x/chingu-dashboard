/* eslint-disable indent */
import WelcomeChingu from "./WelcomeChingu";
import OnboardingImage from "./OnboardingImage";
import WhatFeatures from "@/app/(auth)/sign-up/(onboarding)/components/WhatFeatures";
import HowDidYouHear from "@/app/(auth)/sign-up/(onboarding)/components/HowDidYouHear";
import LinkedInUrl from "@/app/(auth)/sign-up/(onboarding)/components/LinkedInUrl";
import type { SteppersItem } from "@/components/Stepper";
import Stepper from "@/components/Stepper";
import TextInput from "@/components/inputs/TextInput";
import OnboardingNavigation from "@/app/(auth)/sign-up/(onboarding)/components/OnboardingNavigation";
import { useOnboardingStep } from "@/app/(auth)/sign-up/(onboarding)/hooks/useOnboardingStep";

export default function OnboardingContainer() {
  const totalSteps = 7;
  const { currentStep, goToStep, handleNext, handleBack } =
    useOnboardingStep(totalSteps);
  // Condition to show stepper
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeChingu handleBegin={handleNext} />;
      case 1:
        return (
          <>
            <div className="py-10">
              <TextInput
                id="firstName"
                label="First Name"
                placeholder="e.g. John"
              />
              <TextInput
                id="lastName"
                label="Last Name"
                placeholder="e.g. Smith"
              />
            </div>
          </>
        );
      case 2:
        return (
          <OnboardingImage
            src="/img/onboarding_image_1.png"
            alt="onboarding image 1"
            height={435}
          />
        );
      case 3:
        return <WhatFeatures />;
      case 4:
        return (
          <OnboardingImage
            src="/img/onboarding_image_2.png"
            alt="onboarding image 2"
          />
        );
      case 5:
        return <HowDidYouHear />;
      case 6:
        return (
          <OnboardingImage
            src="/img/onboarding_image_3.png"
            alt="onboarding image 3"
          />
        );
      case 7:
        return <LinkedInUrl />;
      default:
        return <WelcomeChingu handleBegin={handleNext} />;
    }
  };

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-base-200">
      <div className="flex h-full max-w-4xl flex-col p-10 pt-0">
        {/* steps */}
        <div className="max-w-xl p-6">
          {showStepper && (
            <Stepper
              styleType="chips"
              stepperWidth="w-[420px]"
              steppers={steppers}
            />
          )}
        </div>
        {renderStepContent()}
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
