"use client";

import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/20/solid";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import Alert from "@/components/Alert";

import { validateTextInput } from "@/helpers/form/validateInput";

import { onClose } from "@/store/features/modal/modalSlice";
import { onOpen } from "@/store/features/toast/toastSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const validationSchema = z.object({
  feature: validateTextInput({
    inputName: "Feature",
    required: true,
    maxLen: 50,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function FeatureModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type, isEditing } = useAppSelector((state) => state.modal);
  const [deleteAlertIsVisible, setDeleteAlertIsVisible] = useState(false);

  const isModalOpen = isOpen && type === "feature";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    // TODO: populating data if editing
    if (isEditing) {
      reset();
    }
  }, [reset, isEditing]);

  const handleClose = useCallback(() => {
    reset({ feature: "" });
    setDeleteAlertIsVisible(false);
    dispatch(onClose());
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    // TODO: temp
    console.log(data);
    handleClose();
    if (isEditing) {
      dispatch(onOpen({ context: "success", message: "Feature updated" }));
    } else {
      dispatch(onOpen({ context: "success", message: "Feature added" }));
    }
  };

  const onDelete = () => {
    setDeleteAlertIsVisible(true);
  };

  const onDeleteConfirmed = () => {
    // TODO: temp
    handleClose();
    dispatch(
      onOpen({ context: "warning", message: "Your feature has been deleted" }),
    );
  };

  return (
    <Modal
      isOpen={isModalOpen}
      title={isEditing ? "edit feature" : "add feature"}
      onClose={handleClose}
    >
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        {/* BODY WITHOUT VERTICAL SCROLL*/}
        <div className="flex flex-col gap-4">
          {deleteAlertIsVisible && (
            <Alert context="error" message={"You cannot undo this action"} />
          )}
          <TextInput
            id="feature"
            placeholder="What is your feature suggestion?"
            register={{ ...register("feature") }}
            errors={errors}
            suggestion={isEditing ? "" : "Tip: keep it short and sweet"}
            maxLength={50}
          />
        </div>
        {/* BUTTONS */}
        <div className="flex flex-col gap-5 pt-8">
          <Button
            type="submit"
            title={isEditing ? "update feature" : "submit"}
            disabled={!isDirty || !isValid || isSubmitting}
            customClassName="flex-1 text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus disabled:bg-primary disabled:hover:bg-primary-focus disabled:text-neutral-focus disabled:cursor-not-allowed disabled:hover:cursor-not-allowed"
          >
            {isEditing ? "update feature" : "submit"}
          </Button>
          {isEditing && (
            <Button
              onClick={deleteAlertIsVisible ? onDeleteConfirmed : onDelete}
              title={
                deleteAlertIsVisible ? "confirm deletion" : "delete feture"
              }
              customClassName="text-base border-none font-semibold capitalize bg-error-content text-base-300 hover:bg-error"
            >
              <TrashIcon className="w-4 h-4" />
              {deleteAlertIsVisible ? "confirm deletion" : "delete feature"}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
