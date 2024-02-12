import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2" | "feature" | "error";

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
}

interface ModalActionPayload {
  type: ModalType;
}

const initialState: ModalState = {
  type: null,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<ModalActionPayload>) => {
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
