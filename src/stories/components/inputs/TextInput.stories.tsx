import type { Meta } from "@storybook/react";

import TextInput, { TextInputProps } from "@/components/inputs/TextInput";
import RHFWrapper from "@/stories/decorators/RHFDecorator";

const meta = {
  title: "Components/Inputs/Text Input",
  decorators: [RHFWrapper],
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      description: "What is an input's id?",
    },
    label: {
      description: "What is an input's label? (optional)",
    },
    placeholder: {
      description: "What is an input's placeholder?",
    },
    register: {
      description:
        "Register an input to use React Hook Form. Example: `{...register('textInput')}`. `register` comes from useForm() hook.",
    },
    errors: {
      description: "Example: `{errors}`. `errors` comes from useForm() hook.",
    },
    suggestion: {
      description: "Add a short suggestion (optional)",
    },
    maxLength: {
      description: "Add maximum length(optional)",
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

const Template = (args: TextInputProps) => <TextInput {...args} />;

export const Default = {
  ...Template,
};

export const WithLabel = {
  ...Template,
  args: {
    label: "Label",
  },
};

export const WithSuggestion = {
  ...Template,
  args: {
    suggestion: "Tip: keep it short and sweet",
  },
};

export const WithMaxLength = {
  ...Template,
  args: {
    maxLength: 10,
  },
};
