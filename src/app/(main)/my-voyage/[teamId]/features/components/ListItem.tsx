import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { Features } from "@/store/features/features/featuresSlice";
import useServerAction from "@/hooks/useServerAction";
import { editFeature } from "@/myVoyage/features/featuresService";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";

const validationSchema = z.object({
  description: validateTextInput({
    inputName: "This field",
    required: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface ListItemProps {
  feature: Features;
  index: number;
}

export default function ListItem({ feature, index }: ListItemProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const newRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { id, description, teamMemberId } = feature;

  const {
    runAction: editFeatureAction,
    isLoading: editFeatureLoading,
    setIsLoading: setEditFeatureLoading,
  } = useServerAction(editFeature);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { description } = data;

    const [, error] = await editFeatureAction({
      featureId: id,
      description,
      teamMemberId,
    });

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } })
      );
    }

    setEditFeatureLoading(false);
    setEditMode(false);
  };

  function handleClearInputAction() {
    reset({ description: "" });
  }

  function handleOutsideClick(e: MouseEvent | TouchEvent) {
    if (newRef.current && !newRef.current.contains(e.target as Node)) {
      setEditMode(false);
      reset({
        description,
      });
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  useEffect(() => {
    reset({
      description,
    });
  }, [description, reset]);

  useEffect(() => {
    if (editMode) {
      setFocus("description", { shouldSelect: true });
    }
  }, [editMode, setFocus]);

  return editMode ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      key={feature.id}
    >
      <div ref={newRef}>
        <TextInput
          clearInputAction={handleClearInputAction}
          id="description"
          {...register("description")}
          errorMessage={errors.description?.message}
          placeholder="Edit your feature"
          defaultValue={description}
          submitButtonText={editFeatureLoading ? <Spinner /> : "Save"}
          buttonDisabled={!isDirty || !isValid}
        />
      </div>
    </form>
  ) : (
    <Card
      key={feature.id}
      index={index}
      feature={feature}
      setEditMode={setEditMode}
    />
  );
}
