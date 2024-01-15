import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface VoyageTeamMembers {
  id: number;
  voyageTeamId: number;
  voyageTeam: {
    name: string;
  };
  voyageRole: {
    name: string;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  discordId: string;
  githubId: string;
  twitterId: string;
  linkedinId: string;
  email: string;
  timezone: string;
  voyageTeamMembers: VoyageTeamMembers[];
}

const initialState: User = {
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
  voyageTeamMembers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserState: (state, action: PayloadAction<User>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { getUserState } = userSlice.actions;

export default userSlice.reducer;
