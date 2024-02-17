import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2" | "feature" | "error";

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  isEditing?: boolean;
}

interface ModalOpenActionPayload {
  type: ModalType;
  content: string;
  isEditing?: boolean;
}

interface ModalCloseActionPayload {
  type: ModalType;
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
    onOpenModal: (state, action: PayloadAction<ModalOpenActionPayload>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.isEditing = action.payload.isEditing;
    },
    onCloseModal: (state, action: PayloadAction<ModalCloseActionPayload>) => {
      state.isOpen = false;
      state.type = action.payload.type;
      state.isEditing = false;
    },
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
