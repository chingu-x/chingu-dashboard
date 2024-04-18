"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";

import { validateTextInput } from "@/helpers/form/validateInput";
import { Section } from "@/store/features/sprint/sprintSlice";
import { PlanningQuestions } from "@/utils/sections";

const validationSchema = z.object({
  goal: validateTextInput({
    inputName: "Sprint Goal",
  }),
  timeline: validateTextInput({
    inputName: "Timeline/Tasks",
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

interface PlanningProps {
  data?: Section;
}

export default function Planning({ data }: PlanningProps) {
  const goal = data?.responseGroup.responses.find(
    (response) => response.question.id === Number(PlanningQuestions.goal),
  )?.text;
  const timeline = data?.responseGroup.responses.find(
    (response) => response.question.id === Number(PlanningQuestions.timeline),
  )?.text;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      goal: goal ?? "",
      timeline: timeline ?? "",
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
        id="goal"
        label="Sprint Goal"
        placeholder="What is the primary goal of the next sprint?"
        rows={2}
        {...register("goal")}
        errorMessage={errors.goal?.message}
        defaultValue={goal ?? ""}
      />
      <Textarea
        id="timeline"
        label="Timeline/Tasks"
        placeholder="What are some of the goals we want to achieve during this sprint? What are some milestones & deadlines to reach during this sprint?"
        rows={2}
        {...register("timeline")}
        errorMessage={errors.timeline?.message}
        defaultValue={timeline ?? ""}
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
