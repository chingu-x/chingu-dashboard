"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/20/solid";

import type {
  AddAgendaTopicClientRequestDto,
  AddAgendaTopicResponseDto,
  Agenda,
  EditAgendaTopicClientRequestDto,
  EditAgendaTopicResponseDto,
} from "@chingu-x/modules/sprint-meeting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/utils/form/validateInput";
import { useAppDispatch, useSprintMeeting } from "@/store/hooks";
import { deleteAgendaTopic } from "@/myVoyage/sprints/sprintsService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { addAgendaState } from "@/store/features/sprint-meeting/sprintMeetingSlice";
import routePaths from "@/utils/routePaths";
import Spinner from "@/components/Spinner";
import { persistor } from "@/store/store";
import { sprintMeetingAdapter } from "@/utils/adapters";
import { CacheTag } from "@/utils/cacheTag";

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
    params.teamId,
    params.sprintNumber,
    params.meetingId,
    params.agendaId,
  ];

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const sprintMeeting = useSprintMeeting();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [topicData, setTopicData] = useState<Agenda>();

  const { mutate: addAgenda, isPending: addAgendaPending } = useMutation<
    AddAgendaTopicResponseDto,
    Error,
    AddAgendaTopicClientRequestDto
  >({
    mutationFn: addAgendaMutation,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: [CacheTag.sprints, CacheTag.sprintMeetingId],
      });

      dispatch(addAgendaState(data));

      router.push(routePaths.sprintWeekPage(teamId, sprintNumber, meetingId));
    },
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  const { mutate: editAgenda, isPending: editAgendaPending } = useMutation<
    EditAgendaTopicResponseDto,
    Error,
    EditAgendaTopicClientRequestDto
  >({
    mutationFn: editAgendaMutation,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: [CacheTag.sprints, CacheTag.sprintMeetingId],
      });

      router.push(routePaths.sprintWeekPage(teamId, sprintNumber, meetingId));
    },
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  async function addAgendaMutation({
    meetingId,
    title,
    description,
  }: AddAgendaTopicClientRequestDto): Promise<AddAgendaTopicResponseDto> {
    return await sprintMeetingAdapter.addAgendaTopic({
      meetingId,
      title,
      description,
    });
  }

  async function editAgendaMutation({
    agendaId,
    title,
    description,
  }: EditAgendaTopicClientRequestDto): Promise<EditAgendaTopicResponseDto> {
    return await sprintMeetingAdapter.editAgendaTopic({
      agendaId,
      title,
      description,
    });
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const { title, description } = watch();

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    if (editMode) {
      const payload = { ...data, agendaId };

      editAgenda(payload);
    } else {
      const payload = { ...data, meetingId };

      addAgenda(payload);
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
    if (agendaId) {
      const topic = sprintMeetingAdapter.getAgendaById({
        meeting: sprintMeeting,
        meetingId,
        agendaId,
      });

      setTopicData(topic);
      setEditMode(true);
    }
  }, [agendaId, meetingId, sprintMeeting]);

  useEffect(
    () => () => {
      void persistor.purge();
    },
    [],
  );

  function renderButtonContent() {
    if (editAgendaPending || addAgendaPending) {
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
              !isDirty || !isValid || editAgendaPending || addAgendaPending
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
