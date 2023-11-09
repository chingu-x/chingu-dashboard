import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DirectoryState {
  hoursPerSprint: number | null;
}

interface DirectoryActionPayload {
  hoursPerSprint: number;
}

const initialState: DirectoryState = {
  hoursPerSprint: null,
};

export const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    setHoursPerSprint: (
      state,
      action: PayloadAction<DirectoryActionPayload>,
    ) => {
      state.hoursPerSprint = action.payload.hoursPerSprint;
    },
  },
});

export const { setHoursPerSprint } = directorySlice.actions;

export default directorySlice.reducer;
