"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";

import { validateTextInput } from "@/helpers/form/validateInput";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";

const validationSchema = z.object({
  suggestion: validateTextInput({
    inputName: "Suggestion",
    required: true,
    maxLen: 30,
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
    formState: { errors, isSubmitting: isLoading },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch]);

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
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            register={{ ...register("suggestion") }}
            errors={errors}
            disabled={isLoading}
            suggestion="Tip: keep it short and sweet"
            maxLength={30}
          />
        </div>
        {/* BUTTONS */}
        <div className="flex gap-5 pt-8">
          <Button
            onClick={() => {}}
            title="go back"
            customClassName="flex-1 text-base border-none font-semibold capitalize bg-base-100 text-base-300 hover:bg-base-100/80"
          >
            Go back
          </Button>
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
