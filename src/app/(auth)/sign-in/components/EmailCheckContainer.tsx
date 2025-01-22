import { type Dispatch, type SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { type RequestResetPasswordDto } from "@chingu-x/modules/auth";
import { ContainerState } from "./SignInContainer";
import Button from "@/components/Button";
import Banner from "@/components/banner/Banner";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";
import { authAdapter } from "@/utils/adapters";

type ResendEmailContainerProp = {
  email: string;
  setContainerState: Dispatch<SetStateAction<ContainerState>>;
};

function EmailCheckContainer({
  email,
  setContainerState,
}: ResendEmailContainerProp) {
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation<
    void,
    Error,
    RequestResetPasswordDto
  >({
    mutationFn: requestResetPasswordMutation,
    // TODO: update error handling
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  async function requestResetPasswordMutation({
    email,
  }: RequestResetPasswordDto): Promise<void> {
    return await authAdapter.requestResetPassword({ email });
  }

  function handleResendEmail() {
    mutate({ email });
  }

  function renderButtonContent() {
    return isPending ? <Spinner /> : "Resend Email";
  }

  function handleClick() {
    setContainerState(ContainerState.SignIn);
  }

  return (
    <div className="flex min-h-[652px] w-[400px] flex-col items-center rounded-2xl bg-base-200 px-6 py-9 xl:ml-60">
      <p className="mb-[26px] text-center text-2xl font-medium text-base-300">
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
        <p className="mb-2 mt-8 text-xl font-medium text-base-300">
          Check Your Email Address
        </p>
        <p className="text-base font-medium text-base-300">
          If that email address exists, we will send an email to it with a link
          to reset your password. Please open it and click on the link in it to
          reset your password.
        </p>
        <p className="mb-[60px] mt-6 text-base font-medium text-base-300 3xl:mb-[166px]">
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
