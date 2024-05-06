"use client";

import { useEffect } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import { validateTextInput } from "@/helpers/form/validateInput";
import { Section } from "@/store/features/sprint/sprintSlice";
import { ReviewQuestions, SprintSections } from "@/utils/sections";
import useServerAction from "@/hooks/useServerAction";
import {
  type EditSectionBody,
  editSection,
} from "@/myVoyage/sprints/sprintsService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";

const validationSchema = z.object({
  what_right: validateTextInput({
    inputName: "This field",
    required: true,
  }),
  what_to_improve: validateTextInput({
    inputName: "This field",
    required: true,
  }),
  what_to_change: validateTextInput({
    inputName: "This field",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

interface ReviewProps {
  data?: Section;
}

export default function Review({ data }: ReviewProps) {
  const dispatch = useAppDispatch();
  const params = useParams<{
    sprintNumber: string;
    meetingId: string;
  }>();

  const [sprintNumber, meetingId] = [
    Number(params.sprintNumber),
    Number(params.meetingId),
  ];

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
      what_right,
      what_to_improve,
      what_to_change,
    });
  }, [what_right, what_to_improve, what_to_change, reset]);

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
      const question = key as keyof typeof ReviewQuestions;
      const questionId: number = ReviewQuestions[question];
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
      formId: Number(SprintSections.review),
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
        className="self-center min-w-[75px]"
        disabled={!isDirty || !isValid || editSectionLoading}
      >
        {editSectionLoading ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}
