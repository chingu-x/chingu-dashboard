import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface VoyageMember {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
}

interface ProjectIdeaVotes {
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
  projectIdeaVotes: ProjectIdeaVotes;
}

interface IdeationState {
  data: IdeationData[];
}

const initialState: IdeationState = {
  data: [],
};

export const ideationSlice = createSlice({
  name: "ideation",
  initialState,
  reducers: {
    fetchIdeations: (state, action: PayloadAction<IdeationData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchIdeations } = ideationSlice.actions;

export default ideationSlice.reducer;
