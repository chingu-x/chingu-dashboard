"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/20/solid";

import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/utils/form/validateInput";
import { useSprint, useAppDispatch } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import {
  addAgendaTopic,
  editAgendaTopic,
  deleteAgendaTopic,
} from "@/myVoyage/sprints/sprintsService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import routePaths from "@/utils/routePaths";
import Spinner from "@/components/Spinner";
import { persistor } from "@/store/store";
import { Agenda } from "@chingu-x/modules/sprint-meeting";

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
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const { title, description } = watch();

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    if (editMode) {
      const [res, error] = await editAgendaTopicAction({
        ...data,
        agendaId,
        sprintNumber,
      });

      if (res) {
        router.push(
          routePaths.sprintWeekPage(
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
      const payload = { ...data, meetingId, sprintNumber };
      const [res, error] = await addAgendaTopicAction(payload);

      if (res) {
        router.push(
          routePaths.sprintWeekPage(
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

  function handleDelete() {
    const route = routePaths.sprintWeekPage(
      teamId.toString(),
      sprintNumber.toString(),
      meetingId.toString(),
    );
    dispatch(
      onOpenModal({
        type: "confirmation",
        content: {
          title: "Confirm Deletion",
          message:
            "Are you sure you want to delete? You will permanently lose all the information and will not be able to recover it.",
          confirmationText: "Delete Agenda Topic",
          cancelText: "Keep It",
        },
        payload: {
          params: { agendaId, sprintNumber },
          redirect: { router, route },
          deleteFunction: deleteAgendaTopic,
        },
      }),
    );
  }

  useEffect(() => {
    if (sprintNumber && agendaId) {
      const sprint = sprints.find((sprint) => sprint.number === sprintNumber);

      const topic =
        sprint?.teamMeetingsData &&
        sprint.teamMeetingsData[0].agendas?.find(
          (topic) => topic.id === agendaId,
        );

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

  useEffect(
    () => () => {
      void persistor.purge();
    },
    [],
  );

  function renderButtonContent() {
    if (editAgendaTopicLoading || addAgendaTopicLoading) {
      return <Spinner />;
    }

    return editMode ? "Save Changes" : "Add";
  }

  return (
    // TODO: Create some general form wrapper component
    <div className="mx-auto flex w-full max-w-[871px] flex-col items-center rounded-2xl bg-base-200 p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-4 p-10"
      >
        <div className="mb-6 flex flex-col gap-y-4">
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
          defaultValue={topicData?.title ?? ""}
        />
        <Textarea
          id="description"
          label="description"
          placeholder="Please provide a description and include details, links, and actionable items for this topic."
          {...register("description")}
          errorMessage={errors.description?.message}
          defaultValue={topicData?.description ?? ""}
        />
        <div className="flex w-full gap-x-10">
          {editMode && (
            <Button
              type="button"
              size="lg"
              variant="error"
              onClick={handleDelete}
              title="delete"
              className="w-1/2"
            >
              <TrashIcon className="h-4 w-4" />
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
