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
  isSelected: boolean;
  createdAt: Date;
  updatedAt: Date;
  contributedBy: {
    member: VoyageMember;
  };
  projectIdeaVotes: ProjectIdeaVotes[];
}

type IdeationId = Pick<IdeationData, "id">;

interface IdeationState {
  loading: boolean;
  projectIdeas: IdeationData[];
  projectIdea: IdeationData;
}

const initialState: IdeationState = {
  loading: false,
  projectIdeas: [],
  projectIdea: {
    id: 0,
    title: "",
    description: "",
    vision: "",
    isSelected: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    contributedBy: {
      member: {
        id: "0",
        avatar: "",
        firstName: "",
        lastName: "",
      },
    },
    projectIdeaVotes: [
      {
        id: 0,
        voyageTeamMemberId: 0,
        projectIdeaId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        votedBy: {
          member: {
            id: "",
            avatar: "",
            firstName: "",
            lastName: "",
          },
        },
      },
    ],
  },
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
    fetchIdeation: (state, action: PayloadAction<IdeationId>) => {
      const ideation = state.projectIdeas.find(
        (project) => project.id === action.payload.id,
      );

      state.projectIdea = ideation!;
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
  fetchIdeation,
  setProjectIdeasLoadingTrue,
  setProjectIdeasLoadingFalse,
} = ideationSlice.actions;

export default ideationSlice.reducer;
