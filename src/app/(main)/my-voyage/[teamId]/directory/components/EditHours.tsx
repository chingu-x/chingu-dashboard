import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/inputs/TextInput";
import { validateTextInput } from "@/helpers/form/validateInput";
import { useAppDispatch } from "@/store/hooks";
import { editHours } from "@/app/(main)/my-voyage/[teamId]/directory/directoryService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

interface EditHoursProps {
  hrPerSprint: number;
  isEditing: boolean;
  handleclick: () => void;
}

const validationSchema = z.object({
  avgHours: validateTextInput({
    inputName: "Average Hour/Sprint",
    required: true,
    isHours: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function EditHours({
  hrPerSprint,
  isEditing,
  handleclick,
}: EditHoursProps) {
  const params = useParams<{ teamId: string }>();
  const teamId = +params.teamId;
  const dispatch = useAppDispatch();

  const {
    runAction: editHoursAction,
    isLoading: editHoursLoading,
    setIsLoading: setEditHoursLoading,
  } = useServerAction(editHours);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { avgHours } = data;
    const [, error] = await editHoursAction({ teamId, hrPerSprint: +avgHours });

    if (error) {
      dispatch(onOpenModal({ type: "error", content: error.message }));
    }

    setEditHoursLoading(false);
  };

  function handleClearInputAction() {
    reset({ avgHours: hrPerSprint.toString() });
  }

  return isEditing ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        clearInputAction={handleClearInputAction}
        id="avgHours"
        {...register("avgHours")}
        className=""
        errorMessage={errors.avgHours?.message}
        placeholder={`${hrPerSprint}`}
        defaultValue={`${hrPerSprint}`}
        submitButtonText={editHoursLoading ? <Spinner /> : "Save"}
        buttonDisabled={!isDirty || !isValid}
      />
    </form>
  ) : (
    <Button
      variant="link"
      className="flex justify-between border-2 w-full outline-none rounded-lg px-3.5 mt-2 mb-5 shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-base-300 disabled:cursor-not-allowed border-neutral/40 group-hover:border-neutral-focus group-hover:focus-visible:border-neutral/40 focus-visible:border-neutral/40 focus-visible:shadow-neutral/30 disabled:bg-base-100 disabled:group-hover:border-neutral/40"
      onClick={handleclick}
    >
      {hrPerSprint ? `${hrPerSprint}` : "Add Hours"}
      <PencilSquareIcon className="w-3.5" />
    </Button>
  );
}
