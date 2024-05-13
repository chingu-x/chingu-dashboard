"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BaseFormPage from "@/myVoyage/sprints/components/forms/BaseFormPage";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import { submitVoyageProjectForm } from "@/myVoyage/sprints/sprintsService";
import FormInputs from "@/myVoyage/sprints/components/forms/FormInputs";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { createValidationSchema } from "@/utils/createValidationSchema";
import useServerAction from "@/hooks/useServerAction";
import routePaths from "@/utils/routePaths";
import { createFormResponseBody } from "@/utils/createFormResponseBody";

interface VoyageSubmissionFormProps {
  params: {
    teamId: string;
    meetingId: string;
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
  const [teamId, sprintNumber, meetingId] = [
    params.teamId,
    params.sprintNumber,
    params.meetingId,
  ];

  const { voyageTeamMembers } = useUser();
  const voyageTeamId = voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name == "Active"
  )?.voyageTeamId;

  const validationSchema = createValidationSchema(questions);
  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
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
      sprintNumber: Number(sprintNumber),
      responses,
    });

    if (res) {
      router.push(
        routePaths.sprintWeekPage(
          teamId.toString(),
          sprintNumber.toString(),
          meetingId.toString()
        )
      );
    }

    if (error) {
      dispatch(
        onOpenModal({
          type: "error",
          content: { message: error.message },
        })
      );
    }
    setSubmitVoyageProjectFormLoading(false);
  };

  return (
    <BaseFormPage title={title} description={description}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-10"
      >
        {questions.map((question) => {
          const { id } = question;

          return (
            <div key={`question ${id}`}>
              <FormInputs
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
          disabled={!isDirty || !isValid || submitVoyageProjectFormLoading}
          size="lg"
          variant="primary"
        >
          {submitVoyageProjectFormLoading ? <Spinner /> : "Submit Check In"}
        </Button>
      </form>
    </BaseFormPage>
  );
}
