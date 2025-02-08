import WelcomeChingu from "@/app/(auth)/sign-up/(onboarding)/components/WelcomeChingu";
import PersonalInfoForm from "@/app/(auth)/sign-up/(onboarding)/components/forms/PersonalInfoForm";
import OnboardingImage from "@/app/(auth)/sign-up/(onboarding)/components/OnboardingImage";
import WhatFeatures from "@/app/(auth)/sign-up/(onboarding)/components/forms/WhatFeatures";
import HowDidYouHear from "@/app/(auth)/sign-up/(onboarding)/components/forms/HowDidYouHear";
import LinkedInUrl from "@/app/(auth)/sign-up/(onboarding)/components/forms/LinkedInUrl";

type OnboardingStep = {
  handleNext?: () => void; // Optional for steps without handleNext
};

export const onboardingSteps: Record<number, React.FC<OnboardingStep>> = {
  0: ({ handleNext }) => <WelcomeChingu handleBegin={handleNext} />,
  1: () => <PersonalInfoForm />,
  2: () => (
    <OnboardingImage
      src="/img/onboarding_image_1.png"
      alt="onboarding image 1"
      height={435}
    />
  ),
  3: () => <WhatFeatures />,
  4: () => (
    <OnboardingImage
      src="/img/onboarding_image_2.png"
      alt="onboarding image 2"
    />
  ),
  5: () => <HowDidYouHear />,
  6: () => (
    <OnboardingImage
      src="/img/onboarding_image_3.png"
      alt="onboarding image 3"
    />
  ),
  7: () => <LinkedInUrl />,
};
