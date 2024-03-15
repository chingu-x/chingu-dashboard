import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { PURGE } from "redux-persist";
// import { clientSignOut } from "@/store/features/auth/authSlice";

export interface Agenda {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export interface Meeting {
  id: number;
  sprint: {
    id: number;
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
  meetingData: Meeting | Pick<Meeting, "id">;
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
      console.log("fetch sprints");
      console.log(action.payload);

      state.sprints = action.payload;
      state.loading = true;
    },
    fetchMeeting: (state, action: PayloadAction<Meeting>) => {
      console.log("fetch meeting");
      console.log(action.payload);

      const sprintId = action.payload.sprint.id;

      state.sprints[sprintId].meetingData = action.payload;
      state.loading = true;
    },
    setCurrentSprintNumber: (
      state,
      action: PayloadAction<{ currentSprintNumber: number }>
    ) => {
      console.log("set current sprint number");
      console.log(action.payload);
      state.currentSprintNumber = action.payload.currentSprintNumber;
    },
    setSprintsLoadingTrue: (state) => {
      state.loading = true;
    },
    setSprintsLoadingFalse: (state) => {
      state.loading = false;
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(PURGE, () => {
  //     void storage.removeItem("persist:root");
  //   });
  //   builder.addCase(clientSignOut, () => initialState);
  // },
});

export const {
  fetchSprints,
  fetchMeeting,
  setCurrentSprintNumber,
  setSprintsLoadingTrue,
  setSprintsLoadingFalse,
} = sprintSlice.actions;

export default sprintSlice.reducer;
