"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useAppSelector } from "@/store/hooks";
import { type IdeationData } from "@/store/features/ideation/ideationSlice";
import Spinner from "@/components/Spinner";
import {
  editIdeation,
  type EditIdeationProps,
  addIdeation,
  deleteIdeation,
} from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import useAction from "@/hooks/useAction";
import ErrorModal from "@/components/modals/ErrorModal";
import { persistor } from "@/store/store";
import { AppError } from "@/types/types";

const validationSchema = z.object({
  title: validateTextInput({
    inputName: "Title",
    required: true,
    minLen: 10,
    maxLen: 50,
  }),
  description: validateTextInput({
    inputName: "Description",
    required: true,
    minLen: 10,
  }),
  vision: validateTextInput({
    inputName: "Vision statement",
    required: true,
    minLen: 10,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function IdeationForm() {
  const router = useRouter();
  const params = useParams<{ teamId: string; ideationId: string }>();
  const teamId = +params.teamId;
  const { projectIdeas } = useAppSelector((state) => state.ideation);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [ideationData, setIdeationData] = useState<IdeationData>();
  const {
    runAction: editIdeationAction,
    isLoading: editIdeationLoading,
    setIsLoading: setEditIdeationLoading,
  } = useAction(editIdeation);

  const {
    runAction: addIdeationAction,
    isLoading: addIdeationLoading,
    setIsLoading: setAddIdeationLoading,
  } = useAction(addIdeation);
  const {
    runAction: deleteIdeationAction,
    isLoading: deleteIdeationLoading,
    setIsLoading: setDeleteIdeationLoading,
  } = useAction(deleteIdeation);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    if (editMode) {
      const ideationId = +params.ideationId;

      interface MyObject extends EditIdeationProps {
        [key: string]: unknown;
      }

      const filteredData: MyObject = {
        teamId,
        ideationId,
      };

      for (const key in dirtyFields) {
        if (dirtyFields.hasOwnProperty(key)) {
          filteredData[key] = (data as { [key: string]: string })[key];
        }
      }

      await editIdeationAction(filteredData).then((res) => {
        if ((res as AppError).error) {
          setError((res as AppError).error);
          setIsOpen(true);
          setEditIdeationLoading(false);
        } else {
          router.push(`/my-voyage/${teamId}/ideation`);
        }
      });
    } else {
      const payload = { ...data, teamId };
      await addIdeationAction(payload).then((res) => {
        if ((res as AppError).error) {
          setError((res as AppError).error);
          setIsOpen(true);
          setAddIdeationLoading(false);
        } else {
          router.push(`/my-voyage/${teamId}/ideation`);
        }
      });
    }
  };

  function handleClose() {
    setIsOpen(false);
    setError(undefined);
  }

  async function handleDelete() {
    const ideationId = +params.ideationId;

    await deleteIdeationAction({ teamId, ideationId }).then((res) => {
      if ((res as AppError).error) {
        setError((res as AppError).error);
        setIsOpen(true);
        setDeleteIdeationLoading(false);
      } else {
        router.push(`/my-voyage/${teamId}/ideation`);
      }
    });
  }

  useEffect(() => {
    if (params.ideationId) {
      const ideation = projectIdeas.find(
        (project) => project.id === +params.ideationId
      );

      setIdeationData(ideation);
      setEditMode(true);
    }
  }, [params.ideationId, projectIdeas]);

  useEffect(() => {
    reset({
      title: ideationData?.title,
      description: ideationData?.description,
      vision: ideationData?.vision,
    });
  }, [ideationData, reset]);

  useEffect(() => {
    void persistor.purge();
  }, []);

  function renderButtonContent() {
    if (editIdeationLoading || addIdeationLoading) {
      return <Spinner />;
    }

    return editMode ? "Edit Project Idea" : "Add Project Idea";
  }

  function renderDeleteButtonContent() {
    if (deleteIdeationLoading) {
      return <Spinner />;
    }

    return (
      <>
        <TrashIcon className="w-4 h-4" />
        Delete Project
      </>
    );
  }

  return (
    <>
      <ErrorModal
        isOpen={isOpen}
        handleClose={handleClose}
        errorMessage={error!}
      />
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-[1000px] gap-y-10"
        >
          <div className="flex flex-col gap-y-4">
            <h1 className="text-base-300 text-3xl font-bold">
              {editMode ? "Edit Project Idea" : "Add Project Idea"}
            </h1>
            <p className="text-base-300 text-lg font-medium">
              Share your project idea with the team.
            </p>
          </div>
          <TextInput
            id="title"
            label="title"
            placeholder="Enter your voyage project idea"
            {...register("title")}
            errorMessage={errors.title?.message}
            maxLength={50}
            defaultValue={ideationData?.title ?? ""}
          />
          <Textarea
            id="description"
            label="description"
            placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
            {...register("description")}
            errorMessage={errors.description?.message}
            defaultValue={ideationData?.description ?? ""}
          />
          <Textarea
            id="visionStatement"
            label="vision statement"
            placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
            {...register("vision")}
            errorMessage={errors.vision?.message}
            defaultValue={ideationData?.vision ?? ""}
          />
          <Button
            type="submit"
            title="submit"
            disabled={
              !isDirty || !isValid || editIdeationLoading || addIdeationLoading
            }
            size="lg"
            variant="primary"
          >
            {renderButtonContent()}
          </Button>
          {editMode && (
            <Button
              type="button"
              size="lg"
              variant="error"
              onClick={handleDelete}
              title="delete"
              disabled={deleteIdeationLoading}
            >
              {renderDeleteButtonContent()}
            </Button>
          )}
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
    </>
  );
}
