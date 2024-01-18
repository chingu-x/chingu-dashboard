"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { TrashIcon } from "@heroicons/react/20/solid";

import { validateTextInput } from "@/helpers/form/validateInput";
import { onOpen } from "@/store/features/toast/toastSlice";
import { useAppDispatch } from "@/store/hooks";

import InterceptingModal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";

const validationSchema = z.object({
  title: validateTextInput({
    inputName: "Title",
    required: true,
    minLen: 10,
    maxLen: 20,
  }),
  projectIdea: validateTextInput({
    inputName: "Project idea",
    required: true,
    maxLen: 50,
  }),
  visionStatement: validateTextInput({
    inputName: "Vision statement",
    required: true,
    maxLen: 50,
  }),
  email: validateTextInput({
    inputName: "Email",
    required: true,
    isEmail: true,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function Example1InterceptingModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    dispatch(
      onOpen({
        context: "success",
        message: "Your information has been updated",
      }),
    );

    // Close modal, a timer is for exit animation
    const timer = setTimeout(() => {
      router.back();
    }, 450);
    return () => clearTimeout(timer);
  };

  return (
    <InterceptingModal title="Intercepting Modal">
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        {/* BODY WITH VERTICAL SCROLL */}
        <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[90px]">
          <div className="flex flex-col gap-4">
            <TextInput
              id="title"
              label="title"
              placeholder="Enter you voyage project idea"
              maxLength={30}
              {...register("title")}
              errorMessage={errors?.title?.message}
            />
            <Textarea
              id="projectIdea"
              label="project idea"
              placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
              maxLength={50}
              {...register("projectIdea")}
              errorMessage={errors?.projectIdea?.message}
            />
            <Textarea
              id="visionStatement"
              label="vision statement"
              placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
              maxLength={50}
              {...register("visionStatement")}
              errorMessage={errors?.visionStatement?.message}
            />
            <TextInput
              id="email"
              label="email"
              placeholder="Enter your email"
              {...register("email")}
              errorMessage={errors?.email?.message}
            />
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex flex-col gap-5 pt-8">
          <Button type="submit" variant="primary" size="lg" aria-label="submit">
            Submit
          </Button>
          <Button
            variant="error"
            size="lg"
            onClick={() => {}}
            title="delete"
            aria-label="delete"
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </form>
    </InterceptingModal>
  );
}
