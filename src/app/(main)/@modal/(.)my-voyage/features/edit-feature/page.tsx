"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { TrashIcon } from "@heroicons/react/20/solid";

import { validateTextInput } from "@/helpers/form/validateInput";
import { onOpen } from "@/store/features/toast/toastSlice";
import { useAppDispatch } from "@/store/hooks";

import InterceptingModal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/Button";
import Alert from "@/components/Alert";

const validationSchema = z.object({
  feature: validateTextInput({
    inputName: "Feature",
    required: true,
    maxLen: 50,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function Example1InterceptingModal() {
  const dispatch = useAppDispatch();
  const [deleteAlertIsVisible, setDeleteAlertIsVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    dispatch(onOpen({ context: "success", message: "Feature updated" }));

    // Close modal, a timer is for exit animation
    const timer = setTimeout(() => {
      router.back();
    }, 450);
    return () => clearTimeout(timer);
  };

  const onDelete = () => {
    setDeleteAlertIsVisible(true);
  };

  const onDeleteConfirmed = () => {
    // TODO: temp
    dispatch(
      onOpen({ context: "warning", message: "Your feature has been deleted" }),
    );

    const timer = setTimeout(() => {
      router.back();
    }, 450);
    return () => clearTimeout(timer);
  };

  return (
    <InterceptingModal title="edit feature">
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
            update feature
          </Button>
          <Button
            size="lg"
            variant="error"
            onClick={deleteAlertIsVisible ? onDeleteConfirmed : onDelete}
          >
            <TrashIcon className="w-4 h-4" />
            {deleteAlertIsVisible ? "confirm deletion" : "delete feature"}
          </Button>
        </div>
      </form>
    </InterceptingModal>
  );
}
