/* eslint-disable indent */
import WelcomeChingu from "./WelcomeChingu";
import OnboardingImage from "./OnboardingImage";
import WhatFeatures from "@/app/(auth)/sign-up/(onboarding)/components/WhatFeatures";
import HowDidYouHear from "@/app/(auth)/sign-up/(onboarding)/components/HowDidYouHear";
import LinkedInUrl from "@/app/(auth)/sign-up/(onboarding)/components/LinkedInUrl";
import TextInput from "@/components/inputs/TextInput";
import OnboardingNavigation from "@/app/(auth)/sign-up/(onboarding)/components/OnboardingNavigation";
import { useOnboardingStep } from "@/app/(auth)/sign-up/(onboarding)/hooks/useOnboardingStep";
import { OnboardingStepper } from "@/app/(auth)/sign-up/(onboarding)/components/OnboardingStepper";

export default function OnboardingContainer() {
  const totalSteps = 7;
  const { currentStep, goToStep, handleNext, handleBack } =
    useOnboardingStep(totalSteps);

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
        <OnboardingStepper currentStep={currentStep} goToStep={goToStep} />
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
