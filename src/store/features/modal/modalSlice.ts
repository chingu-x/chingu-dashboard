import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2";

interface ModalData {
  data?: {};
}

interface ModalState {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  data: {},
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<{ type: ModalType; data?: any }>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data || null;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
