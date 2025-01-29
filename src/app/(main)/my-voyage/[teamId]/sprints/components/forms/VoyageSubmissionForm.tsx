"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@chingu-x/components/button";
import BaseFormPage from "@/components/form/BaseFormPage";
import { submitVoyageProjectForm } from "@/myVoyage/sprints/sprintsService";
import FormInput from "@/components/form/FormInput";

import Spinner from "@/components/Spinner";

import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { createValidationSchema } from "@/utils/form/createValidationSchema";
import useServerAction from "@/hooks/useServerAction";
import routePaths from "@/utils/routePaths";
import { createFormResponseBody } from "@/utils/form/createFormResponseBody";
import { type Question } from "@/utils/form/types";

interface VoyageSubmissionFormProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
  title: string;
  description: string;
  questions: Question[];
}

export default function VoyageSubmissionForm({
  params,
  title,
  description,
  questions,
}: VoyageSubmissionFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [teamId, sprintNumber] = [params.teamId, params.sprintNumber];

  const { voyageTeamMembers } = useUser();
  const voyageTeamId = voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name == "Active",
  )?.voyageTeamId;

  const { validationSchema, defaultValues } = createValidationSchema(questions);
  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const {
    runAction: submitVoyageProjectFormAction,
    isLoading: submitVoyageProjectFormLoading,
    setIsLoading: setSubmitVoyageProjectFormLoading,
  } = useServerAction(submitVoyageProjectForm);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const responses = createFormResponseBody({ data, questions });

    const [res, error] = await submitVoyageProjectFormAction({
      voyageTeamId: voyageTeamId!,
      responses,
    });

    if (res) {
      router.push(
        routePaths.emptySprintPage(teamId.toString(), sprintNumber.toString()),
      );
    }

    if (error) {
      dispatch(
        onOpenModal({
          type: "error",
          content: { message: error.message },
        }),
      );
    }
    setSubmitVoyageProjectFormLoading(false);
  };

  return (
    <BaseFormPage title={title} description={description}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-10"
      >
        {questions.map((question) => {
          const { id } = question;

          return (
            <div key={`question ${id}`}>
              <FormInput
                question={question}
                register={register}
                errors={errors}
              />
            </div>
          );
        })}
        <Button
          type="submit"
          title="submit"
          disabled={submitVoyageProjectFormLoading}
          size="lg"
          variant="primary"
        >
          {submitVoyageProjectFormLoading ? <Spinner /> : "Submit Voyage"}
        </Button>
      </form>
    </BaseFormPage>
  );
}
