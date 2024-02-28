import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  onOpenModal,
  onCloseModal,
  ModalOpenActionPayload,
} from "./modalSlice";

interface ModalState {
  error: string;
}

const initialState: ModalState = {
  error: "",
};

export const errorModalSlice = createSlice({
  name: "errorModal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      onOpenModal,
      (state, action: PayloadAction<ModalOpenActionPayload>) => {
        if (action.payload.type === "error" && action.payload.content) {
          state.error = action.payload.content.message!;
        }
      }
    );
    builder.addCase(onCloseModal, (state, action) => {
      if (action.payload.type === "error") {
        state.error = "";
      }
    });
  },
});

export default errorModalSlice.reducer;
