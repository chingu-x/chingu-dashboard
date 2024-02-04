"use client";

import { useState } from "react";
import EmailCheckModalContainer from "./EmailCheckModalContainer";
import ResetPasswordModalContainer from "./ResetPasswordModalContainer";
import SignInBlock from "./SignInBlock";
import NewPasswordModalContainer from "./NewPasswordModalContainer";
import ResetCompletedModalContainer from "./ResetCompletedModalContainer";

function SignInModalContainer() {
  enum ModalState {
    SignIn,
    ResetPassword,
    EmailCheck,
    NewPassword,
    ResetCompleted,
  }

  const [modalState, setModalState] = useState<ModalState>(
    ModalState.NewPassword,
  );

  const handleResetPasswordModal = () => {
    setModalState(ModalState.ResetPassword);
  };

  const handleEmailCheckModal = () => {
    setModalState(ModalState.EmailCheck);
  };

  const handleNewPasswordModal = () => {
    setModalState(ModalState.ResetCompleted);
  };

  const handleResetConfirmedModal = () => {
    setModalState(ModalState.SignIn);
  };

  return (
    <>
      {modalState === ModalState.ResetPassword && (
        <ResetPasswordModalContainer
          handleEmailCheckModal={handleEmailCheckModal}
        />
      )}
      {modalState === ModalState.EmailCheck && <EmailCheckModalContainer />}
      {modalState === ModalState.SignIn && (
        <SignInBlock handleResetPasswordModal={handleResetPasswordModal} />
      )}
      {modalState === ModalState.NewPassword && (
        <NewPasswordModalContainer onClick={handleNewPasswordModal} />
      )}
      {modalState === ModalState.ResetCompleted && (
        <ResetCompletedModalContainer onClick={handleResetConfirmedModal} />
      )}
    </>
  );
}

export default SignInModalContainer;
