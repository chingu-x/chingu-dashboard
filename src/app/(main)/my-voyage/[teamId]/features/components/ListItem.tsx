import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { Features } from "@/store/features/features/featuresSlice";

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
  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {};
  const newRef = useRef<HTMLDivElement>(null);

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

  function handleClearInputAction() {}

  function handleOutsideClick(e: MouseEvent | TouchEvent) {
    if (newRef.current && !newRef.current.contains(e.target as Node)) {
      setEditMode(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <div ref={newRef}>
      {editMode ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          key={feature.id}
        >
          <TextInput
            clearInputAction={handleClearInputAction}
            id="description"
            {...register("description")}
            errorMessage={errors.description?.message}
            placeholder="Add Feature"
            submitButtonText="Save"
            buttonDisabled={!isDirty || !isValid}
          />
        </form>
      ) : (
        <Card
          key={feature.id}
          index={index}
          feature={feature}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
}
