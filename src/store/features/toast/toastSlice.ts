import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastContext = "success" | "error";

interface ToastState {
  message: string;
  context: ToastContext;
  isToastOpen: boolean;
}

const initialState: ToastState = {
  message: "",
  context: "success",
  isToastOpen: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    onOpen: (
      state,
      action: PayloadAction<{ message: string; context: ToastContext }>,
    ) => {
      state.isToastOpen = true;
      state.context = action.payload.context;
      state.message = action.payload.message;
    },
    onClose: (state) => {
      state.isToastOpen = false;
      state.message = "";
      state.context = "success";
    },
  },
});

export const { onOpen, onClose } = toastSlice.actions;

export default toastSlice.reducer;
