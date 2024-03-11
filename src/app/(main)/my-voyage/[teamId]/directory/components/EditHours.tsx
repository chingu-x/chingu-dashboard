"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useAppDispatch, useDirectory, useUser } from "@/store/hooks";
import { editHours } from "@/app/(main)/my-voyage/[teamId]/directory/directoryService";
import { onOpenModal } from "@/store/features/modal/modalSlice";

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
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { avgHours } = data;
    const [, error] = await editHours({ teamId, hrPerSprint: +avgHours });

    if (error) {
      dispatch(onOpenModal({ type: "error", content: error.message }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={() => {}}
        id="avgHours"
        {...register("avgHours")}
        errorMessage={errors.avgHours?.message}
        placeholder={`${hrPerSprint}`}
        defaultValue={`${hrPerSprint}`}
        submitButtonText="Save"
        buttonDisabled={!isDirty || !isValid}
      />
    </form>
  );
}
