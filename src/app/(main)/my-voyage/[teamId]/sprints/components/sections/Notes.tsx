"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  EditMeetingClientRequestDto,
  EditMeetingResponseDto,
} from "@chingu-x/modules/sprint-meeting";
import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import { validateTextInput } from "@/utils/form/validateInput";
import { useAppDispatch, useSprintMeeting } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { sprintMeetingAdapter } from "@/utils/adapters";
import { CacheTag } from "@/utils/cacheTag";
import { editMeetingState } from "@/store/features/sprint-meeting/sprintMeetingSlice";

const validationSchema = z.object({
  notes: validateTextInput({
    inputName: "This field",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function Notes() {
  const [data, setData] = useState<string>();
  const dispatch = useAppDispatch();
  const params = useParams<{
    sprintNumber: string;
    meetingId: string;
  }>();
  const queryClient = useQueryClient();

  const [meetingId] = [params.meetingId];
  const meeting = useSprintMeeting();

  useEffect(() => {
    const meetingNote = sprintMeetingAdapter.getSprintMeeting({
      meeting,
      meetingId,
    })?.notes;

    setData(meetingNote);
  }, [meeting, meetingId]);

  const { mutate: editMeeting, isPending: editMeetingPending } = useMutation<
    EditMeetingResponseDto,
    Error,
    EditMeetingClientRequestDto
  >({
    mutationFn: editMeetingMutation,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: [CacheTag.sprints, CacheTag.sprintMeetingId],
      });
      dispatch(editMeetingState(data));
    },
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  async function editMeetingMutation({
    meetingId,
    ...data
  }: EditMeetingClientRequestDto): Promise<EditMeetingResponseDto> {
    return await sprintMeetingAdapter.editMeeting({
      meetingId,
      ...data,
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    editMeeting({ meetingId, ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 pt-10"
    >
      <Textarea
        id="notes"
        placeholder="Add any notes for this meeting here"
        rows={2}
        {...register("notes")}
        errorMessage={errors.notes?.message}
        defaultValue={data ?? ""}
      />
      <Button
        type="submit"
        variant="outline"
        size="md"
        className="min-w-[75px] self-center"
        disabled={!isDirty || !isValid || editMeetingPending}
      >
        {editMeetingPending ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}
