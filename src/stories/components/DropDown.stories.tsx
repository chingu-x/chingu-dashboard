import { Provider } from "react-redux";
import type { Meta, StoryObj } from "@storybook/react";
import DropDown from "@/components/navbar/DropDown";
import { mockStoreVoyage, mockStoreNoVoyage } from "@/stories/DropDownStore";

const meta: Meta<typeof DropDown> = {
  title: "Components/DropDown",
  component: DropDown,
  decorators: [
    (Story) => (
      <Provider store={mockStoreVoyage}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    openState: false,
  },
};

export const OpenWithVoyage: Story = {
  args: {
    openState: true,
  },
  decorators: [
    (Story) => (
      <Provider store={mockStoreVoyage}>
        <div style={{ height: 300 }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const OpenNoVoyage: Story = {
  args: {
    openState: true,
  },
  decorators: [
    (Story) => (
      <Provider store={mockStoreNoVoyage}>
        <div style={{ height: 300 }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};
