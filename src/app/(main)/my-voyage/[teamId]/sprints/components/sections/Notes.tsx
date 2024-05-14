"use client";

import { useEffect } from "react";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import { validateTextInput } from "@/utils/form/validateInput";
import useServerAction from "@/hooks/useServerAction";
import { editMeeting } from "@/myVoyage/sprints/sprintsService";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

const validationSchema = z.object({
  notes: validateTextInput({
    inputName: "This field",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

interface NotesProps {
  data?: string;
}

export default function Notes({ data }: NotesProps) {
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
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const {
    runAction: editMeetingAction,
    isLoading: editMeetingLoading,
    setIsLoading: setEditMeetingLoading,
  } = useServerAction(editMeeting);

  useEffect(() => {
    reset({
      notes: data,
    });
  }, [data, reset]);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const [res, error] = await editMeetingAction({
      ...data,
      meetingId,
      sprintNumber,
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
    setEditMeetingLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col pt-10 gap-y-2"
    >
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
        className="self-center min-w-[75px]"
        disabled={!isDirty || !isValid || editMeetingLoading}
      >
        {editMeetingLoading ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}
