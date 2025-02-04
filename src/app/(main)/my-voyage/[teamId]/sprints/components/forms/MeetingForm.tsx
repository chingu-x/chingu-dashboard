"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkIcon } from "@heroicons/react/24/outline";
import type {
  AddMeetingClientRequestDto,
  AddMeetingResponseDto,
  Meeting,
} from "@chingu-x/modules/sprint-meeting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/Button";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";
import Spinner from "@/components/Spinner";
import {
  validateDateTimeInput,
  validateTextInput,
} from "@/utils/form/validateInput";
import { useSprint, useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import routePaths from "@/utils/routePaths";
import { persistor } from "@/store/store";
import convertStringToDate from "@/utils/convertStringToDate";
import { sprintMeetingAdapter, timezoneAdapter } from "@/utils/adapters";
import { CacheTag } from "@/utils/cacheTag";

export default function MeetingForm() {
  const router = useRouter();
  const params = useParams<{
    teamId: string;
    sprintNumber: string;
    meetingId: string;
  }>();
  const [teamId, sprintNumber, meetingId] = [
    params.teamId,
    params.sprintNumber,
    params.meetingId,
  ];

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { sprints } = useSprint();
  const { timezone } = useUser();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [meetingData, setMeetingData] = useState<Meeting>();

  const sprint = sprints.find((sprint) => sprint.number === +sprintNumber)!;

  const validationSchema = z.object({
    title: validateTextInput({
      inputName: "Title",
      required: true,
      maxLen: 50,
    }),
    description: validateTextInput({
      inputName: "Description",
      required: true,
    }),
    dateTime: validateDateTimeInput({
      minDate: convertStringToDate(sprint?.startDate, timezone),
      maxDate: convertStringToDate(sprint?.endDate, timezone),
      timezone,
    }),
    meetingLink: validateTextInput({
      inputName: "Meeting link",
      isUrl: true,
    }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const { title, description, dateTime, meetingLink } = watch();

  const setCustomValue = (id: "dateTime", value: Date) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const { mutate: addMeeting, isPending: addMeetingPending } = useMutation<
    AddMeetingResponseDto,
    Error,
    AddMeetingClientRequestDto
  >({
    mutationFn: addMeetingMutation,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: [CacheTag.sprints, CacheTag.sprintMeetingId],
      });
      router.push(
        routePaths.sprintWeekPage(teamId, sprintNumber, data.id.toString()),
      );
    },
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  const { mutate: editMeeting, isPending: editMeetingPending } = useMutation<
    AddMeetingResponseDto,
    Error,
    AddMeetingClientRequestDto
  >({
    mutationFn: addMeetingMutation,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: [CacheTag.sprints, CacheTag.sprintMeetingId],
      });
      router.push(
        routePaths.sprintWeekPage(teamId, sprintNumber, data.id.toString()),
      );
    },
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  async function addMeetingMutation({
    data,
    teamId,
    sprintNumber,
    timezone,
  }: AddMeetingClientRequestDto): Promise<AddMeetingResponseDto> {
    return await sprintMeetingAdapter.addMeeting({
      data,
      teamId,
      sprintNumber,
      timezone,
    });
  }

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    if (editMode) {
      // const [res, error] = await editMeetingAction({
      //   ...newData,
      //   dateTime,
      //   meetingId,
      //   sprintNumber,
      // });
      // if (res) {
      //   router.push(
      //     routePaths.sprintWeekPage(
      //       teamId.toString(),
      //       sprintNumber.toString(),
      //       meetingId.toString(),
      //     ),
      //   );
      // }
      // if (error) {
      //   dispatch(
      //     onOpenModal({ type: "error", content: { message: error.message } }),
      //   );
      //   setEditMeetingLoading(false);
      // }
    } else {
      addMeeting({ data, teamId, sprintNumber, timezone });
    }
  };

  useEffect(() => {
    if (params.meetingId) {
      const meeting = sprintMeetingAdapter.getCurrentSprintMeeting({
        sprints,
        meetingId,
      });

      setMeetingData(meeting as Meeting);
      setEditMode(true);
    }
  }, [params.meetingId, sprints, meetingId]);

  useEffect(() => {
    if (meetingData && meetingData.dateTime) {
      const meetingLongDateTimeFormat =
        timezoneAdapter.getMeetingLongDateTimeFormat({
          meetingDateTime: meetingData?.dateTime,
          timezone,
        });

      reset({
        title: meetingData?.title,
        description: meetingData?.description,
        meetingLink: meetingData?.meetingLink,
        dateTime: meetingLongDateTimeFormat,
      });
    }
  }, [meetingData, reset, timezone]);

  useEffect(
    () => () => {
      void persistor.purge();
    },
    [],
  );

  function renderButtonContent() {
    if (editMeetingPending || addMeetingPending) {
      return <Spinner />;
    }

    return editMode ? "Save Changes" : "Save";
  }

  return (
    <div className="mx-auto flex w-full max-w-[871px] flex-col items-center rounded-2xl bg-base-200 p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-4"
      >
        <div className="mb-6 flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold text-base-300">
            {editMode ? "Edit" : "Create"} Meeting
          </h2>
          <p className="text-lg font-medium text-base-300">
            {editMode ? "Edit the" : "Create a new"} meeting for your team.
          </p>
        </div>
        <TextInput
          id="title"
          label="title"
          placeholder="ex. Sprint Planning, Standup, etc."
          {...register("title")}
          errorMessage={errors.title?.message}
          maxLength={50}
          defaultValue={meetingData?.title ?? ""}
        />
        <Textarea
          id="description"
          label="description"
          placeholder="Please provide a brief description of the goals for this meeting."
          {...register("description")}
          errorMessage={errors.description?.message}
          defaultValue={meetingData?.description ?? ""}
        />
        <DateTimePicker
          id="date"
          placeholder="Select meeting date and time"
          label="Date & Time"
          selectedValue={dateTime}
          {...register("dateTime")}
          errorMessage={errors?.dateTime?.message}
          onChange={(value: Date) => setCustomValue("dateTime", value)}
        />
        <TextInput
          id="meetingLink"
          label="Meeting link"
          inputGroupContent={<LinkIcon />}
          placeholder="Provide a link to the meeting"
          {...register("meetingLink")}
          errorMessage={errors.meetingLink?.message}
          defaultValue={meetingData?.meetingLink ?? ""}
        />
        <Button
          type="submit"
          title="submit"
          disabled={
            !isDirty || !isValid || editMeetingPending || addMeetingPending
          }
          size="lg"
          variant="primary"
        >
          {renderButtonContent()}
        </Button>
        <Button
          type="button"
          title="cancel"
          size="lg"
          variant="link"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
