import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import { clientSignOut } from "@/store/features/auth/authSlice";

export interface Agenda {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export interface Meeting {
  id: number;
  sprint?: {
    id: number;
    number: number;
  };
  title?: string;
  dateTime?: string;
  meetingLink?: string;
  notes?: string;
  agendas?: Agenda[];
}

// TODO: Notes/Sprint Planning/Retrospective&Review will be added later
export interface Sprint {
  id: number;
  number: number;
  startDate: string;
  endDate: string;
  teamMeetings: Meeting[];
}

interface SprintState {
  loading: boolean;
  sprints: Sprint[];
  currentSprintNumber: number;
}

const initialState: SprintState = {
  loading: false,
  sprints: [],
  currentSprintNumber: 1,
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
      const sprintId = action.payload.sprint?.id;

      const updatedSprints = state.sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          const updatedMeetings = sprint.teamMeetings.map((meeting) => {
            if (meeting.id === action.payload.id) {
              return action.payload;
            }
            return meeting;
          });
          return { ...sprint, teamMeetings: updatedMeetings };
        }
        return sprint;
      });
      state.sprints = updatedSprints;
      state.loading = true;
    },
    setCurrentSprintNumber: (
      state,
      action: PayloadAction<{ currentSprintNumber: number }>,
    ) => {
      state.currentSprintNumber = action.payload.currentSprintNumber;
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
  setCurrentSprintNumber,
  setSprintsLoadingTrue,
  setSprintsLoadingFalse,
} = sprintSlice.actions;

export default sprintSlice.reducer;
