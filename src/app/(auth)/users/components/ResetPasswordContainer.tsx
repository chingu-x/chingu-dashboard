"use client";

import { useState } from "react";
import NewPasswordContainer from "./NewPasswordContainer";
import ResetCompletedContainer from "./ResetCompletedContainer";

function ResetPasswordContainer() {
  enum ContainerState {
    NewPassword,
    ResetCompleted,
  }

  const [containerState, setContainerState] = useState<ContainerState>(
    ContainerState.NewPassword,
  );

  const handleNewPassword = () => {
    console.log("newPassword completed");
    setContainerState(ContainerState.ResetCompleted);
  };

  return (
    <>
      {containerState === ContainerState.NewPassword && (
        <NewPasswordContainer onClick={handleNewPassword} />
      )}
      {containerState === ContainerState.ResetCompleted && (
        <ResetCompletedContainer />
      )}
    </>
  );
}

export default ResetPasswordContainer;
