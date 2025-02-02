"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Question,
  SubmitWeeklyCheckinFormClientRequestDto,
  SubmitWeeklyCheckinFormResponseDto,
  TeamMemberForCheckbox,
} from "@chingu-x/modules/forms";
import BaseFormPage from "@/components/form/BaseFormPage";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { createValidationSchema } from "@/utils/form/createValidationSchema";
import routePaths from "@/utils/routePaths";
import { formsAdapter, voyageTeamAdapter } from "@/utils/adapters";
import { CacheTag } from "@/utils/cacheTag";
import { submitWeeklyCheckin } from "@/store/features/sprint/sprintSlice";

interface WeeklyCheckingFormProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
  description: string;
  questions: Question[];
  teamMembers: TeamMemberForCheckbox[];
  sprintId: number;
}

export default function WeeklyCheckingForm({
  params,
  description,
  questions,
  teamMembers,
  sprintId,
}: WeeklyCheckingFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const user = useUser();
  const [teamId, sprintNumber] = [
    Number(params.teamId),
    Number(params.sprintNumber),
  ];

  const { mutate, isPending } = useMutation<
    SubmitWeeklyCheckinFormResponseDto,
    Error,
    SubmitWeeklyCheckinFormClientRequestDto
  >({
    mutationFn: submitWeeklyCheckinFormMutation,
    mutationKey: [CacheTag.submitWeeklyCheckinForm],
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [
          CacheTag.sprints,
          CacheTag.sprintMeetingId,
          CacheTag.weeklyCheckInForm,
        ],
      });
      router.push(
        routePaths.emptySprintPage(teamId.toString(), sprintNumber.toString()),
      );
      dispatch(submitWeeklyCheckin({ sprintId }));
      dispatch(onOpenModal({ type: "checkInSuccess" }));
    },
    // TODO: update error handling
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
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

  async function submitWeeklyCheckinFormMutation({
    data,
    questions,
    voyageTeamMemberId,
    sprintId,
  }: SubmitWeeklyCheckinFormClientRequestDto): Promise<SubmitWeeklyCheckinFormResponseDto> {
    return await formsAdapter.submitWeeklyCheckinForm({
      data,
      questions,
      voyageTeamMemberId,
      sprintId,
    });
  }

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    const voyageTeamMemberId = voyageTeamAdapter.getCurrentVoyageUserId(user)!;
    mutate({ data, questions, voyageTeamMemberId, sprintId });
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
        {questions.map((question) => {
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
          disabled={isPending}
          size="lg"
          variant="primary"
        >
          {isPending ? <Spinner /> : "Submit Check In"}
        </Button>
      </form>
    </BaseFormPage>
  );
}
