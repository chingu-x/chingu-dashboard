"use client";

import { useState } from "react";
import ResetPasswordContainer from "./ResetPasswordContainer";
import SignInBlock from "./SignInBlock";
import EmailCheckContainer from "./EmailCheckContainer";

function SignInContainer() {
  enum ContainerState {
    SignIn,
    ResetPassword,
    EmailCheck,
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

  return (
    <>
      {containerState === ContainerState.ResetPassword && (
        <ResetPasswordContainer handleEmailCheck={handleEmailCheck} />
      )}
      {containerState === ContainerState.EmailCheck && (
        <EmailCheckContainer handleResendEmail={handleResetPassword} />
      )}
      {containerState === ContainerState.SignIn && (
        <SignInBlock handleResetPassword={handleResetPassword} />
      )}
    </>
  );
}

export default SignInContainer;
