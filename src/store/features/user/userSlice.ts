import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clientSignOut } from "@/store/features/auth/authSlice";

// TODO: All of these interfaces need to be refactored to extend the response dto types

type providerType = "discord";

export interface VoyageStatus {
  name: string;
}

interface Voyage {
  status: VoyageStatus;
}

interface VoyageTeam {
  name: string;
  voyage: Voyage;
  projectSubmitted: boolean;
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
  oAuthProfiles: {
    provider: {
      name: providerType;
    };
    providerUsername: string;
  }[];
  email: string;
  timezone: string;
  avatar: string;
  voyageTeamMembers: VoyageTeamMember[];
  sprintCheckIn: number[];
  currentDateInUserTimezone: Date | null;
}

const initialState: User = {
  id: "",
  firstName: "",
  lastName: "",
  countryCode: "",
  oAuthProfiles: [
    {
      provider: {
        name: "discord",
      },
      providerUsername: "",
    },
  ],
  email: "",
  timezone: "",
  avatar: "",
  voyageTeamMembers: [],
  sprintCheckIn: [],
  currentDateInUserTimezone: null,
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
