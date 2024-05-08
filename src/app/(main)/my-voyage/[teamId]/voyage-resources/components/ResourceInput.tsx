import { type SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/store/hooks";
import { validateTextInput } from "@/helpers/form/validateInput";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { addResource } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/resourcesService";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";

const validationSchema = z.object({
  url: validateTextInput({
    inputName: "Url",
    required: true,
    isUrl: true,
  }),
  title: validateTextInput({
    inputName: "Title",
    required: true,
    minLen: 1,
    maxLen: 100,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function ResourceInput() {
  const dispatch = useAppDispatch();
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);

  const {
    runAction: addResourceAction,
    isLoading: addResourceLoading,
    setIsLoading: setAddResourceLoading,
  } = useServerAction(addResource);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const payload = { ...data, teamId };
    const [res, error] = await addResourceAction(payload);

    if (res) {
      setAddResourceLoading(false);
      reset();
    }
    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } })
      );
      setAddResourceLoading(false);
    }
  };

  return (
    <form
      className="flex items-center w-full p-1 shadow-lg bg-base-200 rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-3/4 m-4 ">
        <TextInput
          id="url"
          placeholder="Paste your resource link here."
          errorMessage={
            errors.url?.type === "invalid_string"
              ? "Must start with https://"
              : ""
          }
          {...register("url")}
          inputGroupContent={<LinkIcon />}
        />
        <TextInput
          id="title"
          placeholder="Name your resource here."
          {...register("title")}
        />
      </div>
      <Button
        className="w-1/4 m-4 whitespace-nowrap"
        type="submit"
        disabled={!isValid}
      >
        Share Resource
        {addResourceLoading ? <Spinner /> : null}
      </Button>
    </form>
  );
}
