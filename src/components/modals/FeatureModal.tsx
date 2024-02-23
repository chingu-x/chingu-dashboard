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

import { onCloseModal } from "@/store/features/modal/modalSlice";
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
  const { isOpen, type, isEditing } = useAppSelector(
    (state) => state.modal.baseModal
  );
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
    dispatch(onCloseModal({ type: "feature" }));
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
      onOpen({ context: "warning", message: "Your feature has been deleted" })
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
            suggestion={isEditing ? "" : "Tip: keep it short and sweet"}
            maxLength={50}
            {...register("feature")}
            errorMessage={errors?.feature?.message}
          />
        </div>
        {/* BUTTONS */}
        <div className="flex flex-col gap-5 pt-8">
          <Button
            size="lg"
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            {isEditing ? "update feature" : "submit"}
          </Button>
          {isEditing && (
            <Button
              size="lg"
              variant="error"
              onClick={deleteAlertIsVisible ? onDeleteConfirmed : onDelete}
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
