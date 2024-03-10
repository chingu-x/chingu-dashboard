"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useDirectory } from "@/store/hooks";

interface EditHoursProps {
  hrPerSprint: number;
}

const validationSchema = z.object({
  title: validateTextInput({
    inputName: "Title",
    required: true,
    minLen: 10,
    maxLen: 50,
  }),
  description: validateTextInput({
    inputName: "Description",
    required: true,
    minLen: 10,
  }),
  vision: validateTextInput({
    inputName: "Vision statement",
    required: true,
    minLen: 10,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function EditHours({ hrPerSprint }: EditHoursProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={() => {}}
        id="hoursPerSprint"
        label="hoursPerSprint"
        {...register("hoursPerSprint")}
        errorMessage={errors.title?.message}
        onChange={() => {}}
        placeholder={`${hrPerSprint}`}
        defaultValue={`${hrPerSprint}`}
        submitButtonText="Save"
      />
    </form>
  );
}
