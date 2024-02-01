import { Provider } from "react-redux";
import type { Meta, StoryObj } from "@storybook/react";
import { store } from "@/store/store";
import DropDown from "@/components/navbar/DropDown";

const meta = {
  title: "Components/DropDown",
  component: DropDown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof DropDown>;

export const MenuOpenedNoVoyage: Story = {
  args: {
    openState: true,
  },
};
export const MenuOpenedWithVoyage: Story = {
  args: {
    openState: true,
    placeHolderVoyage:"v47-tier2-team-4"
  },
};
export const MenuClosed: Story = {
  args: {
    openState: false,
  },
};
