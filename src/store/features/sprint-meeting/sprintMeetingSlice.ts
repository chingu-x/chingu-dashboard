import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Meeting } from "@chingu-x/modules/sprint-meeting";

const initialState: Meeting[] = [
  {
    id: 0,
    sprint: undefined,
    title: "",
    description: "",
    dateTime: "",
    meetingLink: "",
    notes: "",
    agendas: [],
    formResponseMeeting: [],
  },
];

export const sprintMeetingSlice = createSlice({
  name: "sprintMeeting",
  initialState,
  reducers: {
    fetchMeeting: (state, action: PayloadAction<Meeting>) => {
      state.push(action.payload);
    },
    editMeeting: (state, action: PayloadAction<Meeting>) =>
      state.map((meeting) => {
        if (meeting.id === action.payload.id) {
          return { ...meeting, ...action.payload };
        } else {
          return meeting;
        }
      }),
  },
});

export const { fetchMeeting } = sprintMeetingSlice.actions;

export default sprintMeetingSlice.reducer;
