import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VoyageRole, VoyageStatus } from "@/store/features/user/userSlice";

interface VoyageTier {
  id: number;
  name: string;
}

export interface VoyageTeam {
  id: number;
  member: VoyageMember;
  hrPerSprint: number;
  voyageRole: VoyageRole;
}

interface VoyageMember {
  firstName: string;
  lastName: string;
  avatar: string;
  githubId: string | null;
  discordId: string | null;
  twitterId: string | null;
  linkedinId: string | null;
  countryCode: string;
  timezone: string;
  currentTime: string;
}

export interface TeamDirectory {
  id: number;
  voyageId: number;
  name: string;
  status: VoyageStatus;
  repoUrl: string;
  repoUrlBE: string;
  deployedUrl: string;
  deployedUrlBE: string;
  tier: VoyageTier;
  endDate: string;
  voyageTeamMembers: VoyageTeam[];
}

interface DirectoryState {
  loading: boolean;
  teamDirectory: TeamDirectory;
}

const initialState: DirectoryState = {
  loading: false,
  teamDirectory: {
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
          githubId: null,
          discordId: null,
          twitterId: null,
          linkedinId: null,
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
  },
};

export const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    fetchTeamDirectory: (state, action: PayloadAction<TeamDirectory>) => {
      state.teamDirectory = action.payload;
    },
  },
});

export const { fetchTeamDirectory } = directorySlice.actions;

export default directorySlice.reducer;
