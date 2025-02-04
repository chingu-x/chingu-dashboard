import { type Dispatch, type SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import type {
  RequestResetPasswordClientRequestDto,
  RequestResetPasswordResponseDto,
} from "@chingu-x/modules/auth";
import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";
import { authAdapter } from "@/utils/adapters";
import { ContainerState } from "@/app/(auth)/sign-in/page";

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
    RequestResetPasswordResponseDto,
    Error,
    RequestResetPasswordClientRequestDto
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
  }: RequestResetPasswordClientRequestDto): Promise<RequestResetPasswordResponseDto> {
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
          imageLight={
            <Image
              src="/img/link_retro_mac_light.png"
              alt="Email confirmation light image"
              fill={true}
              sizes="168px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/link_retro_mac_dark.png"
              alt="Email confirmation dark image"
              fill={true}
              sizes="168px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          height="h-[171px]"
          width="w-[168px]"
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
