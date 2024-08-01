import type { Meta, StoryObj } from "@storybook/react";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";

const randomAvatarImage1 = "https://avatar.iran.liara.run/public/50";
const randomAvatarImage2 = "https://avatar.iran.liara.run/public/66";
const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "500px", height: "80px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const AFewMembers: Story = {
  args: {
    children: [
      <Avatar
        key={1}
        avatarUrl={randomAvatarImage1}
        firstName="John"
        lastName="Williams"
        size="xl"
      />,
      <Avatar
        key={2}
        avatarUrl={randomAvatarImage2}
        firstName="Kate"
        lastName="Brown"
        size="xl"
      />,
      <Avatar key={3} firstName="Peter" lastName="Clark" size="xl" />,
    ],
  },
};
export const SingleMember: Story = {
  args: {
    children: [<Avatar key={1} avatarUrl={randomAvatarImage1} size="xl" />],
  },
};
export const ManyMembers: Story = {
  args: {
    children: [
      <Avatar key={1} firstName="John" lastName="Williams" size="xl" />,
      <Avatar key={2} firstName="Sarah" lastName="Conor" size="xl" />,
      <Avatar
        key={3}
        avatarUrl={randomAvatarImage2}
        firstName="Kate"
        lastName="Brown"
        size="xl"
      />,
      <Avatar key={4} firstName="Harry" size="xl" />,
      <Avatar
        key={5}
        avatarUrl={randomAvatarImage1}
        firstName="John"
        lastName="Williams"
        size="xl"
      />,
      <Avatar key={6} firstName="Matt" lastName="Terner" size="xl" />,
      <Avatar key={7} firstName="Taylor" size="xl" />,
    ],
  },
};

export const DefaultImage: Story = {
  args: {
    children: [<Avatar key={1} size="xl" />],
  },
};
export const MixedImages: Story = {
  args: {
    children: [
      <Avatar key={1} firstName="John" lastName="Williams" size="xl" />,
      <Avatar key={2} size="xl" />,
      <Avatar key={3} avatarUrl={randomAvatarImage1} size="xl" />,
      <Avatar key={4} firstName="Ann" size="xl" />,
    ],
  },
};
