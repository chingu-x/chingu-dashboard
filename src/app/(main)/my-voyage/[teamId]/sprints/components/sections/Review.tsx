"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";

import { validateTextInput } from "@/helpers/form/validateInput";

const validationSchema = z.object({
  what_right: validateTextInput({
    inputName: "what_right",
    required: true,
  }),
  what_to_improve: validateTextInput({
    inputName: "what_to_improve",
    required: true,
  }),
  what_to_change: validateTextInput({
    inputName: "what_to_change",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function Review() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col pt-10 gap-y-2"
    >
      <Textarea
        id="what_right"
        label="What went right?"
        placeholder="Share your thoughts on what went right."
        rows={2}
        {...register("what_right")}
        errorMessage={errors.what_right?.message}
      />
      <Textarea
        id="what_to_improve"
        label="What could be improved?"
        placeholder="Share your thoughts on what could be improved for the next sprint."
        rows={2}
        {...register("what_to_improve")}
        errorMessage={errors.what_to_improve?.message}
      />
      <Textarea
        id="what_to_change"
        label="Changes to be made for the next Sprint?"
        placeholder="Share your thoughts on what could change for the next sprint."
        rows={2}
        {...register("what_to_change")}
        errorMessage={errors.what_to_change?.message}
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
