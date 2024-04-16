import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "feature"
  | "error"
  | "gettingHelp"
  | "confirmation"
  | "resource"
  | "viewResource"
  | "checkInSuccess";

interface ModalState {
  id?: number;
  type: ModalType | undefined;
  isOpen: boolean;
  isEditing?: boolean;
  content?: ContentPayload;
}

export interface BaseModalOpenActionPayload {
  id?: number;
  type: Exclude<ModalType, "error" | "confirmation" | "resource">;
  content?: ContentPayload;
  isEditing?: boolean;
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

export interface DeleteResourcesModalOpenActionPayload
  extends Omit<BaseModalOpenActionPayload, "type"> {
  type: "resource";
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
  | ConfirmationModalOpenActionPayload
  | DeleteResourcesModalOpenActionPayload;

const initialState: ModalState = {
  id: 0,
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
      const { id, type, isEditing, content } = action.payload;

      state.id = id;
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
