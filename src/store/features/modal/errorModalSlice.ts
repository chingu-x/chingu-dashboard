import { createSlice } from "@reduxjs/toolkit";
import { onClose, onOpen } from "./modalSlice";

interface ModalState {
  error: string;
}

const initialState: ModalState = {
  error: "",
};

export const errorModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onOpen, (state, action) => {
      if (action.payload.type === "error") {
        state.error = action.payload.content!;
      }
    });
    builder.addCase(onClose, (state, action) => {
      if (action.payload.type === "error") {
        state.error = "";
      }
    });
  },
});

export default errorModalSlice.reducer;
