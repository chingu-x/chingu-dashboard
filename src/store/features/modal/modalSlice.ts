import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2" | "editHours";

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  isEditing?: boolean;
}

interface ModalActionPayload {
  type: ModalType;
  isEditing?: boolean;
}

const initialState: ModalState = {
  type: null,
  isOpen: false,
  isEditing: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<ModalActionPayload>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.isEditing = action.payload.isEditing;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.type = null;
      state.isEditing = false;
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
