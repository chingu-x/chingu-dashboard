"use client";

import { useState } from "react";
import SignUpFormContainer from "./SignUpFormContainer";
import ConfirmationMailContainer from "./ConfirmationMailContainer";
import SocialLoginButtonsContainer from "@/components/socialLoginButtonsContainer/SocialLoginButtonsContainer";

function SignUpContainer() {
  const [showConfirmationContainer, setShowConfirmationContainer] =
    useState<boolean>(false);

  const handleConfirmationContainer = () => {
    setShowConfirmationContainer(true);
  };

  return (
    <>
      {showConfirmationContainer ? (
        <ConfirmationMailContainer />
      ) : (
        <div className="w-[400px] min-h-[652px] bg-base-200 rounded-2xl xl:ml-60 p-6">
          <p className="text-base-300 text-2xl text-center mt-2.5 mb-[26px] font-medium">
            Welcome to Chingu
          </p>
          <div className="flex flex-col items-center">
            <SocialLoginButtonsContainer />
            <div className="flex items-center w-full mt-6 mb-8">
              <hr className="flex-grow w-11/12 border-neutral-content" />
              <p className="mx-4 font-semibold text-base-300">Or</p>
              <hr className="flex-grow w-11/12 border-neutral-content" />
            </div>
          </div>
          <SignUpFormContainer
            handleConfirmationContainer={handleConfirmationContainer}
          />
        </div>
      )}
    </>
  );
}

export default SignUpContainer;
