import { type SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Button } from "@chingu-x/components/button";
import { useAppDispatch } from "@/store/hooks";
import { validateTextInput } from "@/utils/form/validateInput";
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
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
      setAddResourceLoading(false);
    }
  };

  return (
    <form
      className="flex w-full items-center rounded-xl bg-base-200 p-1 shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mx-4 mb-1 mt-3 flex w-3/4 flex-col">
        <TextInput
          id="url"
          placeholder="Paste your resource link here."
          ariaLabel="link"
          errorMessage={errors.url?.message}
          {...register("url")}
          inputGroupContent={<LinkIcon />}
        />
        <TextInput
          id="title"
          placeholder="Name your resource here."
          ariaLabel="resource name"
          errorMessage={errors.title?.message}
          {...register("title")}
        />
      </div>
      <Button
        className="m-4 w-1/4 whitespace-nowrap"
        type="submit"
        disabled={!isValid}
      >
        Share Resource
        {addResourceLoading ? <Spinner /> : null}
      </Button>
    </form>
  );
}
