import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type {
  LoginClientRequestDto,
  LoginResponseDto,
} from "@chingu-x/modules/auth";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/utils/form/validateInput";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import routePaths from "@/utils/routePaths";
import Spinner from "@/components/Spinner";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { authAdapter } from "@/utils/adapters";

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

  const { mutate, isPending } = useMutation<
    LoginResponseDto,
    Error,
    LoginClientRequestDto
  >({
    mutationFn: loginMutation,
    onSuccess: () => {
      dispatch(clientSignIn());
      router.replace(routePaths.dashboardPage());
    },
    // TODO: update error handling
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  async function loginMutation({
    email,
    password,
  }: LoginClientRequestDto): Promise<LoginResponseDto> {
    return await authAdapter.login({ email, password });
  }

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  function renderButtonContent() {
    return isPending ? <Spinner /> : "Sign In";
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
          disabled={!isDirty || !isValid || isPending}
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
