import type { Meta, StoryObj } from "@storybook/react";

import { FormEvent, useState } from "react";
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
      description:
        "Choose a submit button variant (if `inputGroup` equals `right`, becomes `required`).",
    },
    submitButtonText: {
      description:
        "A submit button text (if `inputGroup` equals `right`, becomes `required`).",
    },
    clearInputAction: {
      description:
        "An action to clear an input (if `inputGroup` equals `right`, becomes `required`). If case of react-hook-form, you can pass `{() => reset({ inputId: '' })}`.",
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
    clearInputAction: () => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState("");
    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
    };
    const clearInput = () => {
      setValue("");
    };
    return (
      <form onSubmit={onSubmit}>
        <TextInput
          {...args}
          id={"textInput"}
          placeholder={"Placeholder"}
          inputGroup={"right"}
          inputGroupIcon={<PlusCircleIcon />}
          submitButtonVariant={"primary"}
          submitButtonText={"Save"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clearInputAction={() => clearInput()}
        />
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
