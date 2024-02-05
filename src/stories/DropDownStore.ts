import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/features/user/userSlice";
import authReducer from "@/store/features/auth/authSlice";

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
  
export const mockStoreVoyage = configureStore({
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
export const mockStoreNoVoyage = configureStore({
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
