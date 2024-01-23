import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "@/components/Tooltip";

const meta = {
  title: "Components/Tooltip",
  //   position is not string type??
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      description: "Content inside the tooltip",
      control: "text",
    },
    supportText: {
      description: "Informational description of content",
      control: "text",
    },
    position: {
      description: "Where to place the tooltip",
      control: { type: "select", options: ["top", "bottom", "left", "right"] },
    },
    tooltipWidth: {
      description: "Width of tooltip",
      control: { type: "select", options: ["small", "medium", "large"] },
    },
    children: {
      description: "What is the tooltip referring to",
      control: "any",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  args: {
    content: "This is a tooltip",
    position: "right",
    tooltipWidth: "small",
    children: "Hover here",
  },
};

export const Default = {
  ...BaseTemplate,
};
