import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import {
  addIdeation,
  type AddIdeationProps,
  addIdeationVote,
  editIdeation,
  type EditIdeationProps,
  type IdeationVoteProps,
  removeIdeationVote,
  DeleteIdeationProps,
  deleteIdeation,
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
  editLoading: boolean;
  projectIdeas: IdeationData[];
  serverError: object;
}

interface RemoveVoteActionPayload extends IdeationVoteProps {
  id: string;
}

const initialState: IdeationState = {
  loading: false,
  editLoading: false,
  projectIdeas: [],
  serverError: {},
};

export const addNewIdeation = createAsyncThunk(
  "ideation/addIdeation",
  async (payload: AddIdeationProps) => await addIdeation(payload)
);

export const editIdeationThunk = createAsyncThunk(
  "ideation/editIdeation",
  async (payload: EditIdeationProps) => {
    await editIdeation(payload);
    try {
      const response = await editIdeation(payload);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return "An unknown error occurred";
      }
    }
  }
);

export const deleteIdeationThunk = createAsyncThunk(
  "ideation/deleteIdeation",
  async (payload: DeleteIdeationProps) => await deleteIdeation(payload)
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
    builder.addCase(addNewIdeation.pending, (state) => {
      state.loading = true;
      state.serverError = {};
    });
    builder.addCase(addNewIdeation.fulfilled, (state, action) => {
      state.projectIdeas.push(action.payload as unknown as IdeationData);
      state.serverError = {};
    });
    builder.addCase(editIdeationThunk.pending, (state) => {
      state.loading = true;
      state.editLoading = true;
      state.serverError = {};
    });
    builder.addCase(editIdeationThunk.fulfilled, (state) => {
      state.editLoading = false;
      state.serverError = {};
    });
    builder.addCase(editIdeationThunk.rejected, (state, action) => {
      state.serverError = action.error;
    });
    builder.addCase(deleteIdeationThunk.pending, (state) => {
      state.loading = true;
      state.serverError = {};
    });
    builder.addCase(deleteIdeationThunk.fulfilled, (state) => {
      state.serverError = {};
    });
    builder.addCase(addVote.pending, (state) => {
      state.loading = true;
      state.serverError = {};
    });
    builder.addCase(addVote.fulfilled, (state, action) => {
      state.loading = true;
      state.projectIdeas.map((projectIdea) => {
        if (projectIdea.id === action.payload.projectIdeaId) {
          projectIdea.projectIdeaVotes.push(action.payload as ProjectIdeaVotes);
        }
      });
      state.serverError = {};
    });
    // builder.addCase(addVote.rejected, (state, action: PayloadAction<{}>) => {
    //   state.loading = false;
    //   state.serverError = action.error;
    // });
    builder.addCase(removeVote.pending, (state) => {
      state.loading = true;
      state.serverError = {};
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
      state.serverError = {};
    });
  },
});

export const { fetchIdeations, setLoadingFalse } = ideationSlice.actions;

export default ideationSlice.reducer;
