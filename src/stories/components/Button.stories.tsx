import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ButtonCVA";

const meta = {
  title: "Components/Text Buttons",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "What background color to use?",
      defaultValue: { summary: "primary" },
      control: "select",
      options: ["primary", "secondary", "accent", "neutral", "error", "link"],
    },
    size: {
      description: "How large should the button be?",
      defaultValue: { summary: "md" },
      control: "select",
      options: ["sm", "md", "lg", "xl", "xxl"],
    },
    outline: {
      description: "Do you want it to be an outline button?",
      defaultValue: { summary: false },
      control: "boolean",
    },
    disabled: {
      description: "Is it disabled?",
      defaultValue: { summary: false },
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  render: ({ ...args }) => (
    <Button {...args}>
      <EnvelopeIcon className="h-[18px] w-[18px]" />
      Button
      <ArrowRightIcon className="h-[18px] w-[18px]" />
    </Button>
  ),
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

export const Secondary = {
  ...BaseTemplate,
  args: {
    variant: "secondary",
  },
};

export const Accent = {
  ...BaseTemplate,
  args: {
    variant: "accent",
  },
};

export const Neutral = {
  ...BaseTemplate,
  args: {
    variant: "neutral",
  },
};

export const Error = {
  ...BaseTemplate,
  args: {
    variant: "error",
  },
};

export const Link = {
  ...BaseTemplate,
  args: {
    variant: "link",
  },
};
