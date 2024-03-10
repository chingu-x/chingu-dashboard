"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useDirectory, useUser } from "@/store/hooks";
import { editHours } from "@/app/(main)/my-voyage/[teamId]/directory/directoryService";

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
    await editHours({ teamId, hrPerSprint: +avgHours });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={() => {}}
        id="avgHours"
        {...register("avgHours")}
        errorMessage={errors.avgHours?.message}
        onChange={() => {}}
        placeholder={`${hrPerSprint}`}
        defaultValue={`${hrPerSprint}`}
        submitButtonText="Save"
      />
    </form>
  );
}
