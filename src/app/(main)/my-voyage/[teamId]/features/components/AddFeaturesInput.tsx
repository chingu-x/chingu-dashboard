import * as z from "zod";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";

interface AddFeaturesInputProps {
  handleClick: () => void;
  isEditing: boolean;
}

const validationSchema = z.object({
  avgHours: validateTextInput({
    inputName: "Average Hour/Sprint",
    required: true,
    isHours: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function AddFeaturesInput({
  handleClick,
  isEditing,
}: AddFeaturesInputProps) {
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

  const onSubmit: SubmitHandler<ValidationSchema> = async () => {};

  return isEditing ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={handleClearInputAction}
        id="avgHours"
        {...register("avgHours")}
        errorMessage={errors.avgHours?.message}
        placeholder="Add Feature"
        submitButtonText="Save"
        buttonDisabled={!isDirty || !isValid}
      />
    </form>
  ) : (
    <Button
      variant="link"
      size="lg"
      className="h-10 justify-between p-0 w-full outline-none rounded-lg text-neutral-focus font-medium shadow-md border border-base-100 mt-3"
      onClick={handleClick}
    >
      <div className="pl-3">Add Feature</div>
      <div className="flex justify-center items-center w-12 h-full bg-neutral rounded-br-lg rounded-tr-lg">
        <PlusCircleIcon className="w-6 h-6 text-base-200" />
      </div>
    </Button>
  );
}
