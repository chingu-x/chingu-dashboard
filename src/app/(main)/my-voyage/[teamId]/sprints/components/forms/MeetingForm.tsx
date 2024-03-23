"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO } from "date-fns";

import { LinkIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";
import Spinner from "@/components/Spinner";

import { validateTextInput } from "@/helpers/form/validateInput";
import { useSprint, useAppDispatch } from "@/store/hooks";
import { Meeting } from "@/store/features/sprint/sprintSlice";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import useServerAction from "@/hooks/useServerAction";
import { addMeeting, editMeeting } from "@/sprints/sprintsService";
import routePaths from "@/utils/routePaths";

const dateWithoutTimezone = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const withoutTimezone = new Date(date.valueOf() - tzoffset)
    .toISOString()
    .slice(0, -1);
  return withoutTimezone;
};

const validationSchema = z.object({
  title: validateTextInput({
    inputName: "Title",
    required: true,
    maxLen: 50,
  }),
  notes: validateTextInput({
    inputName: "Description",
    required: true,
  }),
  dateTime: z.date(),
  meetingLink: validateTextInput({
    inputName: "Meeting Link",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function MeetingForm() {
  const router = useRouter();
  const params = useParams<{
    teamId: string;
    sprintNumber: string;
    meetingId: string;
  }>();
  const [teamId, sprintNumber, meetingId] = [
    Number(params.teamId),
    Number(params.sprintNumber),
    Number(params.meetingId),
  ];

  const dispatch = useAppDispatch();
  const { sprints } = useSprint();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [meetingData, setMeetingData] = useState<Meeting>();

  const {
    runAction: editMeetingAction,
    isLoading: editMeetingLoading,
    setIsLoading: setEditMeetingLoading,
  } = useServerAction(editMeeting);

  const {
    runAction: addMeetingAction,
    isLoading: addMeetingLoading,
    setIsLoading: setAddMeetingLoading,
  } = useServerAction(addMeeting);

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

  const date = watch("dateTime");

  const setCustomValue = (id: "dateTime", value: Date) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const dateTime = dateWithoutTimezone(data.dateTime);

    if (editMode) {
      const [res, error] = await editMeetingAction({
        ...data,
        dateTime,
        meetingId,
      });

      if (res) {
        router.push(
          routePaths.sprintPage(
            teamId.toString(),
            sprintNumber.toString(),
            meetingId.toString(),
          ),
        );
      }

      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );

        setEditMeetingLoading(false);
      }
    } else {
      const payload = { ...data, dateTime, teamId, sprintNumber };

      const [res, error] = await addMeetingAction(payload);

      if (res) {
        router.push(
          routePaths.sprintPage(
            teamId.toString(),
            sprintNumber.toString(),
            res.id.toString(),
          ),
        );
      }

      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
        setAddMeetingLoading(false);
      }
    }
  };

  useEffect(() => {
    if (params.meetingId) {
      const meeting = sprints.find(
        (sprint) => sprint.teamMeetings[0]?.id === +params.meetingId,
      )?.teamMeetings[0];

      setMeetingData(meeting as Meeting);
      setEditMode(true);
    }
  }, [params.meetingId, sprints]);

  useEffect(() => {
    if (meetingData && meetingData.dateTime) {
      const dateTimeConvertedToDate = parseISO(
        meetingData?.dateTime.substring(0, meetingData?.dateTime.length - 1),
      );
      reset({
        title: meetingData?.title,
        notes: meetingData?.notes,
        meetingLink: meetingData?.meetingLink,
        dateTime: dateTimeConvertedToDate,
      });
    }
  }, [meetingData, reset]);

  function renderButtonContent() {
    if (editMeetingLoading || addMeetingLoading) {
      return <Spinner />;
    }

    return editMode ? "Save Changes" : "Save";
  }

  return (
    <div className="flex flex-col items-center w-full bg-base-200 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 max-w-[650px] p-10 w-full"
      >
        <div className="flex flex-col mb-6 gap-y-4">
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
          {...register("notes")}
          errorMessage={errors.notes?.message}
          defaultValue={meetingData?.notes ?? ""}
        />
        <DateTimePicker
          id="date"
          placeholder="Select meeting date and time"
          label="Date & Time"
          selectedValue={date}
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
            !isDirty || !isValid || editMeetingLoading || addMeetingLoading
          }
          size="lg"
          variant="primary"
        >
          {renderButtonContent()}
        </Button>
        <Button type="button" title="cancel" size="lg" variant="link">
          Cancel
        </Button>
      </form>
    </div>
  );
}
