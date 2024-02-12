import type { Meta, StoryObj } from "@storybook/react";

import { FormEvent } from "react";
import { EnvelopeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/inputs/TextInput";

const meta = {
  title: "Components/Inputs/Text Input",
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
    },
    placeholder: {
      description: "The input placeholder.",
      control: "text",
    },
    suggestion: {
      description: "Add a short suggestion (optional).",
      control: "text",
    },
    maxLength: {
      description: "Add maximum length (optional).",
    },
    errorMessage: {
      description: "Error message (optional).",
    },
    inputGroup: {
      description:
        "Choose inputGroup (if `inputGroupIcon` is provided, becomes `required`).",
    },
    inputGroupIcon: {
      description:
        "Provide an icon for an input group (if `inputGroup` is provided, becomes `required`).",
      control: { type: "boolean" },
      mapping: { false: undefined, true: <EnvelopeIcon /> },
    },
    submitButtonVariant: {
      description: "Choose a submit button variant.",
    },
    submitButtonText: {
      description: "A submit button text.",
    },
    resetAction: {
      description: "An action to clear an input.",
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    id: "textInput",
    placeholder: "Placeholder",
  },
  render: ({ ...args }) => <TextInput {...args} />,
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

export const LeftInputGroup = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    inputGroup: "left",
    inputGroupIcon: <EnvelopeIcon />,
  },
};

const RightInputGroupTemplate: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    id: "textInput",
    placeholder: "Placeholder",
    inputGroup: "right",
    inputGroupIcon: <PlusCircleIcon />,
    submitButtonVariant: "primary",
    submitButtonText: "Save",
    resetAction: () => {},
  },
  render: ({ ...args }) => {
    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
    };
    return (
      <form onSubmit={onSubmit}>
        <TextInput {...args} />
      </form>
    );
  },
};

export const RightInputGroupWithPrimarySubmitButton = {
  ...RightInputGroupTemplate,
  args: {
    ...RightInputGroupTemplate.args,
    submitButtonVariant: "primary",
  },
};

export const RightInputGroupWithSecondarySubmitButton = {
  ...RightInputGroupTemplate,
  args: {
    ...RightInputGroupTemplate.args,
    submitButtonVariant: "secondary",
  },
};

export const RightInputGroupWithNeutralSubmitButton = {
  ...RightInputGroupTemplate,
  args: {
    ...RightInputGroupTemplate.args,
    submitButtonVariant: "neutral",
  },
};
