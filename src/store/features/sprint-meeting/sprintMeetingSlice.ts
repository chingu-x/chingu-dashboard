import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type {
  AddMeetingResponseDto,
  Agenda,
  Meeting,
} from "@chingu-x/modules/sprint-meeting";

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
    addMeetingState: (state, action: PayloadAction<AddMeetingResponseDto>) => {
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
    addAgendaState: (state, action: PayloadAction<Agenda>) => {
      const { teamMeetingId } = action.payload;

      const meeting = state.find((m) => m.id === teamMeetingId);

      meeting?.agendas?.push(action.payload);
    },
    editAgendaState: (state, action: PayloadAction<Agenda>) => {
      const { id, teamMeetingId } = action.payload;
      const meeting = state.find((m) => m.id === teamMeetingId);

      const agendaIndex = meeting?.agendas?.findIndex(
        (agenda) => agenda.id === id && agenda.teamMeetingId === teamMeetingId,
      );

      if (agendaIndex !== -1) {
        meeting!.agendas![agendaIndex!] = {
          ...action.payload,
        };
      }
    },
  },
});

export const {
  fetchMeeting,
  addMeetingState,
  editMeetingState,
  addAgendaState,
  editAgendaState,
} = sprintMeetingSlice.actions;

export default sprintMeetingSlice.reducer;
