import { SubmitHandler, useForm } from "react-hook-form";
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

const validationSchema = z.object({
  url: validateTextInput({
    inputName: "Url",
    required: true,
    minLen: 1,
    maxLen: 50,
    //require actual link i.e. "https://" or "http://" check Zod doc and validateInput.ts file
  }),
  title: validateTextInput({
    inputName: "Title",
    required: true,
    minLen: 1,
    maxLen: 50,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function ResourceInput() {
  const dispatch = useAppDispatch();
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);

  const {
    register,
    handleSubmit,
    formState: { /*errors, isDirty,*/ isValid /*dirtyFields*/ },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const payload = { ...data, teamId };
    const [res, error] = await addResource(payload);

    if (res) {
      console.log(res);
    }
    if (error) {
      dispatch(onOpenModal({ type: "error", content: error.message }));
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
          {...register("url")}
          inputGroupContent={<LinkIcon />}
        />
        <TextInput
          id="title"
          placeholder="Name your resource here."
          {...register("title")}
        />
      </div>
      {/* the button will be in disabled state until user puts in a valid url and name */}
      <Button
        className="w-1/4 m-4 whitespace-nowrap"
        type="submit"
        disabled={!isValid}
      >
        Share Resource
      </Button>
    </form>
  );
}
