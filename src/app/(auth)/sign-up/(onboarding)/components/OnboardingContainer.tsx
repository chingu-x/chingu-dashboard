/* eslint-disable indent */
"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import WelcomeChingu from "./WelcomeChingu";
import WhatFeatures from "@/app/(auth)/sign-up/(onboarding)/components/WhatFeatures";
import HowDidYouHear from "@/app/(auth)/sign-up/(onboarding)/components/HowDidYouHear";
import LinkedInUrl from "@/app/(auth)/sign-up/(onboarding)/components/LinkedInUrl";
import Button from "@/components/Button";
import type { SteppersItem } from "@/components/Stepper";
import Stepper from "@/components/Stepper";
import TextInput from "@/components/inputs/TextInput";

export default function OnboardingContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 7;
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

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
          <div className="flex h-full max-w-xl items-center justify-center">
            <Image
              width={812}
              height={435}
              src="/img/onboarding_image_1.png"
              alt="onboarding image 1"
            />
          </div>
        );
      case 3:
        return <WhatFeatures />;
      case 4:
        return (
          <div className="flex h-full max-w-xl items-center justify-center">
            <Image
              width={812}
              height={395}
              src="/img/onboarding_image_2.png"
              alt="onboarding image 2"
            />
          </div>
        );
      case 5:
        return <HowDidYouHear />;
      case 6:
        return (
          <div className="flex h-full max-w-xl items-center justify-center">
            <Image
              width={812}
              height={395}
              src="/img/onboarding_image_3.png"
              alt="onboarding image 3"
            />
          </div>
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
      {/* buttons container */}
      {currentStep > 0 && (
        <div className="flex w-full justify-center bg-base-content py-6">
          <div className="flex w-[800px] justify-center gap-10">
            <Button variant={"outline"} className="w-full" onClick={handleBack}>
              <ArrowLeftIcon className="h-[18px] w-[18px]" />
              Back
            </Button>
            <Button
              className="w-full"
              onClick={handleNext}
              disabled={currentStep === totalSteps}
            >
              {currentStep === totalSteps ? "Submit" : "Continue"}
              <ArrowRightIcon className="h-[18px] w-[18px]" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
