"use client";

import { useState } from "react";
import ResetPasswordContainer from "./ResetPasswordContainer";
import SignInBlock from "./SignInBlock";
import EmailCheckContainer from "./EmailCheckContainer";

export enum ContainerState {
  SignIn,
  ResetPassword,
  EmailCheck,
}

function SignInContainer() {
  const [email, setEmail] = useState<string>("");

  const [containerState, setContainerState] = useState<ContainerState>(
    ContainerState.SignIn
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
        <ResetPasswordContainer
          handleEmailCheck={handleEmailCheck}
          setEmail={setEmail}
        />
      )}
      {containerState === ContainerState.EmailCheck && (
        <EmailCheckContainer
          email={email}
          setContainerState={setContainerState}
        />
      )}
      {containerState === ContainerState.SignIn && (
        <SignInBlock handleResetPassword={handleResetPassword} />
      )}
    </>
  );
}

export default SignInContainer;
