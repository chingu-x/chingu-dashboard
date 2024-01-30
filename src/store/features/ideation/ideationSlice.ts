import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IdeationVoteResponse } from "@/app/(main)/my-voyage/ideation/ideationService";

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
  loading: boolean;
  projectIdeas: IdeationData[];
  errors: object | null;
}

const initialState: IdeationState = {
  loading: false,
  projectIdeas: [],
  errors: null,
};

export const ideationSlice = createSlice({
  name: "ideation",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    fetchIdeations: (state, action: PayloadAction<IdeationData[]>) => {
      state.projectIdeas = action.payload;
    },
    addVote: (state, action: PayloadAction<IdeationVoteResponse>) => {
      state.projectIdeas.map((projectIdea) => {
        if (projectIdea.id === action.payload.projectIdeaId) {
          projectIdea.projectIdeaVotes.push(action.payload as ProjectIdeaVotes);
        }
      });
    },
  },
});

export const { fetchIdeations, addVote, setLoading } = ideationSlice.actions;

export default ideationSlice.reducer;
