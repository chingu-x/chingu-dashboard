"use client";
import React from "react";
import NewPasswordContainer from "@/app/(auth)/sign-in/components/NewPasswordContainer";

export default function ResetPasswordFlowContainer() {
  return <NewPasswordContainer onClick={() => console.log("something")} />;
}
