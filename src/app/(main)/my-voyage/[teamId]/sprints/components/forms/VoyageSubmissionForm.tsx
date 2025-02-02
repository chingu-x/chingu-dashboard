"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  SubmitVoyageProjectFormClientRequestDto,
  SubmitVoyageProjectFormResponseDto,
} from "@chingu-x/modules/forms";
import BaseFormPage from "@/components/form/BaseFormPage";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { createValidationSchema } from "@/utils/form/createValidationSchema";
import routePaths from "@/utils/routePaths";
import { type Question } from "@/utils/form/types";
import { CacheTag } from "@/utils/cacheTag";
import { formsAdapter, voyageTeamAdapter } from "@/utils/adapters";
import { submitVoyageProject } from "@/store/features/sprint/sprintSlice";

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
  const queryClient = useQueryClient();
  const user = useUser();
  const [teamId, sprintNumber] = [Number(params.teamId), params.sprintNumber];

  const { mutate, isPending } = useMutation<
    SubmitVoyageProjectFormResponseDto,
    Error,
    SubmitVoyageProjectFormClientRequestDto
  >({
    mutationFn: submitVoyageProjectFormMutation,
    mutationKey: [CacheTag.submitVoyageProjectForm],
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [
          CacheTag.sprints,
          CacheTag.sprintMeetingId,
          CacheTag.weeklyCheckInForm,
        ],
      });
      router.push(routePaths.emptySprintPage(teamId.toString(), sprintNumber));
      dispatch(submitVoyageProject({ teamId }));
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
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  async function submitVoyageProjectFormMutation({
    data,
    questions,
    voyageTeamId,
  }: SubmitVoyageProjectFormClientRequestDto): Promise<SubmitVoyageProjectFormResponseDto> {
    return await formsAdapter.submitVoyageProjectForm({
      data,
      questions,
      voyageTeamId,
    });
  }

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    const voyageTeamId = Number(voyageTeamAdapter.getVoyageTeamId(user));
    mutate({ data, questions, voyageTeamId });
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
          disabled={isPending}
          size="lg"
          variant="primary"
        >
          {isPending ? <Spinner /> : "Submit Voyage"}
        </Button>
      </form>
    </BaseFormPage>
  );
}
