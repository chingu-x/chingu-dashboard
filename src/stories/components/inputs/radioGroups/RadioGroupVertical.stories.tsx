import type { Meta, StoryObj } from "@storybook/react";

import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";
import Label from "@/components/inputs/Label";

const options = [
  {
    id: "option_1",
    value: "option_1",
    label: "Option 1",
  },
  {
    id: "option_2",
    value: "option_2",
    label: "Option 2",
  },
  {
    id: "option_3",
    value: "option_3",
    label: "Option 3",
  },
  {
    id: "option_4",
    value: "option_4",
    label: "Option 4",
  },
];

const meta = {
  title: "Components/Inputs/Radio Groups/Vertical Radio Group ",
  component: RadioGroupVertical,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      description:
        "Options - an array of objects which must have `id`, `label` and `value`",
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof RadioGroupVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 800, display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: options,
  },
  render: ({ ...args }) => (
    <div className="flex flex-col gap-y-10">
      <Label className="font-semibold normal-case">Label</Label>
      <RadioGroupVertical {...args} options={options} name="options" />
    </div>
  ),
};

export const Default = {
  ...BaseTemplate,
};
