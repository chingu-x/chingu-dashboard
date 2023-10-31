import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  contributedBy: {
    member: VoyageMember;
  };
  projectIdeaVotes: ProjectIdeaVotes[];
}

interface IdeationState {
  projectIdeas: IdeationData[];
}

const initialState: IdeationState = {
  projectIdeas: [],
};

export const ideationSlice = createSlice({
  name: "ideation",
  initialState,
  reducers: {
    fetchIdeations: (state, action: PayloadAction<IdeationData[]>) => {
      state.projectIdeas = action.payload;
    },
    addVote: (state, action: PayloadAction<ProjectIdeaVotes>) => {
      state.projectIdeas.map((projectIdea) => {
        if (projectIdea.id === action.payload.projectIdeaId) {
          projectIdea.projectIdeaVotes.push(action.payload);
        }
      });
    },
  },
});

export const { fetchIdeations, addVote } = ideationSlice.actions;

export default ideationSlice.reducer;
