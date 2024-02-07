import BannerContainer from "./components/BannerContainer";
import SignUpContainer from "./components/SignUpContainer";

export default function SignInPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      <BannerContainer />
      <SignUpContainer />
    </div>
  );
}
