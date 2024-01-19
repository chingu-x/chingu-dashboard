import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";

const meta = {
  title: "Example/Tooltip",
  component: Tooltip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes

  argTypes: {
    position: {
      control: { type: "select", options: ["top", "bottom", "left", "right"] },
    },
    content: {
      control: "content",
    },
  },
} satisfies Meta<typeof Tooltip>;
