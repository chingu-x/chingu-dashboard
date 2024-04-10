import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "error"
  | "gettingHelp"
  | "confirmation"
  | "viewResource"
  | "checkInSuccess";

interface ModalState {
  id?: number;
  type: ModalType | undefined;
  isOpen: boolean;
  content?: ContentPayload;
}

export interface BaseModalOpenActionPayload {
  id?: number;
  type: Exclude<ModalType, "error" | "confirmation">;
  content?: ContentPayload;
}

export interface ErrorModalOpenActionPayload
  extends Omit<BaseModalOpenActionPayload, "type"> {
  type: "error";
  content: Required<Pick<ContentPayload, "message">>;
}

export interface ConfirmationModalOpenActionPayload
  extends Omit<BaseModalOpenActionPayload, "type"> {
  type: "confirmation";
  content: Required<ContentPayload>;
}

export interface ContentPayload {
  title?: string;
  message?: string;
  confirmationText?: string;
  cancelText?: string;
}

export type ModalOpenActionPayload =
  | BaseModalOpenActionPayload
  | ErrorModalOpenActionPayload
  | ConfirmationModalOpenActionPayload;

const initialState: ModalState = {
  id: 0,
  type: undefined,
  isOpen: false,
  content: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpenModal: (state, action: PayloadAction<ModalOpenActionPayload>) => {
      const { id, type, content } = action.payload;

      state.id = id;
      state.isOpen = true;
      state.type = type;
      state.content = content;
    },
    onCloseModal: () => initialState,
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
