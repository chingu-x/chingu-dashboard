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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  type IdeationData,
  addNewIdeation,
  editIdeationThunk,
  deleteIdeationThunk,
} from "@/store/features/ideation/ideationSlice";
import Spinner from "@/components/Spinner";
import {
  editIdeation,
  type EditIdeationProps,
} from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import useThunk from "@/hooks/useThunk";
import useAction from "@/hooks/useAction";
import { onOpen } from "@/store/features/modal/modalSlice";

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
  const { projectIdeas } = useAppSelector((state) => state.ideation);
  const teamId = +params.teamId;
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [ideationData, setIdeationData] = useState<IdeationData>();
  const {
    // runThunk: editThunk,
    // isLoading: editLoading,
    // error: editError,
  } = useThunk(editIdeationThunk);
  const {
    runAction: editIdeationAction,
    isLoading: editLoading,
    error: editError,
    setError: setEditError,
  } = useAction(editIdeation);
  const {
    runThunk: deleteThunk,
    isLoading: deleteLoading,
    // setIsLoading: setDeleteLoading,
    // error: deleteError,
  } = useThunk(deleteIdeationThunk);

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

      // const res = await editIdeation(filteredData);
      // console.log(res);

      // editThunk(filteredData);

      // await dispatch(editIdeationThunk(filteredData));
      await editIdeationAction(filteredData);
    }
    // else {
    //   const payload = { ...data, teamId };
    //   await dispatch(addNewIdeation(payload));
    // }

    // if (!editError) {
    //   router.replace(`/my-voyage/${teamId}/ideation`);
    // }

    // dispatch(onOpen({ type: "error" }));
  };

  function handleDelete() {
    const ideationId = +params.ideationId;

    deleteThunk({ teamId, ideationId });
    // await dispatch(deleteIdeationThunk({ teamId, ideationId }));

    router.replace(`/my-voyage/${teamId}/ideation`);
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
    if (editError) {
      dispatch(onOpen({ type: "error" }));
    }
  }, [dispatch, editError, router, teamId]);

  useEffect(() => {
    reset({
      title: ideationData?.title,
      description: ideationData?.description,
      vision: ideationData?.vision,
    });
  }, [ideationData, reset]);

  function renderButtonContent() {
    if (editLoading) {
      return <Spinner />;
    }

    return editMode ? "Edit Project Idea" : "Add Project Idea";
  }

  function renderDeleteButtonContent() {
    if (deleteLoading) {
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
    <div className="flex flex-col items-center">
      {editError}
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
          disabled={!isDirty || !isValid || editLoading}
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
  );
}
