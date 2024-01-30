"use client";

import { useState } from "react";
import EmailCheckModalContainer from "./EmailCheckModalContainer";
import ResetPasswordModalContainer from "./ResetPasswordModalContainer";
import SignInBlock from "./SignInBlock";
import NewPasswordModalContainer from "./NewPasswordModalContainer";

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

  // TODO: Remove this mocked value when we will have setup the authentication from the backend
  const showNewPassword = false;

  return (
    <>
      {!showNewPassword && showResetPasswordModal && !showEmailCheckModal && (
        <ResetPasswordModalContainer
          handleEmailCheckModal={handleEmailCheckModal}
        />
      )}
      {!showNewPassword && showEmailCheckModal && <EmailCheckModalContainer />}
      {!showNewPassword && !showResetPasswordModal && !showEmailCheckModal && (
        <SignInBlock handleResetPasswordModal={handleResetPasswordModal} />
      )}
      {showNewPassword && <NewPasswordModalContainer />}
    </>
  );
}

export default SignInModalContainer;
