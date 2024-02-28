"use client";
import BannerContainer from "./components/BannerContainer";
import SignInContainer from "./components/SignInContainer";
import NewPasswordContainer from "./components/NewPasswordContainer";
export default function SignInPage() {
  return (
    // <div className="flex flex-col xl:flex-row items-center justify-center">
    <div>
      {/* <BannerContainer /> */}
      {/* <SignInContainer /> */}
      <NewPasswordContainer onClick={() => console.log("something")} />
    </div>
  );
}
