import * as z from "zod";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction, useEffect } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useAppDispatch } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import { addFeature } from "@/myVoyage/features/featuresService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";

interface AddFeaturesInputProps {
  handleClick: () => void;
  isEditing: boolean;
  setIsEditing: (value: SetStateAction<boolean>) => void;
  id: number;
}

const validationSchema = z.object({
  description: validateTextInput({
    inputName: "This field",
    required: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function AddFeaturesInput({
  handleClick,
  isEditing,
  setIsEditing,
  id,
}: AddFeaturesInputProps) {
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);
  const dispatch = useAppDispatch();

  const {
    runAction: addFeatureAction,
    isLoading: addFeatureLoading,
    setIsLoading: setAddFeatureLoading,
  } = useServerAction(addFeature);

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

  function handleClearInputAction() {
    reset({ description: "" });
  }

  useEffect(() => {
    if (isEditing) {
      setFocus("description", { shouldSelect: true });
    }
  }, [isEditing, setFocus]);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { description } = data;

    const [, error] = await addFeatureAction({
      teamId,
      description,
      featureCategoryId: id,
    });

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } })
      );
    }

    setAddFeatureLoading(false);
    setIsEditing(false);
  };

  return isEditing ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={handleClearInputAction}
        id="description"
        {...register("description")}
        errorMessage={errors.description?.message}
        placeholder="Add Feature"
        submitButtonText={addFeatureLoading ? <Spinner /> : "Save"}
        buttonDisabled={!isDirty || !isValid}
      />
    </form>
  ) : (
    <Button
      variant="link"
      size="lg"
      className="h-10 justify-between p-0 w-full outline-none rounded-lg text-neutral-focus font-medium shadow-sm border border-base-100 mt-3"
      onClick={handleClick}
    >
      <div className="pl-3">Add Feature</div>
      <div className="flex justify-center items-center w-12 h-full bg-neutral rounded-br-lg rounded-tr-lg">
        <PlusCircleIcon className="w-6 h-6 text-base-200" />
      </div>
    </Button>
  );
}
