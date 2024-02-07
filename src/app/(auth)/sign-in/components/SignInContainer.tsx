"use client";

import { useState } from "react";
import ResetPasswordModalContainer from "./ResetPasswordContainer";
import SignInBlock from "./SignInBlock";
import NewPasswordModalContainer from "./NewPasswordContainer";
import ResetCompletedModalContainer from "./ResetCompletedContainer";
import EmailCheckContainer from "./EmailCheckContainer";

function SignInContainer() {
  enum ContainerState {
    SignIn,
    ResetPassword,
    EmailCheck,
    NewPassword,
    ResetCompleted,
  }

  const [containerState, setContainerState] = useState<ContainerState>(
    ContainerState.SignIn,
  );

  const handleResetPassword = () => {
    setContainerState(ContainerState.ResetPassword);
  };

  const handleEmailCheck = () => {
    setContainerState(ContainerState.EmailCheck);
  };

  const handleNewPassword = () => {
    setContainerState(ContainerState.ResetCompleted);
  };

  const handleResetConfirmed = () => {
    setContainerState(ContainerState.SignIn);
  };

  return (
    <>
      {containerState === ContainerState.ResetPassword && (
        <ResetPasswordModalContainer handleEmailCheckModal={handleEmailCheck} />
      )}
      {containerState === ContainerState.EmailCheck && <EmailCheckContainer />}
      {containerState === ContainerState.SignIn && (
        <SignInBlock handleResetPasswordModal={handleResetPassword} />
      )}
      {containerState === ContainerState.NewPassword && (
        <NewPasswordModalContainer onClick={handleNewPassword} />
      )}
      {containerState === ContainerState.ResetCompleted && (
        <ResetCompletedModalContainer onClick={handleResetConfirmed} />
      )}
    </>
  );
}

export default SignInContainer;
