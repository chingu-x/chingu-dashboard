import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import userReducer from "@/store/features/user/userSlice";
import authReducer from "@/store/features/auth/authSlice";
import DropDown from "@/components/navbar/DropDown";

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
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: true,
    },
    //@ts-expect-error - This is a mock object
    user: user1
  }
});
const mockStore2 = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: true,
    },
    //@ts-expect-error - This is a mock object
    user: user2
  }
});

const meta: Meta<typeof DropDown> = {
  title:"Components/DropDown",
  component: DropDown,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story/>
      </Provider>
    )
  ],
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
};
export default meta;
type Story = StoryObj<typeof meta>;


export const Closed: Story = {
  args:{
    openState: false
  }
};

export const OpenWithVoyage: Story = {
  args: {
    openState: true
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div style={{ height: 300 }}>
          <Story/>
        </div>
      </Provider>
    )
  ],
};

export const OpenNoVoyage: Story = {
  args:{
    openState:true
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore2}>
        <div style={{ height: 300 }}>
          <Story/>
        </div>
      </Provider>
    )
  ],
}; 
