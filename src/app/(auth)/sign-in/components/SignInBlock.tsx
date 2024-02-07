import SignInFormContainer from "./SignInFormContainer";
import SocialLoginButtonsContainer from "@/components/socialLoginButtonsContainer/SocialLoginButtonsContainer";

interface SignInBlockProps {
  handleResetPassword: () => void;
}

function SignInBlock({ handleResetPassword }: SignInBlockProps) {
  return (
    <>
      <div className="w-[400px] min-h-[652px] bg-base-200 rounded-2xl xl:ml-60 p-6">
        <p className="text-base-300 text-2xl text-center mt-2.5 mb-[26px] font-medium">
          Welcome to Chingu
        </p>
        <div className="flex flex-col items-center">
          <SocialLoginButtonsContainer />
          <div className="flex items-center mt-6 mb-8 w-full">
            <hr className="flex-grow border-neutral-content w-11/12" />
            <p className="mx-4 text-base-300 font-semibold">Or</p>
            <hr className="flex-grow border-neutral-content w-11/12" />
          </div>
        </div>
        <SignInFormContainer handleResetPassword={handleResetPassword} />
      </div>
    </>
  );
}

export default SignInBlock;
