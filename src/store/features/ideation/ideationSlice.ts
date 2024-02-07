import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addIdeation,
  AddIdeationProps,
  addIdeationVote,
  IdeationVoteProps,
  removeIdeationVote,
} from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";

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

interface RemoveVoteActionPayload extends IdeationVoteProps {
  id: string;
}

const initialState: IdeationState = {
  loading: false,
  projectIdeas: [],
  errors: {},
};

export const addNewIdeation = createAsyncThunk(
  "ideation/addIdeation",
  async (payload: AddIdeationProps) => await addIdeation(payload)
);

export const addVote = createAsyncThunk(
  "ideation/addVote",
  async (payload: IdeationVoteProps) => await addIdeationVote(payload)
);

export const removeVote = createAsyncThunk(
  "ideation/removeVote",
  async (payload: RemoveVoteActionPayload) => {
    const { teamId, ideationId, id } = payload;
    const res = await removeIdeationVote({ teamId, ideationId });

    const userId = id;

    return { ...res, userId };
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
  },
  extraReducers(builder) {
    builder.addCase(addNewIdeation.pending, (state) => {
      state.loading = true;
      state.errors = {};
    });
    builder.addCase(addNewIdeation.fulfilled, (state, action) => {
      state.projectIdeas.push(action.payload as unknown as IdeationData);
      state.errors = {};
    });
    builder.addCase(addVote.pending, (state) => {
      state.loading = true;
      state.errors = {};
    });
    builder.addCase(addVote.fulfilled, (state, action) => {
      state.loading = true;
      state.projectIdeas.map((projectIdea) => {
        if (projectIdea.id === action.payload.projectIdeaId) {
          projectIdea.projectIdeaVotes.push(action.payload as ProjectIdeaVotes);
        }
      });
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
    builder.addCase(removeVote.fulfilled, (state, action) => {
      state.loading = true;
      state.projectIdeas.map((projectIdea) => {
        if (projectIdea.id === action.payload.projectIdeaId) {
          const updatedProjectIdeaVotes = projectIdea.projectIdeaVotes.filter(
            (projectIdea) =>
              projectIdea.votedBy.member.id !== action.payload.userId
          );

          projectIdea.projectIdeaVotes = updatedProjectIdeaVotes;
        }
      });
      state.errors = {};
    });
  },
});

export const { fetchIdeations } = ideationSlice.actions;

export default ideationSlice.reducer;
