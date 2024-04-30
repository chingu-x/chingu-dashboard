"use client";
import { useForm, SubmitHandler } from "react-hook-form";
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
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const {
    runAction: resetPasswordAction,
    isLoading: resetPasswordLoading,
    setIsLoading: setResetPassword,
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
          onOpenModal({ type: "error", content: { message: error.message } })
        );
        setResetPassword(false);
      }
    }
  };

  function renderButtonContent() {
    if (resetPasswordLoading) {
      return <Spinner />;
    }
    return "Update New Password";
  }

  return (
    <div className="w-[400px] min-h-[349px] bg-base-200 rounded-2xl p-8 xl:ml-60">
      <p className="text-base-300 text-2xl text-center mb-8 font-medium">
        Create New Password
      </p>
      <p className="text-base-300 text-base font-medium pb-8">
        Enter in a new password below to finish resetting your password.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden ml-0"
      >
        <div className="flex flex-col min-h-[90px]">
          <div className="flex flex-col">
            <TextInput
              type="password"
              id="password"
              label="password"
              placeholder="Enter Your Password"
              {...register("password")}
              errorMessage={errors?.password?.message}
              maxLength={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Button
            type="submit"
            title="submit"
            className="text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus"
          >
            {renderButtonContent()}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewPasswordContainer;
