import type { Meta, StoryObj } from "@storybook/react";
import Bell from "@/components/navbar/Bell";

const meta = {
  title: "Components/Bell",
  component: Bell,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    notificationCount: {
      description: "Number of notifications if any.",
      defaultValue: { summary: undefined },
      control: "select",
      options: [undefined, 4, 44, 444],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Bell>;

export default meta;
type Story = StoryObj<typeof Bell>;

const BaseTemplate: Story = {
  render: ({ ...args }) => <Bell {...args} />,
};

export const NoNotifications = {
  ...BaseTemplate,
  args: {
    notificationCount: undefined,
  },
};
export const FewNotifications = {
  ...BaseTemplate,
  args: {
    notificationCount: 4,
  },
};

export const ManyNotifications = {
  ...BaseTemplate,
  args: {
    notificationCount: 444,
  },
};

