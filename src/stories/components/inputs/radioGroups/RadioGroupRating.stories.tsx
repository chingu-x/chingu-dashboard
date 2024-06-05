import type { Meta, StoryObj } from "@storybook/react";

import RadioGroupRating from "@/components/inputs/RadioGroup/RadioGroupRating";
import Label from "@/components/inputs/Label";

const options = [
  {
    id: "option_1",
    value: "option_1",
    label: "1",
  },
  {
    id: "option_2",
    value: "option_2",
    label: "2",
  },
  {
    id: "option_3",
    value: "option_3",
    label: "3",
  },
  {
    id: "option_4",
    value: "option_4",
    label: "4",
  },
  {
    id: "option_5",
    value: "option_5",
    label: "5",
  },
  {
    id: "option_6",
    value: "option_6",
    label: "6",
  },
  {
    id: "option_7",
    value: "option_7",
    label: "7",
  },
  {
    id: "option_8",
    value: "option_8",
    label: "8",
  },
  {
    id: "option_9",
    value: "option_9",
    label: "9",
  },
  {
    id: "option_10",
    value: "option_10",
    label: "10",
  },
];

const meta = {
  title: "Components/Inputs/Radio Groups/Rating Radio Group ",
  component: RadioGroupRating,
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
    leftTitle: {
      description: "A title for a complex radio group with rating layout.",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Left Title" },
    },
    rightTitle: {
      description: "A title for a complex radio group with rating layout.",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Right Title" },
    },
  },
} satisfies Meta<typeof RadioGroupRating>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: options,
    leftTitle: "Left Title",
    rightTitle: "Right Title",
  },
  render: ({ ...args }) => (
    <div className="flex w-full flex-col items-center gap-y-10 rounded-2xl bg-base-100 p-10">
      <Label className="font-semibold normal-case">Label</Label>
      <div className="w-full">
        <RadioGroupRating {...args} options={options} name="options" />
      </div>
    </div>
  ),
};

export const Default = {
  ...BaseTemplate,
};
