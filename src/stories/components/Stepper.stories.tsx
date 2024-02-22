import type { Meta, StoryObj } from "@storybook/react";
import Stepper, { SteppersItem } from "@/components/Stepper";

const steppers: SteppersItem[] = [
  {
    name: "1",
    status: "completed",
    onClickEvent: () => console.log("1"),
  },
  {
    name: "2",
    status: "completed",
    onClickEvent: () => console.log("2"),
  },
  {
    name: "3",
    status: "current",
    onClickEvent: () => console.log("3"),
  },
  {
    name: "4",
    status: "remaining",
    onClickEvent: () => console.log("4"),
  },
  {
    name: "5",
    status: "remaining",
    onClickEvent: () => console.log("5"),
  },
  {
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
      options: ["chips", "icons"],
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
    styleType: "icons",
  },
};

export const Default = {
  ...BaseTemplate,
};
