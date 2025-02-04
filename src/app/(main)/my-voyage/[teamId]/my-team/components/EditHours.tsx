import * as z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { type SetStateAction, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import type {
  EditHoursClientRequestDto,
  EditHoursResponseDto,
} from "@chingu-x/modules/my-team";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/utils/form/validateInput";
import { useAppDispatch, useUser } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { myTeamAdapter } from "@/utils/adapters";
import { editHours } from "@/store/features/my-team/myTeamSlice";

interface EditHoursProps {
  hrPerSprint: number;
  isEditing: boolean;
  setIsEditing: (value: SetStateAction<boolean>) => void;
  handleClick: () => void;
}

const validationSchema = z.object({
  avgHours: validateTextInput({
    inputName: "Average Hour/Sprint",
    required: true,
    isHours: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function EditHours({
  hrPerSprint,
  isEditing,
  setIsEditing,
  handleClick,
}: EditHoursProps) {
  const params = useParams<{ teamId: string }>();
  const { teamId } = params;
  const dispatch = useAppDispatch();
  const user = useUser();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const { mutate, isPending } = useMutation<
    EditHoursResponseDto,
    Error,
    EditHoursClientRequestDto
  >({
    mutationFn: editHoursMutation,
    onSuccess: (_, variables) => {
      const { hrPerSprint } = variables;
      setIsEditing(false);
      dispatch(editHours({ user, hrPerSprint }));
    },
    // TODO: update error handling
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    const { avgHours } = data;

    mutate({ teamId, hrPerSprint: Number(avgHours) });
  };

  async function editHoursMutation({
    teamId,
    hrPerSprint,
  }: EditHoursClientRequestDto): Promise<EditHoursResponseDto> {
    return await myTeamAdapter.editHours({ teamId, hrPerSprint });
  }

  function handleClearInputAction() {
    reset({ avgHours: hrPerSprint.toString() });
  }

  useEffect(() => {
    if (isEditing) {
      setFocus("avgHours", { shouldSelect: true });
    }
  }, [isEditing, setFocus]);

  return isEditing ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={handleClearInputAction}
        id="avgHours"
        {...register("avgHours")}
        errorMessage={errors.avgHours?.message}
        placeholder={`${hrPerSprint}`}
        defaultValue={`${hrPerSprint}`}
        submitButtonText={isPending ? <Spinner /> : "Save"}
        buttonDisabled={!isDirty || !isValid}
      />
    </form>
  ) : (
    <Button
      variant="link"
      className="mb-6 mt-2 flex w-full justify-between rounded-lg border-2 border-neutral-content px-3.5 py-2.5 text-base text-base-300 outline-none hover:border-base-300"
      onClick={handleClick}
      aria-label="average hour per sprint"
      data-cy="avg-hr-per-sprint"
    >
      {hrPerSprint ? `${hrPerSprint}` : "Add Hours"}
      <PencilSquareIcon className="w-3.5" />
    </Button>
  );
}
