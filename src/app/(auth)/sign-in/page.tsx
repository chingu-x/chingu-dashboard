import SignInContainer from "./components/SignInContainer";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";

export default function SignInPage() {
  return (
    <>
      <AuthBannerContainer />
      <SignInContainer />
    </>
  );
}
