import {
  type PayloadAction,
  createAction,
  createSlice,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import type { VoyageSprint } from "@chingu-x/modules/sprints";
import type { Meeting } from "@chingu-x/modules/sprint-meeting";
import { clientSignOut } from "@/store/features/auth/authSlice";

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
    fetchMeeting: (state, action: PayloadAction<Meeting>) => {
      const sprintId = action.payload.sprint?.id;

      const updatedSprints = state.sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return { ...sprint, teamMeetingsData: [action.payload] };
        }
        return sprint;
      });

      state.sprints = updatedSprints;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      void storage.removeItem("persist:root");
    });
    builder.addCase(clientSignOut, () => initialState);
  },
});

export interface SubmitWeeklyCheckinPayload {
  sprintId: number;
}

export const submitWeeklyCheckin = createAction<SubmitWeeklyCheckinPayload>(
  "sprint/submitWeeklyCheckin",
);

// export const submitVoyageProject = createAction<SubmitVoyageProjectPayload>(
//   "sprint/submitWeeklyCheckin",
// );

export const { fetchSprints, fetchMeeting } = sprintSlice.actions;

export default sprintSlice.reducer;
