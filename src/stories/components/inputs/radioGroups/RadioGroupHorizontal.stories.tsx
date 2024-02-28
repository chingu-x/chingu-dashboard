import type { Meta, StoryObj } from "@storybook/react";

import RadioGroupHorizontal from "@/components/inputs/RadioGroup/RadioGroupHorizontal";
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
const options2 = [
  {
    id: "option2_1",
    value: "option2_1",
    label: "Option 1",
  },
  {
    id: "option2_2",
    value: "option2_2",
    label: "Option 2",
  },
  {
    id: "option2_3",
    value: "option2_3",
    label: "Option 3",
  },
  {
    id: "option2_4",
    value: "option2_4",
    label: "Option 4",
  },
];

const meta = {
  title: "Components/Inputs/Radio Groups/Horizontal Radio Group ",
  component: RadioGroupHorizontal,
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
    title: {
      description: "A title for a complex radio group with horizontal layout. ",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Title" },
    },
  },
} satisfies Meta<typeof RadioGroupHorizontal>;

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
    title: "Title",
  },
  render: ({ ...args }) => (
    <div className="flex flex-col gap-y-10">
      <Label className="font-semibold normal-case">Label</Label>
      {/* TOP LABELS */}
      <div className="flex flex-col gap-y-5">
        <div className="w-full grid grid-cols-[150px_1fr] gap-x-4 items-center justify-between">
          <span></span>
          <div className="flex justify-between pl-6 pr-4">
            {options.map(({ label }) => (
              <span key={label} className="text-base font-medium text-base-300">
                {label}
              </span>
            ))}
          </div>
        </div>
        <RadioGroupHorizontal
          {...args}
          options={options}
          title="Title 1"
          name="options"
        />
        <RadioGroupHorizontal
          {...args}
          options={options2}
          title="Title 2"
          name="options2"
        />
      </div>
    </div>
  ),
};

export const Default = {
  ...BaseTemplate,
};
