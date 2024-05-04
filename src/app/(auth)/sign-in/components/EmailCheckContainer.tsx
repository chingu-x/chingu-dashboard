import { Dispatch, SetStateAction } from "react";
import { ContainerState } from "./SignInContainer";
import Button from "@/components/Button";
import Banner from "@/components/banner/Banner";

type ResendEmailContainerProp = {
  handleResendEmail: () => void;
  setContainerState: Dispatch<SetStateAction<ContainerState>>;
};

function EmailCheckContainer({
  handleResendEmail,
  setContainerState,
}: ResendEmailContainerProp) {
  function handleClick() {
    setContainerState(ContainerState.SignIn);
  }

  return (
    <div className="flex flex-col items-center w-[400px] min-h-[652px] bg-base-200 rounded-2xl xl:ml-60 px-6 py-9">
      <p className="text-base-300 text-2xl text-center mb-[26px] font-medium">
        Welcome to Chingu
      </p>
      <div>
        <Banner
          imageLight="/img/link_retro_mac_light.png"
          imageDark="/img/link_retro_mac_dark.png"
          height="h-[171px]"
          width="w-[168px]"
          alt="Email confirmation image"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base-300 text-xl font-medium mt-8">
          Check Your Email Address
        </p>
        <p className="text-base-300 text-base font-medium">
          If that email address exists, we will send an email to it with a link
          to reset your password. Please open it and click on the link in it to
          reset your password.
        </p>
        <p className="text-base-300 text-base font-medium mt-6 mb-[60px] 3xl:mb-[166px]">
          If you have not received an email shortly, then please check your
          spam/trash folders or click the button below to request a new reset
          email.
        </p>
      </div>
      <Button
        onClick={handleResendEmail}
        className="text-base gap-x-0 border-none font-semibold capitalize bg-base-100 text-base-300 hover:bg-base-100 w-full"
      >
        Resend Email
      </Button>
      <Button
        variant="link"
        onClick={handleClick}
      >
        Go Back
      </Button>
    </div>
  );
}

export default EmailCheckContainer;
