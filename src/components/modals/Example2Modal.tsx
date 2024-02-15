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
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { onOpen } from "@/store/features/toast/toastSlice";

const validationSchema = z.object({
  suggestion: validateTextInput({
    inputName: "Suggestion",
    required: true,
    maxLen: 30,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function Example2Modal() {
  const { isOpen, type } = useAppSelector((state) => state.modal.baseModal);
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
      })
    );
    handleClose();
  };

  const handleClose = useCallback(() => {
    reset();
    dispatch(onCloseModal({ type: "example2" }));
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
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            defaultValue=""
            suggestion="Tip: keep it short and sweet"
            maxLength={30}
            {...register("suggestion")}
            errorMessage={errors?.suggestion?.message}
          />
        </div>
        {/* BUTTONS */}
        <div className="flex flex-1 gap-5 pt-8">
          <Button
            variant="neutral"
            size="lg"
            aria-label="go back"
            onClick={() => {}}
            className="w-full"
          >
            Go back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            aria-label="submit"
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
