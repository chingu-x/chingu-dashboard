import { createSlice } from "@reduxjs/toolkit";
import { onOpenModal, onCloseModal } from "./modalSlice";

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
    builder.addCase(onOpenModal, (state, action) => {
      if (action.payload.type === "error") {
        state.error = action.payload.content!;
      }
    });
    builder.addCase(onCloseModal, (state, action) => {
      if (action.payload.type === "error") {
        state.error = "";
      }
    });
  },
});

export default errorModalSlice.reducer;
