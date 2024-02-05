import type { Meta, StoryObj } from "@storybook/react";
import Stepper, { SteppersItem } from "@/components/Stepper";

const steppers: SteppersItem[] = [
  {
    indicator: "1",
    name: "1",
    status: "completed",
    onClickEvent: () => console.log("1"),
  },
  {
    indicator: "2",
    name: "2",
    status: "completed",
    onClickEvent: () => console.log("2"),
  },
  {
    indicator: "3",
    name: "3",
    status: "current",
    onClickEvent: () => console.log("3"),
  },
  {
    indicator: "4",
    name: "4",
    status: "remaining",
    onClickEvent: () => console.log("4"),
  },
  {
    indicator: "5",
    name: "5",
    status: "remaining",
    onClickEvent: () => console.log("5"),
  },
  {
    indicator: "6",
    name: "6",
    status: "remaining",
    onClickEvent: () => console.log("6"),
  },
];

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    styleType: {
      description: "What style is the Stepper",
      options: ["chips", "indicators"],
      control: { type: "radio" },
    },
    stepperWidth: {
      description: "Set the width of stepper using tailwind utility class",
      control: "text",
    },
    steppers: {
      description: "Object of stepper items",
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  args: {
    steppers: steppers,
    stepperWidth: "w-[1000px]",
    styleType: "chips",
  },
};

export const Default = {
  ...BaseTemplate,
};
