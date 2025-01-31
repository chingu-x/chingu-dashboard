"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

import { Button } from "@chingu-x/components/button";
import { Spinner } from "@chingu-x/components/spinner";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/utils/form/validateInput";
import { type Section } from "@/store/features/sprint/sprintSlice";
import { PlanningQuestions, Forms } from "@/utils/form/formsEnums";
import useServerAction from "@/hooks/useServerAction";
import {
  editSection,
  type EditSectionBody,
} from "@/myVoyage/sprints/sprintsService";
import { useAppDispatch, useSprint } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

const validationSchema = z.object({
  goal: validateTextInput({
    inputName: "This field",
    required: true,
  }),
  timeline: validateTextInput({
    inputName: "This field",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function Planning() {
  const [data, setData] = useState<Section>();
  const dispatch = useAppDispatch();
  const params = useParams<{
    sprintNumber: string;
    meetingId: string;
  }>();

  const [sprintNumber, meetingId] = [
    Number(params.sprintNumber),
    Number(params.meetingId),
  ];

  const {
    voyage: { sprints },
  } = useSprint();

  useEffect(() => {
    const sprint = sprints[sprintNumber - 1];
    if (sprint.teamMeetingsData && sprint.teamMeetingsData.length) {
      setData(
        sprint.teamMeetingsData[0].formResponseMeeting?.find(
          (form) => form.form.id === Number(Forms.planning),
        ),
      );
    }
  }, [sprints, sprintNumber]);

  const goal = data?.responseGroup.responses.find(
    (response) => response.question.id === Number(PlanningQuestions.goal),
  )?.text;
  const timeline = data?.responseGroup.responses.find(
    (response) => response.question.id === Number(PlanningQuestions.timeline),
  )?.text;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const {
    runAction: editSectionAction,
    isLoading: editSectionLoading,
    setIsLoading: setEditSectionLoading,
  } = useServerAction(editSection);

  useEffect(() => {
    reset({
      goal,
      timeline,
    });
  }, [goal, timeline, reset]);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    // Get only modified data
    interface MyObject extends EditSectionBody {
      [key: string]: unknown;
    }

    const filteredData: MyObject = {};

    for (const key in dirtyFields) {
      if (dirtyFields.hasOwnProperty(key)) {
        filteredData[key] = (data as { [key: string]: string })[key];
      }
    }

    // Create a necessary object
    type ResponseType = { questionId: number; text: string }[];
    const responses = [] as ResponseType;

    for (const [key, value] of Object.entries(filteredData)) {
      const question = key as keyof typeof PlanningQuestions;
      const questionId: number = PlanningQuestions[question];
      const text = value as string;
      const response = {
        questionId,
        text,
      };
      responses.push(response);
    }

    const [res, error] = await editSectionAction({
      responses,
      meetingId,
      sprintNumber,
      formId: Number(Forms.planning),
    });
    if (res) {
      reset({ ...data });
    }
    if (error) {
      dispatch(
        onOpenModal({
          type: "error",
          content: { message: error.message },
        }),
      );
    }
    setEditSectionLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 pt-10"
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
        className="min-w-[75px] self-center"
        disabled={!isDirty || !isValid || editSectionLoading}
      >
        {editSectionLoading ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}
