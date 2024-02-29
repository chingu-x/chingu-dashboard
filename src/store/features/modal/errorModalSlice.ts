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
        const { type, content } = action.payload;

        if (type === "error") {
          state.error = content.message!;
        }
      }
    );
    builder.addCase(onCloseModal, (state, action) => {
      const { type } = action.payload;

      if (type === "error") {
        state.error = "";
      }
    });
  },
});

export default errorModalSlice.reducer;
