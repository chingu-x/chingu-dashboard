"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EnvelopeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";

import { validateTextInput } from "@/helpers/form/validateInput";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";
import { onOpen } from "@/store/features/toast/toastSlice";

const validationSchema = z.object({
  email: validateTextInput({
    inputName: "Email",
    required: true,
    isEmail: true,
  }),
  suggestion: validateTextInput({
    inputName: "Suggestion",
    required: true,
    maxLen: 30,
  }),
  techStack: validateTextInput({
    inputName: "Teck Stack",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function Example2Modal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "example2";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    dispatch(
      onOpen({
        context: "success",
        message: "Your information has been updated",
      }),
    );
    handleClose();
  };

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch, reset]);

  return (
    <Modal isOpen={isModalOpen} title="add feature" onClose={handleClose}>
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        {/* BODY WITHOUT VERTICAL SCROLL*/}
        <div className="flex flex-col gap-4">
          <TextInput
            id="email"
            placeholder="What is your email?"
            inputGroupContent={<EnvelopeIcon />}
            {...register("email")}
            errorMessage={errors?.email?.message}
          />
          <TextInput
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            suggestion="Tip: keep it short and sweet"
            maxLength={30}
            submitButtonText="Add"
            clearInputAction={() => reset({ suggestion: "" })}
            {...register("suggestion")}
            errorMessage={errors?.suggestion?.message}
          />
          <TextInput
            id="techStack"
            placeholder="Add Tech Stack"
            inputGroupContent={<PlusCircleIcon />}
            submitButtonText="Save"
            clearInputAction={() => reset({ techStack: "" })}
            {...register("techStack")}
            errorMessage={errors?.techStack?.message}
          />
        </div>
      </form>
    </Modal>
  );
}
