"use client";

import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "./Modal";
import { TextInput } from "@/components/inputs";

import { useAppDispatch, useAppSelector } from "@/store";
import { onClose } from "@/store/features/modal";

const formSchema = z.object({
  suggestion: z.string().min(1, {
    message: "This field is required.",
  }),
});

export default function Example2Modal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "example2";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch]);

  return (
    <Modal
      isOpen={isModalOpen}
      title="add feature"
      primaryActionLabel="submit"
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          id="suggestion"
          placeholder="What is your tech stack suggestion?"
          register={register}
          errors={errors}
        />
      </div>
    </Modal>
  );
}
