import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "example1"
  | "example2"
  | "feature"
  | "error"
  | "gettingHelp" 
  | "viewResource" 
  | "deleteResource";

interface ModalState {
  type: ModalType | undefined;
  isOpen: boolean;
  isEditing?: boolean;
}

interface ModalOpenActionPayload {
  type: ModalType;
  content: string;
  isEditing?: boolean;
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
      state.isOpen = true;
      state.type = action.payload.type;
      state.isEditing = action.payload.isEditing;
    },
    onCloseModal: (state, action: PayloadAction<ModalCloseActionPayload>) => {
      state.type = action.payload.type;
      state.isOpen = false;
      state.isEditing = false;
    },
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
