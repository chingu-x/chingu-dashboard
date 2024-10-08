import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import { clientSignOut } from "@/store/features/auth/authSlice";

export interface Agenda {
  id: number;
  title: string;
  description: string;
  status: boolean;
  updatedAt: string;
}

export interface Section {
  form: {
    id: number;
  };
  responseGroup: {
    responses: {
      question: {
        id: number;
      };
      text: string;
    }[];
  };
}

export interface Meeting {
  id: number;
  sprint?: {
    id: number;
    number: number;
  };
  title?: string;
  description?: string;
  dateTime?: string;
  meetingLink?: string;
  notes?: string;
  agendas?: Agenda[];
  formResponseMeeting?: Section[];
}

export interface Sprint {
  id: number;
  number: number;
  startDate: string;
  endDate: string;
  teamMeetings: number[];
  teamMeetingsData?: Meeting[];
}

export interface Voyage {
  number: string;
  soloProjectDeadline: string;
  certificateIssueDate: string;
  showcasePublishDate: string;
  startDate: string;
  endDate: string;
  sprints: Sprint[];
}

interface SprintsState {
  voyage: Voyage;
  loading: boolean;
}

const initialState: SprintsState = {
  voyage: {
    number: "",
    soloProjectDeadline: "",
    certificateIssueDate: "",
    showcasePublishDate: "",
    startDate: "",
    endDate: "",
    sprints: [],
  },
  loading: false,
};

export const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {
    fetchSprints: (state, action: PayloadAction<Voyage>) => {
      state.voyage = action.payload;
      state.loading = true;
    },
    fetchMeeting: (state, action: PayloadAction<Meeting>) => {
      const sprintId = action.payload.sprint?.id;

      const updatedSprints = state.voyage.sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return { ...sprint, teamMeetingsData: [action.payload] };
        }
        return sprint;
      });

      state.voyage.sprints = updatedSprints;
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
