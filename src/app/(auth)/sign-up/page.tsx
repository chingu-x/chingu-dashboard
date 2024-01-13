"use client";

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
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function Component() {
  const {
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className="w-full max-w-md px-8 py-6 space-y-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-extrabold text-center text-gray-900">
        Register
      </h2>
      <form className="space-y-6">
        <div>
          <TextInput
            id="email"
            label="email"
            placeholder="Enter your email"
            {...register("email")}
            errorMessage={errors?.["email"]?.message}
          />
        </div>
        <div>
          <TextInput
            id="password"
            label="password"
            placeholder="Enter your password"
            {...register("password")}
            errorMessage={errors?.["password"]?.message}
          />
        </div>
        <Button size="lg" className="w-full" type="submit">
          Join now
        </Button>
      </form>
    </div>
  );
}
