"use client";

import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";

import { validateTextInput } from "@/helpers/form/validateInput";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";
import { updateHours } from "@/api/routes";

const validationSchema = z.object({
  avgHours: validateTextInput({
    required: true,
    isHours: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function EditHoursModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, type, data } = useAppSelector((state) => state.modal);

  const isModalOpen = isOpen && type === "editHours";
  const { userId, teamId, avgHours } = data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
    reset,
    setValue,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (avgHours && avgHours !== "") {
      setValue("avgHours", avgHours);
    }
  }, [avgHours]);

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch]);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    if (userId && teamId) {
      try {
        await updateHours({
          userId: userId,
          teamId: teamId,
          newAvgHours: +data.avgHours,
        });
        handleClose();
        router.refresh();
      } catch (error) {
        // Temp: log error, later the toast message gonna be added
        console.log(error);
      }
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
            disabled={isLoading}
            suggestion="Please input hours only"
          />
        </div>
        {/* BUTTONS */}
        <div className="flex gap-5 pt-8">
          <Button
            type="submit"
            title="submit"
            disabled={isLoading}
            customClassName="flex-1 text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus disabled:bg-primary disabled:hover:bg-primary-focus disabled:text-neutral-focus disabled:cursor-not-allowed disabled:hover:cursor-not-allowed"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
