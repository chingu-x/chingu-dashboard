import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serverSignIn } from "@/app/(auth)/authService";

import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import routePaths from "@/utils/routePaths";

import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";

const validationSchema = z.object({
  email: validateTextInput({
    inputName: "Email",
    required: true,
    isEmail: true,
  }),
  password: validateTextInput({
    inputName: "Password",
    required: true,
    minLen: 8,
    maxLen: 20,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface SignInFormContainerProps {
  handleResetPassword: () => void;
}

function SignInFormContainer({
  handleResetPassword,
}: SignInFormContainerProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    runAction: serverSignInAction,
    isLoading: serverSignInLoading,
    setIsLoading: setServerSignInLoading,
  } = useServerAction(serverSignIn);

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { email, password } = data;
    const [res, error] = await serverSignInAction({ email, password });

    if (res) {
      dispatch(clientSignIn());
      router.replace(routePaths.dashboardPage());
    }

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
      setServerSignInLoading(false);
    }
  };

  function renderButtonContent() {
    if (serverSignInLoading) {
      return <Spinner />;
    }
    return "Sign In";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex flex-col min-h-[90px]">
        <div className="flex flex-col gap-y-2">
          <TextInput
            id="email"
            label="email"
            placeholder="Enter Your Email"
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <TextInput
            type="password"
            id="password"
            label="password"
            placeholder="Enter Your Password"
            {...register("password")}
            errorMessage={errors.password?.message}
            maxLength={30}
          />
          <div
            onClick={handleResetPassword}
            className="cursor-pointer font-medium text-xs text-base-300 ml-1 mt-2"
          >
            Forgot your password?
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Button
          type="submit"
          title="submit"
          disabled={!isDirty || !isValid || serverSignInLoading}
        >
          {renderButtonContent()}
        </Button>
        <Link
          href={routePaths.signUp()}
          className="font-semibold text-xs text-neutral-focus ml-1 self-center mb-[10px]"
        >
          Don’t have an account? Sign up for an account now
        </Link>
      </div>
    </form>
  );
}

export default SignInFormContainer;
