"use client";

import { useState } from "react";
import EmailCheckModalContainer from "./EmailCheckModalContainer";
import ResetPasswordModalContainer from "./ResetPasswordModalContainer";
import SignInBlock from "./SignInBlock";

function SignInModalContainer() {
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState<boolean>(false);
  const [showEmailCheckModal, setShowEmailCheckModal] =
    useState<boolean>(false);

  const handleResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  const handleEmailCheckModal = () => {
    setShowEmailCheckModal(true);
  };

  return (
    <>
      {showResetPasswordModal && !showEmailCheckModal && (
        <ResetPasswordModalContainer
          handleEmailCheckModal={handleEmailCheckModal}
        />
      )}
      {showEmailCheckModal && <EmailCheckModalContainer />}
      {!showResetPasswordModal && !showEmailCheckModal && (
        <SignInBlock handleResetPasswordModal={handleResetPasswordModal} />
      )}
    </>
  );
}

export default SignInModalContainer;
