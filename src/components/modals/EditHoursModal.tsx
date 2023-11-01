"use client";

import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";

import { validateTextInput } from "@/helpers/form/validateInput";

import { useAppDispatch, useDirectory, useModal } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";
import { updateHours } from "@/api/directoryService";
import { setHoursPerSprint } from "@/store/features/directory/directorySlice";

const validationSchema = z.object({
  avgHours: validateTextInput({
    inputName: "Average Hour/Sprint",
    required: true,
    isHours: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function EditHoursModal() {
  const dispatch = useAppDispatch();

  const { isOpen, type, isEditing } = useModal();
  const { hoursPerSprint } = useDirectory();
  // const { userId, teamId } = useCurrentUser();
  // Also will get userId and teamId from userSlice when it's ready
  // for now using process.env.NEXT_PUBLIC_CURRENT_USER_ID and +process.env.NEXT_PUBLIC_TEAM_ID

  const isModalOpen = isOpen && type === "editHours";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    // populating data if editing
    if (isEditing && hoursPerSprint) {
      reset({ avgHours: hoursPerSprint.toString() });
    }
  }, [reset, isEditing, hoursPerSprint]);

  const handleClose = useCallback(() => {
    reset({ avgHours: "" });
    dispatch(onClose());
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      await updateHours({
        userId: "6eafeed5-a440-4b67-8016-0bfde5c4387c",
        teamId: 5,
        newAvgHours: +data.avgHours,
      });
      handleClose();
      dispatch(setHoursPerSprint({ hoursPerSprint: +data.avgHours }));
    } catch (error) {
      // Temp: log error, later the toast message gonna be added
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      title="edit average hour/sprint"
      onClose={handleClose}
    >
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        {/* BODY WITHOUT VERTICAL SCROLL*/}
        <div className="flex flex-col gap-4">
          <TextInput
            id="avgHours"
            label="How many hours can you commit for each sprint?"
            placeholder="Add your hours, we typically recommend 10-12 hours per week"
            register={{ ...register("avgHours") }}
            errors={errors}
            disabled={isSubmitting}
            suggestion="Please input hours only"
          />
        </div>
        {/* BUTTONS */}
        <div className="flex gap-5 pt-8">
          <Button
            type="submit"
            title="submit"
            disabled={!isDirty || !isValid || isSubmitting}
            customClassName="flex-1 text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus disabled:bg-primary disabled:hover:bg-primary-focus disabled:text-neutral-focus disabled:cursor-not-allowed disabled:hover:cursor-not-allowed"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
