import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastType = "success" | "error";

interface ToastState {
  message: string;
  toastType: ToastType;
  isToastOpen: boolean;
}

const initialState: ToastState = {
  message: "",
  toastType: "success",
  isToastOpen: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    onOpen: (
      state,
      action: PayloadAction<{ message: string; toastType: ToastType }>
    ) => {
      state.isToastOpen = true;
      state.toastType = action.payload.toastType;
      state.message = action.payload.message;
    },
    onClose: (state) => {
      state.isToastOpen = false;
      state.message = "";
      state.toastType = "success";
    },
  },
});

export const { onOpen, onClose } = toastSlice.actions;

export default toastSlice.reducer;
