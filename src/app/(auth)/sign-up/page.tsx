"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";

const validationSchema = z.object({
  suggestion: validateTextInput({
    inputName: "Suggestion",
    required: true,
    maxLen: 30,
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
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <TextInput
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            register={{ ...register("suggestion") }}
            errors={errors}
            suggestion="Tip: keep it short and sweet"
            maxLength={30}
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <TextInput
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            register={{ ...register("suggestion") }}
            errors={errors}
            suggestion="Tip: keep it short and sweet"
            maxLength={30}
          />
        </div>
        <Button size="lg" className="w-full" type="submit">
          Join now
        </Button>
      </form>
    </div>
  );
}
