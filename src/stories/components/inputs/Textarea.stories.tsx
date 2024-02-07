import type { Meta, StoryObj } from "@storybook/react";

import Textarea from "@/components/inputs/Textarea";

const meta = {
  title: "Components/Inputs/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      description: "The textarea id.",
      control: "text",
    },
    label: {
      description: "The textarea label (optional).",
      control: "text",
    },
    placeholder: {
      description: "The textarea placeholder.",
      control: "text",
    },
    suggestion: {
      description: "Add a short suggestion (optional).",
      control: "text",
    },
    maxLength: {
      description: "Add maximum length(optional).",
    },
    errorMessage: {
      description: "Error message (optional).",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  args: {
    id: "textarea",
    placeholder: "Placeholder",
    defaultValue: "",
  },
  render: ({ ...args }) => <Textarea {...args} />,
};

export const Default = {
  ...BaseTemplate,
};

export const WithLabel = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    label: "label",
  },
};

export const WithSuggestion = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    suggestion: "Tip: keep it short and sweet",
  },
};

export const WithMaxLength = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    maxLength: 10,
  },
};

export const WithErrorMessage = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    errorMessage: "Required",
  },
};
