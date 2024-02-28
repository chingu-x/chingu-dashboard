import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import { clientSignOut } from "@/store/features/auth/authSlice";

export interface VoyageMember {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
}

export interface ProjectIdeaVotes {
  id: number;
  voyageTeamMemberId: number;
  projectIdeaId: number;
  createdAt: Date;
  updatedAt: Date;
  votedBy: {
    member: VoyageMember;
  };
}

export interface IdeationData {
  id: number;
  title: string;
  description: string;
  vision: string;
  createdAt: Date;
  updatedAt: Date;
  contributedBy: {
    member: VoyageMember;
  };
  projectIdeaVotes: ProjectIdeaVotes[];
}

interface IdeationState {
  loading: boolean;
  projectIdeas: IdeationData[];
}

const initialState: IdeationState = {
  loading: false,
  projectIdeas: [],
};

export const ideationSlice = createSlice({
  name: "ideation",
  initialState,
  reducers: {
    fetchIdeations: (state, action: PayloadAction<IdeationData[]>) => {
      state.projectIdeas = action.payload;
      state.loading = true;
    },
    setProjectIdeasLoadingTrue: (state) => {
      state.loading = true;
    },
    setProjectIdeasLoadingFalse: (state) => {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      void storage.removeItem("persist:root");
    });
    builder.addCase(clientSignOut, () => initialState);
  },
});

export const {
  fetchIdeations,
  setProjectIdeasLoadingTrue,
  setProjectIdeasLoadingFalse,
} = ideationSlice.actions;

export default ideationSlice.reducer;
