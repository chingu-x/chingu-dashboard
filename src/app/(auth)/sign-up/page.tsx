import SignUpContainer from "./components/SignUpContainer";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";

export default function SignInPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      <AuthBannerContainer />
      <SignUpContainer />
    </div>
  );
}
