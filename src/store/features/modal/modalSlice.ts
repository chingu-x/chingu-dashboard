import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "feature"
  | "error"
  | "gettingHelp"
  | "confirmation"
  | "viewResource"
  | "checkInSuccess";

interface ModalState {
  type: ModalType | undefined;
  isOpen: boolean;
  isEditing?: boolean;
  content: ContentPayload;
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

// interface ModalCloseActionPayload {
//   type?: ModalType;
// }

const initialState: ModalState = {
  type: undefined,
  isOpen: false,
  isEditing: false,
  content: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpenModal: (state, action: PayloadAction<ModalOpenActionPayload>) => {
      const { type, isEditing, content } = action.payload;

      state.isOpen = true;
      state.type = type;
      state.isEditing = isEditing;
      state.content = content;
    },
    onCloseModal: () => initialState,
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
