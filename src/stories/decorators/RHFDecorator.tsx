import { zodResolver } from "@hookform/resolvers/zod";
import { StoryContext, StoryFn } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { validateTextInput } from "@/helpers/form/validateInput";

function RHFWrapper(Story: StoryFn, context: StoryContext) {
  const validationSchema = z.object({
    textInput: validateTextInput({
      inputName: "Text Input",
    }),
  });
  type ValidationSchema = z.infer<typeof validationSchema>;
  const { register } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const { args } = context;

  Object.assign(args, {
    register: { ...register("textInput") },
    errors: {},
    id: "textInput",
    placeholder: "Text smth here",
  });

  return <Story {...context} />;
}

export default RHFWrapper;
