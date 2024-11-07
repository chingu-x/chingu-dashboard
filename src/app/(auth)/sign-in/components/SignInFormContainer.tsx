import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/utils/form/validateInput";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import routePaths from "@/utils/routePaths";
import { type AuthClientAdapter } from "@/modules/auth/adapters/primary/authClientAdapter";
import { TYPES } from "@/di/types";
import { resolve } from "@/di/resolver";
import { LoginRequestDto } from "@/modules/auth/application/dtos/request.dto";
import { useMutation } from "@tanstack/react-query";
import { LoginResponseDto } from "@/modules/auth/application/dtos/response.dto";

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

  const { mutate, isLoading, isError, error } = useMutation<
    LoginResponseDto,
    Error,
    LoginRequestDto
  >({
    mutationFn: loginMutation,
    onSuccess: () => {
      dispatch(clientSignIn());
      router.replace(routePaths.dashboardPage());
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  async function loginMutation({
    email,
    password,
  }: LoginRequestDto): Promise<LoginResponseDto> {
    const authAdapter = resolve<AuthClientAdapter>(TYPES.AuthClientAdapter);
    return await authAdapter.login({ email, password });
  }

  // TODO: update error handling
  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  function renderButtonContent() {
    return "Sign In";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex min-h-[90px] flex-col">
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
            className="ml-1 mt-2 cursor-pointer text-xs font-medium text-base-300"
          >
            Forgot your password?
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Button
          type="submit"
          title="submit"
          // disabled={!isDirty || !isValid || serverSignInLoading}
        >
          {renderButtonContent()}
        </Button>
        <Link
          href={routePaths.signUp()}
          className="mb-[10px] ml-1 self-center text-xs font-semibold text-neutral-focus"
        >
          Don’t have an account? Sign up for an account now
        </Link>
      </div>
    </form>
  );
}

export default SignInFormContainer;
