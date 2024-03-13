import SignInContainer from "./components/SignInContainer";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";

export default function SignInPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      <AuthBannerContainer />
      <SignInContainer />
    </div>
  );
}
