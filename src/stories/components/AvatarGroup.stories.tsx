import type { Meta, StoryObj } from "@storybook/react";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";
import myAvatar from "@/public/img/avatar.png";

const placeholder =
  "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg";

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
      <Avatar key={1} image={myAvatar} width={24} height={24} />,
      <Avatar key={2} image={myAvatar} width={24} height={24} />,
      <Avatar key={3} image={myAvatar} width={24} height={24} />,
    ],
  },
};
export const SingleMember: Story = {
  args: {
    children: [<Avatar key={1} image={myAvatar} width={24} height={24} />],
  },
};
export const ManyMembers: Story = {
  args: {
    children: [
      <Avatar key={1} image={myAvatar} width={24} height={24} />,
      <Avatar key={2} image={myAvatar} width={24} height={24} />,
      <Avatar key={3} image={myAvatar} width={24} height={24} />,
      <Avatar key={4} image={myAvatar} width={24} height={24} />,
      <Avatar key={5} image={myAvatar} width={24} height={24} />,
      <Avatar key={6} image={myAvatar} width={24} height={24} />,
      <Avatar key={7} image={myAvatar} width={24} height={24} />,
    ],
  },
};
export const Placeholder: Story = {
  args: {
    children: [<Avatar key={1} image={placeholder} width={24} height={24} />],
  },
};
export const AlternativeImage: Story = {
  args: {
    children: [<Avatar key={1} image={""} width={24} height={24} />],
  },
};
export const MixedImages: Story = {
  args: {
    children: [
      <Avatar key={1} image={myAvatar} width={24} height={24} />,
      <Avatar key={2} image={placeholder} width={24} height={24} />,
      <Avatar key={3} image={""} width={24} height={24} />,
      <Avatar key={4} image={myAvatar} width={24} height={24} />,
    ],
  },
};
