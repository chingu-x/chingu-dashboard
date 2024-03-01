import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import DateTimePicker from "@/components/inputs/DateTimePicker";

const meta = {
  title: "Components/Inputs/DateTime Picker",
  component: DateTimePicker,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 350,
          height: 350,
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
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
    selectedValue: { description: "Selected value.", control: "date" },
    placeholder: {
      description: "The input placeholder.",
      control: "text",
    },
    errorMessage: {
      description: "Error message (optional).",
      control: "text",
    },
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  args: {
    id: "textInput",
    label: "label",
    selectedValue: new Date(),
    placeholder: "Placeholder",
  },
  render: function Render(args) {
    const [selectedValue, setSelectedValue] = useState(new Date());
    return (
      <DateTimePicker
        {...args}
        id="textInput"
        placeholder="Placeholder"
        selectedValue={selectedValue}
        onChange={(date: Date) => setSelectedValue(date)}
      />
    );
  },
};

export const Default = {
  ...BaseTemplate,
};

export const WithErrorMessage = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    errorMessage: "Required",
  },
};
