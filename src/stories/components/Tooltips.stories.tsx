import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "@/components/Tooltip";

const meta = {
  title: "Components/Tooltip",
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
      options: ["top", "bottom", "left", "right"],
      control: { type: "radio" },
    },
    tooltipWidth: {
      description: "Width of tooltip",
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    children: {
      description: "What is the tooltip referring to",
      control: "text",
    },
    isDisplay: {
      description: "When to show the tooltip",
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
    isDisplay: true,
    hovered: false,
  },
};

export const Default = {
  ...BaseTemplate,
};
