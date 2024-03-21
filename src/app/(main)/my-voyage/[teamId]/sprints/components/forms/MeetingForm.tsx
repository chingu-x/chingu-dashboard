"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO } from "date-fns";

import { LinkIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/helpers/form/validateInput";
import { useSprint } from "@/store/hooks";
// import useServerAction from "@/hooks/useServerAction";
// import { addMeeting, editMeeting } from "../../sprintsService";
import { Meeting } from "@/store/features/sprint/sprintSlice";

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
  meetingDateTime: z.date(),
  meetingLink: validateTextInput({
    inputName: "Meeting Link",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function MeetingForm() {
  const params = useParams<{ meetingId: string }>();
  // const dispatch = useAppDispatch();
  const { sprints } = useSprint();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [meetingData, setMeetingData] = useState<Meeting>();

  // const {
  //   runAction: editIdeationAction,
  //   isLoading: editIdeationLoading,
  //   setIsLoading: setEditIdeationLoading,
  // } = useServerAction(editMeeting);

  // const {
  //   runAction: addIdeationAction,
  //   isLoading: addIdeationLoading,
  //   setIsLoading: setAddIdeationLoading,
  // } = useServerAction(addMeeting);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const date = watch("meetingDateTime");

  const setCustomValue = (id: "meetingDateTime", value: Date) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (params.meetingId) {
      const meeting = sprints.find(
        (sprint) => sprint.teamMeetings[0].id === +params.meetingId,
      )?.teamMeetings[0];

      setMeetingData(meeting as Meeting);
      setEditMode(true);
    }
  }, [params.meetingId, sprints]);

  useEffect(() => {
    if (meetingData && meetingData.dateTime) {
      reset({
        title: meetingData?.title,
        description: meetingData?.notes,
        meetingLink: meetingData?.meetingLink,
        meetingDateTime: parseISO(meetingData?.dateTime),
      });
    }
  }, [meetingData, reset]);

  function renderButtonContent() {
    // if (editIdeationLoading || addIdeationLoading) {
    //   return <Spinner />;
    // }

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
          {...register("description")}
          errorMessage={errors.description?.message}
          defaultValue={meetingData?.notes ?? ""}
        />
        <DateTimePicker
          id="date"
          placeholder="Select meeting date and time"
          label="Date & Time"
          selectedValue={date}
          {...register("meetingDateTime")}
          errorMessage={errors?.meetingDateTime?.message}
          onChange={(value: Date) => setCustomValue("meetingDateTime", value)}
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
          disabled={!isDirty || !isValid}
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
