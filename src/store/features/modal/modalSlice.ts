import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "example1"
  | "example2"
  | "feature"
  | "error"
  | "gettingHelp"
  | "confirmation";

interface ModalState {
  type: ModalType | undefined;
  isOpen: boolean;
  isEditing?: boolean;
}

export interface ModalOpenActionPayload {
  type: ModalType;
  content: ContentPayload;
  isEditing?: boolean;
}

export interface ContentPayload {
  title?: string;
  message?: string;
  confirmationText?: string;
  cancelText?: string;
}

interface ModalCloseActionPayload {
  type?: ModalType;
}

const initialState: ModalState = {
  type: undefined,
  isOpen: false,
  isEditing: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpenModal: (state, action: PayloadAction<ModalOpenActionPayload>) => {
      const { type, isEditing } = action.payload;

      state.isOpen = true;
      state.type = type;
      state.isEditing = isEditing;
    },
    onCloseModal: (state, action: PayloadAction<ModalCloseActionPayload>) => {
      const { type } = action.payload;

      state.type = type;
      state.isOpen = false;
      state.isEditing = false;
    },
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
