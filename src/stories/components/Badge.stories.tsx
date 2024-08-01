import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/components/badge/Badge";

const randomAvatarImage2 = "https://avatar.iran.liara.run/public/75";

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
    avatarUrl: {
      description: "Does it have an avatar?",
      control: { type: "boolean" },
      mapping: { false: undefined, true: randomAvatarImage2 },
    },
    firstName: {
      description: "Does it have an initial-based avatar?",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Kate" },
    },
    lastName: {
      description: "Does it have an initial-based avatar?",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Smith" },
    },
  },
  args: {
    title: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const TextBaseTemplate: Story = {
  render: ({ ...args }) => <Badge {...args}>Badge</Badge>,
};

const AvatarBaseTemplate: Story = {
  render: ({ ...args }) => (
    <Badge {...args} avatarUrl={randomAvatarImage2}>
      Badge
    </Badge>
  ),
};

export const Default = {
  ...TextBaseTemplate,
};

export const Primary = {
  ...TextBaseTemplate,
  args: {
    variant: "primary",
  },
};

export const Error = {
  ...TextBaseTemplate,
  args: {
    variant: "error",
  },
};

export const Warning = {
  ...TextBaseTemplate,
  args: {
    variant: "warning",
  },
};

export const Success = {
  ...TextBaseTemplate,
  args: {
    variant: "success",
  },
};

export const AvatarBadgePrimary = {
  ...AvatarBaseTemplate,
  args: {
    variant: "primary",
  },
};
