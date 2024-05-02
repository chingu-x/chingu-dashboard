import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { SetStateAction, useEffect } from "react";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useAppDispatch } from "@/store/hooks";
import { editHours } from "@/app/(main)/my-voyage/[teamId]/directory/directoryService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

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
  const teamId = Number(params.teamId);
  const dispatch = useAppDispatch();

  const {
    runAction: editHoursAction,
    isLoading: editHoursLoading,
    setIsLoading: setEditHoursLoading,
  } = useServerAction(editHours);

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

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { avgHours } = data;
    const [, error] = await editHoursAction({
      teamId,
      hrPerSprint: Number(avgHours),
    });

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } })
      );
    }

    setEditHoursLoading(false);
    setIsEditing(false);
  };

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
        submitButtonText={editHoursLoading ? <Spinner /> : "Save"}
        buttonDisabled={!isDirty || !isValid}
      />
    </form>
  ) : (
    <Button
      variant="link"
      className="text-base flex justify-between border-2 w-full outline-none rounded-lg px-3.5 py-2.5 mt-2 mb-6 text-base-300 border-neutral-content hover:border-base-300"
      onClick={handleClick}
    >
      {hrPerSprint ? `${hrPerSprint}` : "Add Hours"}
      <PencilSquareIcon className="w-3.5" />
    </Button>
  );
}
