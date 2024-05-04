import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import routePaths from "@/utils/routePaths";

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
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface SignUpFormContainerProps {
  handleConfirmationContainer: () => void;
}

function SignUpFormContainer({
  handleConfirmationContainer,
}: SignUpFormContainerProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = () => {
    handleConfirmationContainer();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      <div className="flex flex-col min-h-[90px]">
        <div className="flex flex-col">
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
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-8">
        <Button
          type="submit"
          title="submit"
          disabled
        >
          Join Now
        </Button>
        <Link
          href={routePaths.signIn()}
          className="font-semibold text-xs text-neutral-focus ml-1 self-center mb-[10px]"
        >
          Already have an account? Sign in now
        </Link>
      </div>
    </form>
  );
}

export default SignUpFormContainer;
