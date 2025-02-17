import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type {
  AddAgendaTopicResponseDto,
  AddMeetingResponseDto,
  DeleteAgendaTopicResponseDto,
  EditAgendaTopicResponseDto,
  EditMeetingResponseDto,
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
    editMeetingState: (state, action: PayloadAction<EditMeetingResponseDto>) =>
      state.map((meeting) => {
        if (meeting.id === action.payload.id) {
          return { ...meeting, ...action.payload };
        } else {
          return meeting;
        }
      }),
    addAgendaState: (
      state,
      action: PayloadAction<AddAgendaTopicResponseDto>,
    ) => {
      const { teamMeetingId } = action.payload;

      const meeting = state.find((m) => m.id === teamMeetingId);

      meeting?.agendas?.push(action.payload);
    },
    editAgendaState: (
      state,
      action: PayloadAction<EditAgendaTopicResponseDto>,
    ) => {
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
    deleteAgendaState: (
      state,
      action: PayloadAction<DeleteAgendaTopicResponseDto>,
    ) => {
      const { id, teamMeetingId } = action.payload;
      const meeting = state.find((m) => m.id === teamMeetingId);

      meeting!.agendas = meeting?.agendas?.filter((agenda) => agenda.id !== id);
    },
  },
});

export const {
  fetchMeeting,
  addMeetingState,
  editMeetingState,
  addAgendaState,
  editAgendaState,
  deleteAgendaState,
} = sprintMeetingSlice.actions;

export default sprintMeetingSlice.reducer;
