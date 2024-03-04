"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";

import { validateTextInput } from "@/helpers/form/validateInput";

const validationSchema = z.object({
  notes: validateTextInput({
    inputName: "notes",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function Notes() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <Textarea
        id="notes"
        placeholder="Add any notes for this meeting here"
        rows={2}
        {...register("notes")}
        errorMessage={errors.notes?.message}
      />
      <Button
        type="submit"
        variant="outline"
        size="md"
        className="self-center"
        disabled={!isDirty || !isValid}
      >
        Save
      </Button>
    </form>
  );
}
