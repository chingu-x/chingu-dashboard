"use client";

import { useCallback, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import Alert from "@/components/Alert";

import { validateTextInput } from "@/helpers/form/validateInput";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";
import { onOpen } from "@/store/features/toast/toastSlice";

import { currentUser } from "@/app/tech-stack/components/TechStackContainer";
import {
  getPostBody,
  checkIfDuplicated,
} from "@/app/tech-stack/components/helpers";
import { postNewTech } from "@/api/techStackService/techStackService";

const validationSchema = z.object({
  suggestion: validateTextInput({
    inputName: "Suggestion",
    required: true,
    maxLen: 20,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function TechStackModal() {
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);

  const { isOpen, type } = useAppSelector((state) => state.modal);
  const { currentStackId, techNames } = useAppSelector(
    (state) => state.techStack,
  );
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "TechStackModal";

  useEffect(() => {
    setIsDuplicated(false);
  }, [isModalOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async ({ suggestion }) => {
    if (checkIfDuplicated(techNames, suggestion)) {
      setIsDuplicated(true);
      return;
    }

    if (suggestion && currentStackId) {
      const body = getPostBody(currentUser.id, suggestion, currentStackId);
      try {
        await postNewTech(currentUser.teamId, body);
        handleClose();
        dispatch(onOpen({ context: "success", message: "Tech stack added" }));
      } catch (error) {
        handleClose();
        dispatch(
          onOpen({ context: "error", message: "An error has occurred" }),
        );
      }
    }
  };

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch]);

  return (
    <Modal isOpen={isModalOpen} title="Add Tech Stack" onClose={handleClose}>
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        {/* BODY WITHOUT VERTICAL SCROLL*/}
        <div className="flex flex-col gap-4">
          {isDuplicated ? (
            <Alert
              context="duplicate"
              message={"Duplicate item, please try another suggestion"}
            />
          ) : null}
          <TextInput
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            register={{ ...register("suggestion") }}
            errors={errors}
            suggestion="Tip: keep it short and sweet"
            maxLength={20}
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
