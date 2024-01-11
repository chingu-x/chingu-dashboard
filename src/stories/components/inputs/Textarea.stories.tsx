import type { Meta } from "@storybook/react";

import Textarea, { TextareaProps } from "@/components/inputs/Textarea";
import RHFWrapper from "@/stories/decorators/RHFWrapper";

const meta = {
  title: "Components/Inputs/Textarea",
  decorators: [RHFWrapper],
  component: Textarea,
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
      description: "The input label.",
      control: "text",
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
} satisfies Meta<typeof Textarea>;

export default meta;

function Template(args: TextareaProps) {
  return <Textarea {...args} />;
}

export const Default = {
  ...Template,
  args: {
    label: "label",
  },
};

export const WithSuggestion = {
  ...Template,
  args: {
    label: "label",
    suggestion: "Tip: keep it short and sweet",
  },
};

export const WithMaxLength = {
  ...Template,
  args: {
    label: "label",
    maxLength: 10,
  },
};
