import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Dispatch, type SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import { validateTextInput } from "@/utils/form/validateInput";
import routePaths from "@/utils/routePaths";
import Spinner from "@/components/Spinner";
import { type RequestResetPasswordDto } from "@/modules/auth/application/dtos/request.dto";
import { type AuthClientAdapter } from "@/modules/auth/adapters/primary/authClientAdapter";
import { TYPES } from "@/di/types";
import { resolve } from "@/di/resolver";

const validationSchema = z.object({
  email: validateTextInput({
    inputName: "Email",
    required: true,
    isEmail: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface ResetPasswordContainerProps {
  handleEmailCheck: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
}

function ResetPasswordContainer({
  handleEmailCheck,
  setEmail,
}: ResetPasswordContainerProps) {
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation<
    void,
    Error,
    RequestResetPasswordDto
  >({
    mutationFn: requestResetPasswordMutation,
    onSuccess: (_, variables) => {
      handleEmailCheck();
      setEmail(variables.email);
    },
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
    const authAdapter = resolve<AuthClientAdapter>(TYPES.AuthClientAdapter);
    return await authAdapter.requestResetPassword({ email });
  }

  function renderButtonContent() {
    return isPending ? <Spinner /> : "Send reset link";
  }

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    const { email } = data;
    mutate({ email });
  };

  return (
    <div className="flex min-h-[377px] w-[400px] flex-col items-center rounded-2xl bg-base-200 px-6 py-9 xl:ml-60">
      <p className="mb-8 text-center text-2xl font-medium text-base-300">
        Reset Password
      </p>
      <p className="mb-8 text-base font-medium text-base-300">
        Enter your email below and we’ll send you a link to reset your password
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <TextInput
          id="email"
          label="email"
          placeholder="Enter Your Email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <Button
          type="submit"
          title="submit"
          className="my-3"
          disabled={!isDirty || !isValid || isPending}
        >
          {renderButtonContent()}
        </Button>
        <Link
          href={routePaths.signUp()}
          className="ml-1 self-center text-xs font-semibold text-neutral-focus"
        >
          Don’t have an account? Sign up for an account now
        </Link>
      </form>
    </div>
  );
}

export default ResetPasswordContainer;
