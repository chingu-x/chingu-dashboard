import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addIdeationVote,
  IdeationVoteProps,
  removeIdeationVote,
} from "@/app/(main)/my-voyage/ideation/ideationService";

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
  errors: object;
}

const initialState: IdeationState = {
  loading: false,
  projectIdeas: [],
  errors: {},
};

export const addVote = createAsyncThunk(
  "ideation/addVote",
  async (payload: IdeationVoteProps) => {
    await addIdeationVote(payload);
  }
);

export const removeVote = createAsyncThunk(
  "ideation/removeVote",
  async (payload: IdeationVoteProps) => {
    await removeIdeationVote(payload);
  }
);

export const ideationSlice = createSlice({
  name: "ideation",
  initialState,
  reducers: {
    fetchIdeations: (state, action: PayloadAction<IdeationData[]>) => {
      state.projectIdeas = action.payload;
      state.loading = false;
    },
    // setLoading: (state) => {
    //   state.loading = true;
    // },
    // addVote: (state, action: PayloadAction<IdeationVoteResponse>) => {
    //   state.projectIdeas.map((projectIdea) => {
    //     if (projectIdea.id === action.payload.projectIdeaId) {
    //       projectIdea.projectIdeaVotes.push(action.payload as ProjectIdeaVotes);
    //     }
    //   });
    // },
    // removeVote: (state, action) => {},
  },
  extraReducers(builder) {
    builder.addCase(addVote.pending, (state) => {
      state.loading = true;
      state.errors = {};
    });
    builder.addCase(addVote.fulfilled, (state) => {
      state.loading = true;
      state.errors = {};
    });
    // builder.addCase(addVote.rejected, (state, action: PayloadAction<{}>) => {
    //   state.loading = false;
    //   state.errors = action.error;
    // });
    builder.addCase(removeVote.pending, (state) => {
      state.loading = true;
      state.errors = {};
    });
    builder.addCase(removeVote.fulfilled, (state) => {
      state.loading = true;
      state.errors = {};
    });
  },
});

export const { fetchIdeations } = ideationSlice.actions;

export default ideationSlice.reducer;
