"use client";

import { useState } from "react";
import EmailCheckModalContainer from "./EmailCheckModalContainer";
import ResetPasswordModalContainer from "./ResetPasswordModalContainer";
import SignInBlock from "./SignInBlock";
import NewPasswordModalContainer from "./NewPasswordModalContainer";
import ResetCompletedModalContainer from "./ResetCompletedModalContainer";

function SignInModalContainer() {
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState<boolean>(false);
  const [showEmailCheckModal, setShowEmailCheckModal] =
    useState<boolean>(false);
  const [showResetCompletedModal, setShowResetCompletedModal] =
    useState<boolean>(false);

  // TODO: This state must be handled from the server
  const [showNewPassword, setShowNewPassword] = useState<boolean>(true);

  const handleResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  const handleEmailCheckModal = () => {
    setShowEmailCheckModal(true);
  };

  const handleNewPasswordModal = () => {
    setShowResetCompletedModal(true);
    setShowResetPasswordModal(false);
    setShowNewPassword(false);
  };

  const handleResetConfirmedModal = () => {
    setShowResetCompletedModal(false);
  };

  return (
    <>
      {!showNewPassword && showResetPasswordModal && !showEmailCheckModal && (
        <ResetPasswordModalContainer
          handleEmailCheckModal={handleEmailCheckModal}
        />
      )}
      {!showNewPassword && showEmailCheckModal && <EmailCheckModalContainer />}
      {!showNewPassword &&
        !showResetPasswordModal &&
        !showEmailCheckModal &&
        !showResetCompletedModal && (
          <SignInBlock handleResetPasswordModal={handleResetPasswordModal} />
        )}
      {showNewPassword && !showResetCompletedModal && (
        <NewPasswordModalContainer onClick={handleNewPasswordModal} />
      )}
      {showResetCompletedModal && !showNewPassword && (
        <ResetCompletedModalContainer onClick={handleResetConfirmedModal} />
      )}
    </>
  );
}

export default SignInModalContainer;
