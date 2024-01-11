import { zodResolver } from "@hookform/resolvers/zod";
import { StoryContext, StoryFn } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { validateTextInput } from "@/helpers/form/validateInput";

const validationSchema = z.object({
  example: validateTextInput({
    inputName: "Example",
  }),
});
type ValidationSchema = z.infer<typeof validationSchema>;

function RHFWrapper(Story: StoryFn, context: StoryContext) {
  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const { args } = context;

  Object.assign(args, {
    id: "example",
    placeholder: "Placeholder",
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Story {...context} />
      </form>
    </FormProvider>
  );
}

export default RHFWrapper;
