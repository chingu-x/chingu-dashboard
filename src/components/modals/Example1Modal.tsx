"use client";

import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "./Modal";
import { TextInput, Textarea } from "@/components/inputs";

import { useAppDispatch, useAppSelector } from "@/store";
import { onClose } from "@/store/features/modal";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  projectIdea: z
    .string()
    .min(1, {
      message: "Project idea is required.",
    })
    .min(5, {
      message: "More words, please.",
    })
    .min(25, {
      message: "More!",
    })
    .max(100, {
      message: "It's enough.",
    }),
  visionStatement1: z.string(),
  visionStatement2: z.string(),
});

export default function Example1Modal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "example1";

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
      title="create project"
      primaryActionLabel="submit"
      secondaryAction={() => {}}
      secondaryActionLabel="delete project"
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          id="title"
          label="title"
          placeholder="Enter you voyage project idea"
          register={register}
          errors={errors}
        />
        <Textarea
          id="projectIdea"
          label="project idea"
          placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
          register={register}
          errors={errors}
        />
        <Textarea
          id="visionStatement1"
          label="vision statement"
          placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
          register={register}
          errors={errors}
        />
        <Textarea
          id="visionStatement2"
          label="vision statement"
          placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
          register={register}
          errors={errors}
        />
      </div>
    </Modal>
  );
}
