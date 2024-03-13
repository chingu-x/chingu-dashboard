import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import { clientSignOut } from "@/store/features/auth/authSlice";

export interface Agenda {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

export interface Meeting {
  id: number;
  sprint: {
    number: number;
  };
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
  agendas: Agenda[];
}

// TODO: Notes/Sprint Planning/Retrospective&Review will be added later
export interface Sprint {
  id: number;
  number: number;
  startDate: string;
  endDate: string;
  meetingData: Meeting;
}

interface SprintState {
  loading: boolean;
  sprints: Sprint[];
}

const initialState: SprintState = {
  loading: false,
  sprints: [],
};

export const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {
    fetchSprints: (state, action: PayloadAction<Sprint[]>) => {
      state.sprints = action.payload;
      state.loading = true;
    },
    fetchMeeting: (state, action: PayloadAction<Meeting>) => {
      const sprintNumber = action.payload.sprint.number;
      state.sprints[sprintNumber - 1].meetingData = action.payload;
      state.loading = true;
    },
    setSprintsLoadingTrue: (state) => {
      state.loading = true;
    },
    setSprintsLoadingFalse: (state) => {
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
  fetchSprints,
  fetchMeeting,
  setSprintsLoadingTrue,
  setSprintsLoadingFalse,
} = sprintSlice.actions;

export default sprintSlice.reducer;
