"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { TrashIcon } from "@heroicons/react/20/solid";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/helpers/form/validateInput";

// import { useAppDispatch } from "@/store/hooks";

const validationSchema = z.object({
  title: validateTextInput({
    inputName: "Title",
    required: true,
    minLen: 10,
    maxLen: 50,
  }),
  projectIdea: validateTextInput({
    inputName: "Project idea",
    required: true,
    minLen: 10,
  }),
  visionStatement: validateTextInput({
    inputName: "Vision statement",
    required: true,
    minLen: 10,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function AddIdeationPage() {
  const router = useRouter();
  const params = useParams<{ teamId: string }>();
  // const dispatch = useAppDispatch();

  console.log(params);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  //   useEffect(() => {
  //     if (mode === "edit") {
  //       reset({
  //         title: "some project title",
  //         projectIdea: "some project idea",
  //         visionStatement: "some vision statement",
  //       });
  //     }
  //   }, [mode, reset]);

  return (
    <div className="flex flex-col items-center">
      <div></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-[1000px] gap-y-10"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-base-300 text-3xl font-bold">Add Project Idea</h1>
          <p className="text-base-300 text-lg font-medium">
            Share your project idea with the team.
          </p>
        </div>
        <TextInput
          id="title"
          label="title"
          placeholder="Enter you voyage project idea"
          {...register("title")}
          errorMessage={errors.title?.message}
          maxLength={50}
        />
        <Textarea
          id="projectIdea"
          label="project idea"
          placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
          {...register("projectIdea")}
          errorMessage={errors.projectIdea?.message}
        />
        <Textarea
          id="visionStatement"
          label="vision statement"
          placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
          {...register("visionStatement")}
          errorMessage={errors.visionStatement?.message}
        />
        <Button
          type="submit"
          title="submit"
          disabled={!isDirty || !isValid}
          size="lg"
          variant="primary"
        >
          Add Project Idea
        </Button>
        <Button
          type="button"
          title="cancel"
          size="lg"
          variant="link"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        {/* {mode === "edit" && (
          <Button
            onClick={() => {}}
            title="delete"
            customClassName="text-base border-none font-semibold capitalize bg-error-content text-base-300 hover:bg-error"
          >
            <TrashIcon className="w-4 h-4" />
            Delete Project
          </Button>
        )} */}
      </form>
    </div>
  );
}
