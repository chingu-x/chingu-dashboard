import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type {
  UserVoyageStatus,
  UserVoyageRole,
} from "@chingu-x/modules/voyage-team";

type providerType = "discord";

interface VoyageTier {
  id: number;
  name: string;
}

export interface VoyageTeam {
  id: number;
  member: VoyageMember;
  hrPerSprint: number;
  voyageRole: UserVoyageRole;
}

interface VoyageMember {
  firstName: string;
  lastName: string;
  avatar: string;
  oAuthProfiles: {
    provider: {
      name: providerType;
    };
    providerUsername: string;
  }[];
  countryCode: string;
  timezone: string;
  currentTime: string;
}

export interface TeamDirectory {
  id: number;
  voyageId: number;
  name: string;
  status: UserVoyageStatus;
  repoUrl: string;
  repoUrlBE: string;
  deployedUrl: string;
  deployedUrlBE: string;
  tier: VoyageTier;
  endDate: string;
  voyageTeamMembers: VoyageTeam[];
}

const initialState: TeamDirectory = {
  id: 0,
  voyageId: 0,
  name: "",
  status: {
    name: "",
  },
  repoUrl: "",
  repoUrlBE: "",
  deployedUrl: "",
  deployedUrlBE: "",
  tier: {
    id: 0,
    name: "",
  },
  endDate: "",
  voyageTeamMembers: [
    {
      id: 0,
      member: {
        firstName: "",
        lastName: "",
        avatar: "",
        oAuthProfiles: [
          {
            provider: {
              name: "discord",
            },
            providerUsername: "",
          },
        ],
        countryCode: "",
        timezone: "",
        currentTime: "",
      },
      hrPerSprint: 0,
      voyageRole: {
        name: "",
      },
    },
  ],
};

export const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    fetchTeamDirectory: (state, action: PayloadAction<TeamDirectory>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { fetchTeamDirectory } = directorySlice.actions;

export default directorySlice.reducer;
