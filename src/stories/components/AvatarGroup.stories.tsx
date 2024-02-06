import type { Meta, StoryObj } from "@storybook/react";
import AvatarGroup from "@/app/(main)/my-voyage/tech-stack/components/AvatarGroup";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    data:{
      description:"Number of users grouped together (after voting etc...)",
      defaultValue: { summary: ["x"] },
      control: "select",
      options: [
        ["user"], 
        ["user","user"], 
        ["user","user","user","user","user","user"], 
        ["user","user","user","user","user","user","user","user","user","user"] 
      ]
    },
  },
  decorators:[
    (Story) => (
      <div style={{ width: "500px", height:"80px" }}>
        <Story/>
      </div>
    )
  ],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const SingleMember: Story = {
  args:{
    data:["x"]
  }
};
export const AFewMembers: Story = {
  args:{
    data:["x", "x", "x", "x"]
  }
};
export const ManyMembers: Story = {
  args:{
    data: ["x","x","x","x","x","x","x","x","x","x"]
  }
};
