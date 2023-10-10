"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ValidationSchema, validationSchema } from "./Example1ModalValidation";
import Modal from "@/components/modals/Modal";
import { TextInput, Textarea } from "@/components/inputs";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";

export default function Example1Modal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "example1";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch]);

  return (
    <Modal
      isOpen={isModalOpen}
      title="create project"
      primaryActionLabel="submit"
      secondaryAction={() => {}}
      secondaryActionLabel="delete project"
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
    >
      <div className="flex flex-col gap-4">
        <TextInput
          id="title"
          label="title"
          placeholder="Enter you voyage project idea"
          register={{ ...register("title") }}
          errors={errors}
        />
        <Textarea
          id="projectIdea"
          label="project idea"
          placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
          register={{ ...register("projectIdea") }}
          errors={errors}
        />
        <Textarea
          id="visionStatement"
          label="vision statement"
          placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
          register={{ ...register("visionStatement") }}
          errors={errors}
        />
        <TextInput
          id="luckyNumber"
          label="lucky number"
          placeholder="Enter your lucky number"
          register={register("luckyNumber")}
          errors={errors}
        />
      </div>
    </Modal>
  );
}
