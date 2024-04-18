"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";

import { validateTextInput } from "@/helpers/form/validateInput";
import { Section } from "@/store/features/sprint/sprintSlice";
import { ReviewQuestions } from "@/utils/sections";

const validationSchema = z.object({
  what_right: validateTextInput({
    inputName: "what_right",
  }),
  what_to_improve: validateTextInput({
    inputName: "what_to_improve",
  }),
  what_to_change: validateTextInput({
    inputName: "what_to_change",
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

interface ReviewProps {
  data?: Section;
}

export default function Review({ data }: ReviewProps) {
  const what_right = data?.responseGroup.responses.find(
    (response) => response.question.id === Number(ReviewQuestions.what_right),
  )?.text;
  const what_to_improve = data?.responseGroup.responses.find(
    (response) =>
      response.question.id === Number(ReviewQuestions.what_to_improve),
  )?.text;
  const what_to_change = data?.responseGroup.responses.find(
    (response) =>
      response.question.id === Number(ReviewQuestions.what_to_change),
  )?.text;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      what_right: what_right ?? "",
      what_to_improve: what_to_improve ?? "",
      what_to_change: what_to_change ?? "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

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
        defaultValue={what_right ?? ""}
      />
      <Textarea
        id="what_to_improve"
        label="What could be improved?"
        placeholder="Share your thoughts on what could be improved for the next sprint."
        rows={2}
        {...register("what_to_improve")}
        errorMessage={errors.what_to_improve?.message}
        defaultValue={what_to_improve ?? ""}
      />
      <Textarea
        id="what_to_change"
        label="Changes to be made for the next Sprint?"
        placeholder="Share your thoughts on what could change for the next sprint."
        rows={2}
        {...register("what_to_change")}
        errorMessage={errors.what_to_change?.message}
        defaultValue={what_to_change ?? ""}
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
