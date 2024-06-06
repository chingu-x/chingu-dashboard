"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BaseFormPage from "@/components/form/BaseFormPage";
import { submitCheckInForm } from "@/myVoyage/sprints/sprintsService";
import FormInput from "@/components/form/FormInput";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { createValidationSchema } from "@/utils/form/createValidationSchema";
import useServerAction from "@/hooks/useServerAction";
import routePaths from "@/utils/routePaths";
import { createFormResponseBody } from "@/utils/form/createFormResponseBody";
import { type Question, type TeamMemberForCheckbox } from "@/utils/form/types";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";

interface WeeklyCheckingFormProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
  description: string;
  questions: Question[];
  teamMembers: TeamMemberForCheckbox[];
}

export default function WeeklyCheckingForm({
  params,
  description,
  questions,
  teamMembers,
}: WeeklyCheckingFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [teamId, sprintNumber] = [
    Number(params.teamId),
    Number(params.sprintNumber),
  ];

  const user = useUser();
  const { voyageTeamMemberId } = getCurrentVoyageTeam({
    teamId,
    user,
    error: null,
  });

  const { validationSchema, defaultValues } = createValidationSchema(questions);

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    mode: "onSubmit",
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const {
    runAction: submitCheckInFormAction,
    isLoading: submitCheckInFormLoading,
    setIsLoading: setSubmitCheckInFormLoading,
  } = useServerAction(submitCheckInForm);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const responses = createFormResponseBody({ data, questions });

    const [res, error] = await submitCheckInFormAction({
      voyageTeamMemberId: voyageTeamMemberId!,
      sprintId: Number(sprintNumber),
      responses,
    });

    if (res) {
      router.push(
        routePaths.emptySprintPage(teamId.toString(), sprintNumber.toString()),
      );
      dispatch(onOpenModal({ type: "checkInSuccess" }));
    }

    if (error) {
      dispatch(
        onOpenModal({
          type: "error",
          content: { message: error.message },
        }),
      );
    }
    setSubmitCheckInFormLoading(false);
  };

  return (
    <BaseFormPage
      title={`Sprint #${sprintNumber} Check-in`}
      description={description}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-10"
      >
        {questions
          .sort((a, b) => a.order - b.order)
          .map((question) => {
            const { id } = question;

            return (
              <div key={`question ${id}`}>
                <FormInput
                  question={question}
                  register={register}
                  errors={errors}
                  teamMembers={teamMembers}
                />
              </div>
            );
          })}
        <Button
          type="submit"
          title="submit"
          disabled={submitCheckInFormLoading}
          size="lg"
          variant="primary"
        >
          {submitCheckInFormLoading ? <Spinner /> : "Submit Check In"}
        </Button>
      </form>
    </BaseFormPage>
  );
}
