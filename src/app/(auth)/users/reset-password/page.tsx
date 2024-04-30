import React from "react";
import ResetPasswordContainer from "@/app/(auth)/users/components/ResetPasswordContainer";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";
export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      <AuthBannerContainer />
      <ResetPasswordContainer />
    </div>
  );
}
