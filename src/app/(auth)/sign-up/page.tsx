import BannerContainer from "./components/BannerContainer";
import SignUpModalContainer from "./components/SignUpModalContainer";

export default function SignInPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      <BannerContainer />
      <SignUpModalContainer />
    </div>
  );
}
