import { configureStore } from "@reduxjs/toolkit";
import { type User } from "@chingu-x/modules/user";
import userReducer from "@/store/features/user/userSlice";
import authReducer from "@/store/features/auth/authSlice";

const user1: Partial<User> = {
  voyageTeamMembers: [
    {
      id: 1,
      voyageTeamId: 1,
      voyageTeam: {
        name: "Team 43-tier3-V42",
        voyage: {
          status: {
            name: "Active",
          },
        },
        projectSubmitted: false,
      },
      voyageRole: {
        name: "Developer",
      },
    },
  ],
};
const user2: Partial<User> = {
  voyageTeamMembers: [
    {
      id: 1,
      voyageTeamId: 1,
      voyageTeam: {
        name: "Team 43-tier3-V42",
        voyage: {
          status: {
            name: "Closed",
          },
        },
        projectSubmitted: false,
      },
      voyageRole: {
        name: "Developer",
      },
    },
  ],
};

export const mockStoreVoyage = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: true,
    },
    user: user1 as User,
  },
});
export const mockStoreNoVoyage = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: true,
    },
    user: user2 as User,
  },
});
