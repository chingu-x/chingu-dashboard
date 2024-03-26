"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/20/solid";

import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/helpers/form/validateInput";
import { useSprint, useAppDispatch } from "@/store/hooks";
import { Agenda } from "@/store/features/sprint/sprintSlice";
import useServerAction from "@/hooks/useServerAction";
import { addAgendaTopic, editAgendaTopic } from "@/sprints/sprintsService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import routePaths from "@/utils/routePaths";
import Spinner from "@/components/Spinner";

const validationSchema = z.object({
  title: validateTextInput({
    inputName: "Title",
    required: true,
  }),
  description: validateTextInput({
    inputName: "Description",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function AgendaTopicForm() {
  const router = useRouter();
  const params = useParams<{
    teamId: string;
    sprintNumber: string;
    meetingId: string;
    agendaId: string;
  }>();
  const [teamId, sprintNumber, meetingId, agendaId] = [
    Number(params.teamId),
    Number(params.sprintNumber),
    Number(params.meetingId),
    Number(params.agendaId),
  ];

  const dispatch = useAppDispatch();
  const { sprints } = useSprint();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [topicData, setTopicData] = useState<Agenda>();

  const {
    runAction: editAgendaTopicAction,
    isLoading: editAgendaTopicLoading,
    setIsLoading: setEditAgendaTopicLoading,
  } = useServerAction(editAgendaTopic);

  const {
    runAction: addAgendaTopicAction,
    isLoading: addAgendaTopicLoading,
    setIsLoading: setAddTopicLoading,
  } = useServerAction(addAgendaTopic);

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  // const { title, description } = watch();

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    if (editMode) {
      const [res, error] = await editAgendaTopicAction({
        ...data,
        agendaId,
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
        setEditAgendaTopicLoading(false);
      }
    } else {
      const payload = { ...data, meetingId };
      const [res, error] = await addAgendaTopicAction(payload);

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
        setAddTopicLoading(false);
      }
    }
  };

  useEffect(() => {
    if (sprintNumber && agendaId) {
      const topic = sprints
        .find((sprint) => sprint.number === sprintNumber)
        ?.teamMeetings[0].agendas?.find((topic) => topic.id === agendaId);

      setTopicData(topic);
      setEditMode(true);
    }
  }, [sprintNumber, agendaId, sprints]);

  useEffect(() => {
    reset({
      title: topicData?.title,
      description: topicData?.description,
    });
  }, [topicData, reset]);

  function renderButtonContent() {
    if (editAgendaTopicLoading || addAgendaTopicLoading) {
      return <Spinner />;
    }

    return editMode ? "Save Changes" : "Add";
  }

  return (
    // TODO: Create some general form wrapper component
    <div className="flex flex-col items-center w-full bg-base-200 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 max-w-[650px] p-10 w-full"
      >
        <div className="flex flex-col mb-6 gap-y-4">
          <h2 className="text-3xl font-bold text-base-300">
            {editMode ? "Edit Topic on the Agenda" : "Add Agenda Topic"}
          </h2>
          <p className="text-lg font-medium text-base-300">
            {editMode
              ? "Edit an agenda topic for the meeting."
              : "What would you like to address during the meeting?"}
          </p>
        </div>
        <TextInput
          id="title"
          label="title"
          placeholder="What would you like to discuss at the meeting?"
          {...register("title")}
          errorMessage={errors.title?.message}
          maxLength={50}
        />
        <Textarea
          id="description"
          label="description"
          placeholder="Please provide a description and include details, links, and actionable items for this topic."
          {...register("description")}
          errorMessage={errors.description?.message}
        />
        <div className="flex w-full gap-x-10">
          {editMode && (
            <Button
              type="button"
              size="lg"
              variant="error"
              onClick={() => {}}
              title="delete"
              className="w-1/2"
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </Button>
          )}
          <Button
            type="submit"
            title="submit"
            disabled={
              !isDirty ||
              !isValid ||
              editAgendaTopicLoading ||
              addAgendaTopicLoading
            }
            size="lg"
            variant="primary"
            className={`${editMode ? "w-1/2" : "w-full"}`}
          >
            {renderButtonContent()}
          </Button>
        </div>
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
