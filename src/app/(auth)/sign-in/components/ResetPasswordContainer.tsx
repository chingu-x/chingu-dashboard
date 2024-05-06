import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Dispatch, type SetStateAction } from "react";
import { resetPasswordRequestEmail } from "@/app/(auth)/authService";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import { validateTextInput } from "@/helpers/form/validateInput";
import routePaths from "@/utils/routePaths";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";

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

  const {
    runAction: resetPwdReqEmailAction,
    isLoading: resetPwdReqEmailLoading,
    setIsLoading: setResetPwdReqEmailLoading,
  } = useServerAction(resetPasswordRequestEmail);

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { email } = data;
    const [res, error] = await resetPwdReqEmailAction(email);

    if (res) {
      handleEmailCheck();
      setEmail(email);
    }

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }

    setResetPwdReqEmailLoading(false);
  };

  function renderButtonContent() {
    if (resetPwdReqEmailLoading) {
      return <Spinner />;
    }
    return "Send reset link";
  }

  return (
    <div className="flex flex-col items-center w-[400px] min-h-[377px] bg-base-200 rounded-2xl xl:ml-60 px-6 py-9">
      <p className="text-base-300 text-2xl text-center mb-8 font-medium">
        Reset Password
      </p>
      <p className="text-base-300 text-base font-medium mb-8">
        Enter your email below and we’ll send you a link to reset your password
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
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
          className="mt-3 mb-3"
          disabled={!isDirty || !isValid || resetPwdReqEmailLoading}
        >
          {renderButtonContent()}
        </Button>
        <Link
          href={routePaths.signUp()}
          className="font-semibold text-xs text-neutral-focus ml-1 self-center"
        >
          Don’t have an account? Sign up for an account now
        </Link>
      </form>
    </div>
  );
}

export default ResetPasswordContainer;
