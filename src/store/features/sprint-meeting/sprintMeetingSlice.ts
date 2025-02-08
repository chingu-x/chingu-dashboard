import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Meeting } from "@chingu-x/modules/sprint-meeting";

const initialState: Meeting[] = [];

export const sprintMeetingSlice = createSlice({
  name: "sprintMeeting",
  initialState,
  reducers: {
    fetchMeeting: (state, action: PayloadAction<Meeting>) => {
      const meeting = state.find((meeting) => meeting.id === action.payload.id);

      if (!meeting) {
        state.push(action.payload);
      }

      return;
    },
    editMeetingState: (state, action: PayloadAction<Meeting>) =>
      state.map((meeting) => {
        if (meeting.id === action.payload.id) {
          return { ...meeting, ...action.payload };
        } else {
          return meeting;
        }
      }),
  },
});

export const { fetchMeeting, editMeetingState } = sprintMeetingSlice.actions;

export default sprintMeetingSlice.reducer;
