import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";

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
}

function ResetPasswordContainer({
  handleEmailCheck,
}: ResetPasswordContainerProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    handleEmailCheck();
  };

  return (
    <div className="flex flex-col items-center w-[400px] min-h-[377px] bg-base-200 rounded-2xl xl:ml-60 px-6 py-9">
      <p className="text-base-300 text-2xl text-center mb-8 font-medium">
        Reset Password
      </p>
      <p className="text-base-300 text-base font-medium mb-8">
        Enter your email below and we’ll send you a link to reset your password
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden w-full"
      >
        <TextInput
          id="email"
          label="email"
          placeholder="Enter Your Email"
          {...register("email")}
          defaultValue=""
          errorMessage={errors?.email?.message}
        />
        <Button
          type="submit"
          title="submit"
          className="text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus mb-3 mt-2"
        >
          Send reset link
        </Button>
        <Link
          href={"/sign-up"}
          className="font-semibold text-xs text-base-300 ml-1 self-center"
        >
          Don’t have an account? Sign up for an account now
        </Link>
      </form>
    </div>
  );
}

export default ResetPasswordContainer;
