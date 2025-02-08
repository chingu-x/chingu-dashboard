"use client";

import { useState } from "react";
import SignUpFormContainer from "./SignUpFormContainer";
import OnboardingContainer from "../(onboarding)/components/OnboardingContainer";
import SocialLoginButtonsContainer from "@/components/socialLoginButtonsContainer/SocialLoginButtonsContainer";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";

function SignUpContainer() {
  const [showOnboarningContainer, setShowOnboardingContainer] =
    useState<boolean>(false);

  const handleOnboardingContainer = () => {
    setShowOnboardingContainer(true);
  };

  return (
    <>
      {showOnboarningContainer ? (
        <OnboardingContainer />
      ) : (
        <>
          <AuthBannerContainer />
          <div className="min-h-[652px] w-[400px] rounded-2xl bg-base-200 p-6 xl:ml-60">
            <p className="mb-[26px] mt-2.5 text-center text-2xl font-medium text-base-300">
              Create a Chingu Account
            </p>
            <div className="flex flex-col items-center">
              <SocialLoginButtonsContainer />
              <div className="mb-8 mt-6 flex w-full items-center">
                <hr className="w-11/12 grow border-neutral-content" />
                <p className="mx-4 text-base font-medium text-base-300">Or</p>
                <hr className="w-11/12 grow border-neutral-content" />
              </div>
            </div>
            <SignUpFormContainer
              handleOnboardingContainer={handleOnboardingContainer}
            />
          </div>
        </>
      )}
    </>
  );
}

export default SignUpContainer;
