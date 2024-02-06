import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type VoyageStatus = {
  name: string;
};

type Voyage = {
  status: VoyageStatus;
};

type VoyageTeam = {
  name: string;
  voyage: Voyage;
};

type VoyageRole = {
  name: string;
};

export type VoyageTeamMember = {
  id: number;
  voyageTeamId: number;
  voyageTeam: VoyageTeam;
  voyageRole: VoyageRole;
};

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
  avatar: string;
  voyageTeamMembers: VoyageTeamMember[];
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
  avatar: "",
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
