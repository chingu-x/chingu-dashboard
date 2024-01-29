import { Provider } from "react-redux";
import type { Meta, StoryObj } from "@storybook/react";
import { NoNotifications, FewNotifications } from "./Bell.stories";
import { MenuOpenedNoVoyage, MenuClosed, MenuOpenedWithVoyage } from "./DropDown.stories";
import { store } from "@/store/store";
import avatarImage from "@/stories/assets/avatar.png";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [(story) => <Provider store={store}>{story()} </Provider>],
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

/*
spreading BaseTemplate into stories causes Linting error "...expected non-promise value..."

const BaseTemplate: Story = {
  args:{
    children:[
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
    ]
  }
};
*/

export const LoggedOut: Story = {
  args:{
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Button key="Button" title="Login" type="button">
        Log In
      </Button>,
    ]
  }
};
export const NotificationsEmpty: Story = {
  args:{
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...NoNotifications.args}/>,
      <Avatar key="Avatar" image={avatarImage} width={24} height={24}/>,
      <DropDown  key="DropDown" {...MenuClosed.args}/>
    ]
  }
};
export const NotificationsUnread: Story = {
  args:{
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...FewNotifications.args}/>,
      <Avatar key="Avatar" image={avatarImage}  width={24} height={24}/>,
      <DropDown key="DropDown" {...MenuClosed.args}/>
    ]
  }
};
export const MenuOpenNoVoyage: Story = {
  args:{
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...FewNotifications.args}/>,
      <Avatar key="Avatar"  image={avatarImage} width={24} height={24}/>,
      <DropDown key="DropDown" {...MenuOpenedNoVoyage.args}/>
    ]
  }
};
export const MenuOpenWithVoyage: Story = {
  args:{
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...FewNotifications.args}/>,
      <Avatar key="Avatar" image={avatarImage} width={24} height={24}/>,
      <DropDown key="DropDown" {...MenuOpenedWithVoyage.args}/>
    ]
  }
};
