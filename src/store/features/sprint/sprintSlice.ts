import {
  type PayloadAction,
  createAction,
  createSlice,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import type { VoyageSprint } from "@chingu-x/modules/sprints";
import type { AddMeetingResponseDto } from "@chingu-x/modules/sprint-meeting";
import { clientSignOut } from "@/store/features/auth/authSlice";
import { addMeetingState } from "@/store/features/sprint-meeting/sprintMeetingSlice";

const initialState: VoyageSprint = {
  id: 0,
  number: "",
  soloProjectDeadline: "",
  certificateIssueDate: "",
  showcasePublishDate: "",
  startDate: "",
  endDate: "",
  sprints: [],
};

export const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {
    fetchSprints: (state, action: PayloadAction<VoyageSprint>) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      void storage.removeItem("persist:root");
    });
    builder.addCase(clientSignOut, () => initialState);
    builder.addCase(
      addMeetingState,
      (state, action: PayloadAction<AddMeetingResponseDto>) => {
        const sprintIndex = state.sprints.findIndex(
          (sprint) => sprint.id === action.payload.sprintId,
        );

        state.sprints[sprintIndex] = {
          ...state.sprints[sprintIndex],
          teamMeetings: [action.payload.id],
        };
      },
    );
  },
});

export interface SubmitWeeklyCheckinPayload {
  sprintId: number;
}

export interface SubmitVoyageProjectPayload {
  teamId: number;
}

export const submitWeeklyCheckin = createAction<SubmitWeeklyCheckinPayload>(
  "sprint/submitWeeklyCheckin",
);

export const submitVoyageProject = createAction<SubmitVoyageProjectPayload>(
  "sprint/submitVoyageProject",
);

export const { fetchSprints } = sprintSlice.actions;

export default sprintSlice.reducer;
