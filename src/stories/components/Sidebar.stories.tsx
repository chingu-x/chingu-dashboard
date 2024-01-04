import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "@/components/sidebar/Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Example/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <div style={{ height: 700 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
