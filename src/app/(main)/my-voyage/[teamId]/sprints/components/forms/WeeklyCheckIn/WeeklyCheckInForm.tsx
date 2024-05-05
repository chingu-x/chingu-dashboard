"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BaseFormPage from "@/myVoyage/sprints/components/forms/BaseFormPage";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import { submitCheckInForm } from "@/myVoyage/sprints/sprintsService";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { createValidationSchema } from "@/utils/createValidationSchema";
import { getQuestionType } from "@/utils/getQuestionType";
import FormInputs from "../FormInputs";
import useServerAction from "@/hooks/useServerAction";
import routePaths from "@/utils/routePaths";

interface WeeklyCheckingFormProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
  description: string;
  questions: Question[];
}

export default function WeeklyCheckingForm({
  params,
  description,
  questions,
}: WeeklyCheckingFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [teamId, sprintNumber, meetingId] = [
    params.teamId,
    params.sprintNumber,
    params.meetingId,
  ];

  const { voyageTeamMembers } = useUser();
  const voyageTeamMemberId = voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name == "Active"
  )?.id!;

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
    runAction: submitCheckInFormAction,
    isLoading: submitCheckInFormLoading,
    setIsLoading: setSubmitCheckInFormLoading,
  } = useServerAction(submitCheckInForm);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    // Create a necessary object
    type ResponseType = {
      questionId: number;
      text?: string;
      optionChoiceId?: number;
      boolean?: boolean;
      numeric?: number;
    };
    const responses = [] as ResponseType[];

    for (const [key, value] of Object.entries(data)) {
      let response: ResponseType;
      const question = questions.find(
        (question) => question.id === Number(key)
      );

      const [isRadioGroup, isCheckboxGroup, isTextArea] = getQuestionType(
        question!
      );

      if (isRadioGroup) {
        response = { questionId: Number(key), optionChoiceId: Number(value) };
        responses.push(response);
      }
      if (isCheckboxGroup) {
        let numeric: number;
        if (Array.isArray(value)) {
          numeric = Number(value.reduce((a, b) => a + b, ""));
          response = {
            questionId: Number(key),
            numeric: numeric,
          };
          responses.push(response);
        }
      }
      if (isTextArea) {
        response = {
          questionId: Number(key),
          text: value as string,
        };
        responses.push(response);
      }
    }

    const [res, error] = await submitCheckInFormAction({
      voyageTeamMemberId: voyageTeamMemberId,
      sprintId: Number(sprintNumber),
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
      dispatch(onOpenModal({ type: "checkInSuccess" }));
    }

    if (error) {
      dispatch(
        onOpenModal({
          type: "error",
          content: { message: error.message },
        })
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
          disabled={!isDirty || !isValid || submitCheckInFormLoading}
          size="lg"
          variant="primary"
        >
          {submitCheckInFormLoading ? <Spinner /> : "Submit Check In"}
        </Button>
      </form>
    </BaseFormPage>
  );
}
