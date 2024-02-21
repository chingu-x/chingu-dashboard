import type { Meta, StoryObj } from "@storybook/react";

import RadioGroup from "@/components/inputs/RadioGroup";

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
  title: "Components/Inputs/Radio Group",
  component: RadioGroup,
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
      description:
        "Title for a complex radio group with alt layout (optional). ",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Title" },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: options,
  },
  render: ({ ...args }) => (
    <div className={`flex flex-col gap-y-5 ${!args.title && "items-center"}`}>
      {args.title && (
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
      )}
      <RadioGroup {...args} />
    </div>
  ),
};

export const Default = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    name: "options",
  },
};
