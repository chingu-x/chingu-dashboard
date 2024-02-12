import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";

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
  editLoading: boolean;
  projectIdeas: IdeationData[];
  serverError: object;
}

const initialState: IdeationState = {
  loading: false,
  editLoading: false,
  projectIdeas: [],
  serverError: {},
};

export const ideationSlice = createSlice({
  name: "ideation",
  initialState,
  reducers: {
    fetchIdeations: (state, action: PayloadAction<IdeationData[]>) => {
      state.projectIdeas = action.payload;
      state.loading = true;
    },
    setLoadingTrue: (state) => {
      state.loading = true;
    },
    setLoadingFalse: (state) => {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      void storage.removeItem("persist:root");
    });
  },
});

export const { fetchIdeations, setLoadingTrue, setLoadingFalse } =
  ideationSlice.actions;

export default ideationSlice.reducer;
