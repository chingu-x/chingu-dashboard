import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clientSignOut } from "@/store/features/auth/authSlice";

export interface VoyageStatus {
  name: string;
}

interface Voyage {
  status: VoyageStatus;
}

interface VoyageTeam {
  name: string;
  voyage: Voyage;
}

export interface VoyageRole {
  name: string;
}

export interface VoyageTeamMember {
  id: number;
  voyageTeamId: number;
  voyageTeam: VoyageTeam;
  voyageRole: VoyageRole;
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
  avatar: string;
  voyageTeamMembers: VoyageTeamMember[];
  currentDate: Date | null;
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
  currentDate: null,
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
  extraReducers(builder) {
    builder.addCase(clientSignOut, () => initialState);
  },
});

export const { getUserState } = userSlice.actions;

export default userSlice.reducer;
