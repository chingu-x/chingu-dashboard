import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import type { VoyageSprint } from "@chingu-x/modules/sprints";
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
    // fetchMeeting: (state, action: PayloadAction<Meeting>) => {
    //   const sprintId = action.payload.sprint?.id;

    //   const updatedSprints = state.voyage.sprints.map((sprint) => {
    //     if (sprint.id === sprintId) {
    //       return { ...sprint, teamMeetingsData: [action.payload] };
    //     }
    //     return sprint;
    //   });

    //   state.voyage.sprints = updatedSprints;
    //   state.loading = true;
    // },
    // setSprintsLoadingTrue: (state) => {
    //   state.loading = true;
    // },
    // setSprintsLoadingFalse: (state) => {
    //   state.loading = false;
    // },
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
  // fetchMeeting,
  // setSprintsLoadingTrue,
  // setSprintsLoadingFalse,
} = sprintSlice.actions;

export default sprintSlice.reducer;
