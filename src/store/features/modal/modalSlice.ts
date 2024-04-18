import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "feature"
  | "error"
  | "gettingHelp"
  | "confirmation"
  | "viewResource"
  | "checkInSuccess";

interface ModalState {
  id?: number;
  type: ModalType | undefined;
  isOpen: boolean;
  isEditing?: boolean;
  content?: ContentPayload;
  payload?: Payload;
}

export interface BaseModalOpenActionPayload {
  id?: number;
  type: Exclude<ModalType, "error" | "confirmation">;
  content?: ContentPayload;
  isEditing?: boolean;
  payload?: Payload;
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
  payload: Required<Payload>;
}

export interface ContentPayload {
  title?: string;
  message?: string;
  confirmationText?: string;
  cancelText?: string;
}
export interface Payload {
  params?: {
    teamId?: number;
    id: number;
  };
  redirect?: Redirect | null;
  deleteFunction?: (args: any) => Promise<[any, any]>;
}
export interface Redirect {
  router?: () => void; // not sure about this.
  route?: string;
}
export type ModalOpenActionPayload =
  | BaseModalOpenActionPayload
  | ErrorModalOpenActionPayload
  | ConfirmationModalOpenActionPayload;

const initialState: ModalState = {
  id: 0,
  type: undefined,
  isOpen: false,
  isEditing: false,
  content: {},
  payload: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpenModal: (state, action: PayloadAction<ModalOpenActionPayload>) => {
      const { id, type, isEditing, content, payload } = action.payload;

      state.id = id;
      state.isOpen = true;
      state.type = type;
      state.isEditing = isEditing;
      state.content = content;
      state.payload = payload;
    },
    onCloseModal: () => initialState,
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
