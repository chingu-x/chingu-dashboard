import { type Dispatch, type SetStateAction } from "react";
import { ContainerState } from "./SignInContainer";
import Button from "@/components/Button";
import Banner from "@/components/banner/Banner";
import { useAppDispatch } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import { resetPasswordRequestEmail } from "@/app/(auth)/authService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";

type ResendEmailContainerProp = {
  email: string;
  setContainerState: Dispatch<SetStateAction<ContainerState>>;
};

function EmailCheckContainer({
  email,
  setContainerState,
}: ResendEmailContainerProp) {
  const dispatch = useAppDispatch();

  const {
    runAction: resetPwdReqEmailAction,
    isLoading: resetPwdReqEmailLoading,
    setIsLoading: setResetPwdReqEmailLoading,
  } = useServerAction(resetPasswordRequestEmail);

  async function handleResendEmail() {
    const [, error] = await resetPwdReqEmailAction(email);

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }

    setResetPwdReqEmailLoading(false);
  }

  function renderButtonContent() {
    if (resetPwdReqEmailLoading) {
      return <Spinner />;
    }
    return "Resend Email";
  }

  function handleClick() {
    setContainerState(ContainerState.SignIn);
  }

  return (
    <div className="flex flex-col items-center w-[400px] min-h-[652px] bg-base-200 rounded-2xl xl:ml-60 px-6 py-9">
      <p className="text-base-300 text-2xl text-center mb-[26px] font-medium">
        Reset Link Sent
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
        <p className="text-base-300 text-xl font-medium mt-8 mb-2">
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
        type="button"
        onClick={handleResendEmail}
        variant="outline"
        className="w-full"
      >
        {renderButtonContent()}
      </Button>
      <Button type="button" variant="link" onClick={handleClick}>
        Go Back
      </Button>
    </div>
  );
}

export default EmailCheckContainer;
