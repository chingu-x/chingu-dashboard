"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BaseFormPage from "@/myVoyage/sprints/components/forms/BaseFormPage";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import { submitCheckInForm } from "@/myVoyage/sprints/sprintsService";
import FormInputs from "@/myVoyage/sprints/components/forms/FormInputs";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { createValidationSchema } from "@/utils/createValidationSchema";
import useServerAction from "@/hooks/useServerAction";
import routePaths from "@/utils/routePaths";
import { createFormResponseBody } from "@/utils/createFormResponseBody";

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
    (voyage) => voyage.voyageTeam.voyage.status.name == "Active",
  )?.id;

  const validationSchema = createValidationSchema(questions);
  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onSubmit",
    resolver: zodResolver(validationSchema),
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
        routePaths.sprintWeekPage(
          teamId.toString(),
          sprintNumber.toString(),
          meetingId.toString(),
        ),
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
