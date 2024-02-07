"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  IdeationData,
  addNewIdeation,
} from "@/store/features/ideation/ideationSlice";
import Spinner from "@/components/Spinner";

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
  const { loading, projectIdeas } = useAppSelector((state) => state.ideation);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [ideationData, setIdeationData] = useState<IdeationData>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const teamId = +params.teamId;
    const payload = { ...data, teamId };
    await dispatch(addNewIdeation(payload));

    router.replace(`/my-voyage/${teamId}/ideation`);
  };

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
    if (editMode) {
      reset({
        title: ideationData?.title,
        description: ideationData?.description,
        vision: ideationData?.vision,
      });
    }
  }, [editMode, ideationData, reset]);

  function renderButtonContent() {
    if (loading) {
      return <Spinner />;
    } else if (editMode) {
      return "Edit Project Idea";
    } else {
      return "Add Project Idea";
    }
  }

  return (
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
          placeholder="Enter you voyage project idea"
          {...register("title")}
          errorMessage={errors.title?.message}
          maxLength={50}
        />
        <Textarea
          id="description"
          label="description"
          placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
          {...register("description")}
          errorMessage={errors.description?.message}
        />
        <Textarea
          id="visionStatement"
          label="vision statement"
          placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
          {...register("vision")}
          errorMessage={errors.vision?.message}
        />
        <Button
          type="submit"
          title="submit"
          disabled={!isDirty || !isValid || loading}
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
            onClick={() => {}}
            title="delete"
          >
            <TrashIcon className="w-4 h-4" />
            Delete Project
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
