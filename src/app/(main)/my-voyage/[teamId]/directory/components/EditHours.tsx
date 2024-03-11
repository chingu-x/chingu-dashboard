import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useAppDispatch } from "@/store/hooks";
import { editHours } from "@/app/(main)/my-voyage/[teamId]/directory/directoryService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";

interface EditHoursProps {
  hrPerSprint: number;
}

const validationSchema = z.object({
  avgHours: validateTextInput({
    inputName: "Average Hour/Sprint",
    required: true,
    isHours: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function EditHours({ hrPerSprint }: EditHoursProps) {
  const params = useParams<{ teamId: string }>();
  const teamId = +params.teamId;
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
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { avgHours } = data;
    const [, error] = await editHoursAction({ teamId, hrPerSprint: +avgHours });

    if (error) {
      dispatch(onOpenModal({ type: "error", content: error.message }));
    }

    setEditHoursLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={() => {
          reset({ avgHours: hrPerSprint.toString() });
        }}
        id="avgHours"
        {...register("avgHours")}
        errorMessage={errors.avgHours?.message}
        placeholder={`${hrPerSprint}`}
        defaultValue={`${hrPerSprint}`}
        submitButtonText={editHoursLoading ? <Spinner /> : "Save"}
        buttonDisabled={!isDirty || !isValid}
      />
    </form>
  );
}
