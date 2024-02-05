import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { FewNotifications } from "./Bell.stories";
import userReducer from "@/store/features/user/userSlice";
import avatarImage from "@/stories/assets/avatar.png";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";

//Perhaps move mockStore and mockState to separte file
const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  countryCode: "",
  discordId: "",
  githubId: "",
  twitterId: "",
  linkedinId: "",
  email: "",
  timezone: "",
  avatar:"",
};

const user1 = {
  initialState,
  voyageTeamMembers: [
    {
      id:1,
      voyageTeamId:1,
      voyageTeam: {
        name:"Team 43-tier3-V42",
        voyage:{
          status:{
            name:"Active"
          }
        }
      },
      voyageRole:{
        name:"Developer"
      },
    }
  ]
};
const user2 = {
  initialState,
  voyageTeamMembers: [
    {
      id:1,
      voyageTeamId:1,
      voyageTeam: {
        name:"Team 43-tier3-V42",
        voyage:{
          status:{
            name:"Closed"
          }
        }
      },
      voyageRole:{
        name:"Developer"
      },
    }
  ]
};

const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {    
    //@ts-expect-error - This is a mock object
    user: user1
  }
});
const mockStore2 = configureStore({
  reducer: {
    user: userReducer,
  },
  
  preloadedState: {
    //@ts-expect-error - This is a mock object
    user: user2
  }
});

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;


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
  },

};

export const MenuOpenNoVoyage: Story = {
  args:{
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...FewNotifications.args} />,
      <Avatar key="Avatar" image={avatarImage} width={24} height={24} />,
      <DropDown key="DropDown" openState={true} />,
    ]
  },
  decorators:[
    (Story) => (
      <Provider store={mockStore2}>
        <div style={{ height: 300 }}>
          <Story/>
        </div>
      </Provider>
    )
  ]
};

export const MenuOpenedOnVoyage: Story = {
  args:{
    children: [
      <ThemeProvider key="ThemeProvider">
        <ModeToggle />
      </ThemeProvider>,
      <Bell key="Bell" {...FewNotifications.args} />,
      <Avatar key="Avatar" image={avatarImage} width={24} height={24} />,
      <DropDown key="DropDown" openState={true} />,
    ]
  },
  decorators:[
    (Story) => (
      <Provider store={mockStore}>
        <div style={{ height: 300 }}>
          <Story/>
        </div>
      </Provider>
    )
  ]
};
