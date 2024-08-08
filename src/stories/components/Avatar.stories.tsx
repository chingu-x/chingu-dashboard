import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "@/components/avatar/Avatar";

const randomAvatarImage2 = "https://avatar.iran.liara.run/public/75";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "How large should the avatar be?",
      defaultValue: { summary: "md" },
      control: "select",
      options: ["sm", "md", "lg", "xl", "xxl"],
    },
    avatarUrl: {
      description: "Does it have an avatar?",
      control: { type: "boolean" },
      mapping: { false: undefined, true: randomAvatarImage2 },
    },
    firstName: {
      description: "Does it have an initial-based avatar (first name)?",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Kate" },
    },
    lastName: {
      description: "Does it have an initial-based avatar (last name)?",
      control: { type: "boolean" },
      mapping: { false: undefined, true: "Smith" },
    },
  },
  args: {
    title: "Badge",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const InitialBaseTemplate: Story = {
  render: ({ ...args }) => (
    <Avatar firstName="Kate" lastName="Smith" {...args} />
  ),
};

const AvatarBaseTemplate: Story = {
  render: ({ ...args }) => (
    <Avatar
      firstName="Kate"
      lastName="Smith"
      avatarUrl={randomAvatarImage2}
      {...args}
    />
  ),
};

export const InitialBasedDefault = {
  ...InitialBaseTemplate,
};

export const InitialBasedSmall = {
  ...InitialBaseTemplate,
  args: {
    size: "sm",
  },
};

export const InitialBasedXXL = {
  ...InitialBaseTemplate,
  args: {
    size: "xxl",
  },
};

export const AvatarDefault = {
  ...AvatarBaseTemplate,
};

export const AvatarSmall = {
  ...AvatarBaseTemplate,
  args: {
    size: "sm",
  },
};

export const AvatarXXL = {
  ...AvatarBaseTemplate,
  args: {
    size: "xxl",
  },
};
