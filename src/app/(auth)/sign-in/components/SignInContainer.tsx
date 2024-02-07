"use client";

import { useState } from "react";
import ResetPasswordContainer from "./ResetPasswordContainer";
import SignInBlock from "./SignInBlock";
import NewPasswordContainer from "./NewPasswordContainer";
import ResetCompletedContainer from "./ResetCompletedContainer";
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
        <ResetPasswordContainer handleEmailCheck={handleEmailCheck} />
      )}
      {containerState === ContainerState.EmailCheck && <EmailCheckContainer />}
      {containerState === ContainerState.SignIn && (
        <SignInBlock handleResetPassword={handleResetPassword} />
      )}
      {containerState === ContainerState.NewPassword && (
        <NewPasswordContainer onClick={handleNewPassword} />
      )}
      {containerState === ContainerState.ResetCompleted && (
        <ResetCompletedContainer onClick={handleResetConfirmed} />
      )}
    </>
  );
}

export default SignInContainer;
