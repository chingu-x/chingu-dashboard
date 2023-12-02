"use client";

import BannerContainer from "./components/BannerContainer";
import SignInModalContainer from "./components/SignInModalContainer";

export default function Component() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <BannerContainer />
      <SignInModalContainer />
    </div>
  );
}
