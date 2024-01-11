import type { Meta } from "@storybook/react";

import TextInput, { TextInputProps } from "@/components/inputs/TextInput";
import RHFWrapper from "@/stories/decorators/RHFWrapper";

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
      description: "The input id.",
      control: "text",
    },
    label: {
      description: "The input label (optional).",
      control: "text",
      defaultValue: { summary: "" },
    },
    placeholder: {
      description: "The input placeholder.",
      control: "text",
    },
    disabled: {
      description: "By default set to false. Optional.",
      control: "boolean",
    },
    suggestion: {
      description: "Add a short suggestion (optional).",
      control: "text",
      defaultValue: { summary: "" },
    },
    maxLength: {
      description: "Add maximum length(optional).",
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

function Template(args: TextInputProps) {
  return <TextInput {...args} />;
}

export const Default = {
  ...Template,
};

export const WithLabel = {
  ...Template,
  args: {
    label: "label",
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
