"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { validateTextInput } from "@/helpers/form/validateInput";
import { onOpen } from "@/store/features/toast/toastSlice";
import { useAppDispatch } from "@/store/hooks";

import InterceptingModal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/Button";

const validationSchema = z.object({
  suggestion: validateTextInput({
    inputName: "Suggestion",
    required: true,
    maxLen: 30,
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
        {/* BODY WITHOUT VERTICAL SCROLL*/}
        <div className="flex flex-col gap-4">
          <TextInput
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            suggestion="Tip: keep it short and sweet"
            maxLength={30}
            {...register("suggestion")}
            errorMessage={errors?.suggestion?.message}
          />
        </div>
        {/* BUTTONS */}
        <div className="flex flex-1 gap-5 pt-8">
          <Button
            variant="neutral"
            size="lg"
            aria-label="go back"
            onClick={() => {}}
            className="w-full"
          >
            Go back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            aria-label="submit"
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </InterceptingModal>
  );
}
