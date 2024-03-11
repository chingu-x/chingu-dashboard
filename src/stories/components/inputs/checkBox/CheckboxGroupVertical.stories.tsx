import type { Meta, StoryObj } from "@storybook/react";

import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";

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
  title: "Components/Inputs/Checkbox Groups/Vertical Checkbox Group",
  component: CheckboxGroupVertical,
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
} satisfies Meta<typeof CheckboxGroupVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <div className="flex justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    options: options,
  },
  render: ({ ...args }) => <CheckboxGroupVertical {...args} />,
};

export const Default = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    name: "options",
  },
};
