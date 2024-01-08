import { validateTextInput } from "@/helpers/form/validateInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Decorator } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RHFWrapper: Decorator = (Story, context) => {
  const validationSchema = z.object({
    textInput: validateTextInput({
      inputName: "Text Input",
    }),
  });
  type ValidationSchema = z.infer<typeof validationSchema>;
  const { register } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  Object.assign(context.args, {
    register: { ...register("textInput") },
    errors: {},
    id: "textInput",
    placeholder: "Text smth here",
  });

  return <Story {...context} />;
};

export default RHFWrapper;
