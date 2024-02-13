import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clientSignOut } from "@/store/features/auth/authSlice";

interface VoyageStatus {
  name: string;
}

interface Voyage {
  status: VoyageStatus;
}

interface VoyageTeam {
  name: string;
  voyage: Voyage;
}

interface VoyageRole {
  name: string;
}

interface VoyageTeamMember {
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
  extraReducers(builder) {
    builder.addCase(clientSignOut, () => initialState);
  },
});

export const { getUserState } = userSlice.actions;

export default userSlice.reducer;
