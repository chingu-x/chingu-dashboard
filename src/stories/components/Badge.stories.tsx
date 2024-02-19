import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/components/badge/Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "What background color to use?",
      defaultValue: { summary: "primary" },
      control: "select",
      options: ["primary", "error", "warning", "success"],
    },
    size: {
      description: "How large should the badge be?",
      defaultValue: { summary: "md" },
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    title: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  render: ({ ...args }) => <Badge {...args}>Badge</Badge>,
};

export const Default = {
  ...BaseTemplate,
};

export const Primary = {
  ...BaseTemplate,
  args: {
    variant: "primary",
  },
};

export const Error = {
  ...BaseTemplate,
  args: {
    variant: "error",
  },
};

export const Warning = {
  ...BaseTemplate,
  args: {
    variant: "warning",
  },
};

export const Success = {
  ...BaseTemplate,
  args: {
    variant: "success",
  },
};

export const AvatarBadge = {
  ...BaseTemplate,
  args: {
    variant: "primary",
    isAvatarBadge: true,
  },
};
