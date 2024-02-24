import { Provider } from "react-redux";
import type { Meta, StoryObj } from "@storybook/react";
import { FewNotifications } from "./Bell.stories";
import avatarImage from "@/stories/assets/avatar.png";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import Button from "@/components/Button";
import Avatar from "@/components/avatar/Avatar";
import { mockStoreVoyage, mockStoreNoVoyage } from "@/stories/DropDownStore";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

export const LoggedOut: Story = {
  args: {
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Button key="Button" title="Login" type="button">
        Log In
      </Button>,
    ],
  },
};

export const MenuOpenNoVoyage: Story = {
  args: {
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...FewNotifications.args} />,
      <Avatar key="Avatar" image={avatarImage} width={24} height={24} />,
      <DropDown key="DropDown" openState={true} />,
    ],
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

export const MenuOpenedOnVoyage: Story = {
  args: {
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...FewNotifications.args} />,
      <Avatar key="Avatar" image={avatarImage} width={24} height={24} />,
      <DropDown key="DropDown" openState={true} />,
    ],
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
