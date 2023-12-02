import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";

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

interface SignUpFormContainerProps {
  handleSubmit: () => void;
}

function SignUpFormContainer({ handleSubmit }: SignUpFormContainerProps) {
  const {
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
      <div className="flex flex-col min-h-[90px]">
        <div className="flex flex-col">
          <TextInput
            id="email"
            label="email"
            placeholder="Enter Your Email"
            register={register("email")}
            errors={errors}
          />
          <TextInput
            id="password"
            label="password"
            placeholder="Enter Your Password"
            register={{ ...register("password") }}
            errors={errors}
            maxLength={30}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-8">
        <Button
          type="submit"
          title="submit"
          customClassName="text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus"
        >
          Join Now
        </Button>
        <Link
          href={"/sign-in"}
          className="font-semibold text-xs text-base-300 ml-1 self-center mb-[10px]"
        >
          Already have an account? Sign in now
        </Link>
      </div>
    </form>
  );
}

export default SignUpFormContainer;
