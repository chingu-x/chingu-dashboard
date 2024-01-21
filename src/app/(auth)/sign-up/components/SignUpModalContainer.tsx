"use client";

import { useState } from "react";
import SignUpFormContainer from "./SignUpFormContainer";
import ConfirmationMailModalContainer from "./ConfirmationMailModalContainer";
import SocialLoginButtonsContainer from "@/components/socialLoginButtonsContainer/SocialLoginButtonsContainer";
import Alert from "@/components/Alert";

// Mocked value that will be removed when we will have setup the authentication from the backend
const showAlert = true;

function SignUpModalContainer() {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const handleConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  return (
    <>
      {showConfirmationModal ? (
        <ConfirmationMailModalContainer />
      ) : (
        <div className="w-[451px] min-h-[652px] bg-base-200 rounded-2xl xl:ml-60 p-6">
          <p className="text-base-300 text-2xl text-center mt-2.5 mb-[26px] font-medium">
            Welcome to Chingu
          </p>
          {showAlert && (
            <div className="mb-8">
              <Alert
                context="error"
                message={"Login failed. Invalid email and/or password."}
              />
            </div>
          )}
          <div className="flex flex-col items-center">
            <SocialLoginButtonsContainer />
            <div className="flex items-center mt-6 mb-8 w-full">
              <hr className="flex-grow border-neutral-content w-11/12" />
              <p className="mx-4 text-base-300 font-semibold">or</p>
              <hr className="flex-grow border-neutral-content w-11/12" />
            </div>
          </div>
          <SignUpFormContainer
            handleConfirmationModal={handleConfirmationModal}
          />
        </div>
      )}
    </>
  );
}

export default SignUpModalContainer;
