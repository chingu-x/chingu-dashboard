import BannerContainer from "./components/BannerContainer";
import SignInModalContainer from "./components/SignInContainer";

export default function SignInPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      <BannerContainer />
      <SignInModalContainer />
    </div>
  );
}
