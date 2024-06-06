import { useForm, type SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/app/(auth)/authService";
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/Button";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import { validateTextInput } from "@/helpers/form/validateInput";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";

const validationSchema = z.object({
  password: validateTextInput({
    inputName: "Password",
    required: true,
    minLen: 8,
    maxLen: 20,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

type NewPasswordContainerProps = {
  onClick: () => void;
};

function NewPasswordContainer({ onClick }: NewPasswordContainerProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const {
    runAction: resetPasswordAction,
    isLoading: resetPasswordLoading,
    setIsLoading: setResetPasswordLoading,
  } = useServerAction(resetPassword);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    if (token) {
      const [res, error] = await resetPasswordAction({
        password: data.password,
        token,
      });

      if (res) {
        onClick();
      }

      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
      }

      setResetPasswordLoading(false);
    }
  };

  function renderButtonContent() {
    if (resetPasswordLoading) {
      return <Spinner />;
    }
    return "Update New Password";
  }

  return (
    <div className="min-h-[349px] w-[400px] rounded-2xl bg-base-200 p-8 xl:ml-60">
      <p className="mb-8 text-center text-2xl font-medium text-base-300">
        Create New Password
      </p>
      <p className="pb-8 text-base font-medium text-base-300">
        Enter in a new password below to finish resetting your password.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="ml-0 flex flex-col">
        <div className="flex min-h-[90px] flex-col">
          <div className="flex flex-col">
            <TextInput
              type="password"
              id="password"
              label="password"
              placeholder="Enter Your Password"
              {...register("password")}
              errorMessage={errors.password?.message}
              maxLength={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Button
            type="submit"
            title="submit"
            disabled={!isDirty || !isValid || resetPasswordLoading}
          >
            {renderButtonContent()}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewPasswordContainer;
