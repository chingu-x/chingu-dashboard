"use client";

import { useCallback } from "react";
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

const validationSchema = z.object({
  avgHours: validateTextInput({
    inputName: "average hours/sprint",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function EditHoursModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, type, data } = useAppSelector((state) => state.modal);

  const isModalOpen = isOpen && type === "editHours";
  const { userId, teamId } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch]);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      // CORS problem
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}teams/${teamId}/member/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ hrPerSprint: +data.avgHours }),
        }
      );
      handleClose();
      router.refresh();
    } catch (error) {
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
            suggestion="Please input hours only"
          />
        </div>
        {/* BUTTONS */}
        <div className="flex gap-5 pt-8">
          <Button
            type="submit"
            title="submit"
            customClassName="flex-1 text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
