"use client";

import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/20/solid";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/helpers/form/validateInput";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";

const validationSchema = z.object({
  title: validateTextInput({
    inputName: "Title",
    required: true,
    minLen: 10,
    maxLen: 30,
  }),
  projectIdea: validateTextInput({
    inputName: "Project idea",
    required: true,
    maxLen: 50,
  }),
  visionStatement: validateTextInput({
    inputName: "Vision statement",
    required: true,
    maxLen: 50,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function IdeationModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const editProject = false;
  let defaultValues = {};

  if (editProject) {
    defaultValues = {
      title: "some project title",
      projectIdea: "some project idea",
      visionStatement: "some vision statement",
    };
  } else {
    defaultValues = {
      title: "",
      projectIdea: "",
      visionStatement: "",
    };
  }

  const isModalOpen = isOpen && type === "ideation";

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<ValidationSchema>({
    defaultValues: defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  const handleClose = useCallback(() => {
    reset();
    dispatch(onClose());
  }, [dispatch]);

  return (
    <Modal isOpen={isModalOpen} title="create project" onClose={handleClose}>
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        {/* BODY WITH VERTICAL SCROLL */}
        <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[90px]">
          <div className="flex flex-col gap-4">
            <TextInput
              id="title"
              label="title"
              placeholder="Enter you voyage project idea"
              register={{ ...register("title") }}
              errors={errors}
              maxLength={30}
            />
            <Textarea
              id="projectIdea"
              label="project idea"
              placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
              register={{ ...register("projectIdea") }}
              errors={errors}
              maxLength={50}
            />
            <Textarea
              id="visionStatement"
              label="vision statement"
              placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
              register={{ ...register("visionStatement") }}
              errors={errors}
              maxLength={50}
            />
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex flex-col gap-5 pt-8">
          <Button
            type="submit"
            title="submit"
            disabled={!isDirty || !isValid}
            customClassName="text-base gap-x-0 border-none font-semibold capitalize btn-primary text-base-300 hover:btn-primary-focus disabled:bg-primary-focus disabled:text-neutral-content"
          >
            Submit Project
          </Button>
          <Button
            onClick={() => {}}
            title="delete"
            customClassName="text-base border-none font-semibold capitalize bg-error-content text-base-300 hover:bg-error"
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
}
