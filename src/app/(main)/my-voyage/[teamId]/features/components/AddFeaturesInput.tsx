import * as z from "zod";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/utils/form/validateInput";
import { useAppDispatch } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import { addFeature } from "@/myVoyage/features/featuresService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";

interface AddFeaturesInputProps {
  handleClick: () => void;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
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
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }

    setAddFeatureLoading(false);
    setIsEditing(false);
  };

  return isEditing ? (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-6">
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
    <div className="mx-6">
      <Button
        variant="link"
        size="lg"
        className="justify-between w-full h-10 p-0 mt-3 font-medium border rounded-lg shadow-sm outline-none text-neutral-focus border-base-100"
        onClick={handleClick}
      >
        <div className="pl-3">Add Feature</div>
        <div className="flex items-center justify-center w-12 h-full rounded-tr-lg rounded-br-lg bg-neutral">
          <PlusCircleIcon className="w-6 h-6 text-base-200" />
        </div>
      </Button>
    </div>
  );
}
