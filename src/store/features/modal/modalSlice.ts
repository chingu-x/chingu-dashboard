import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2";

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<{ type: ModalType }>) => {
      state.isOpen = true;
      state.type = action.payload.type;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
