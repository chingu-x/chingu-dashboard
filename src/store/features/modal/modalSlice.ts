import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2" | "ideation";

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  mode: string;
}

interface ModalActionPayload {
  type: ModalType;
  mode: string;
}

const initialState: ModalState = {
  type: null,
  isOpen: false,
  mode: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<ModalActionPayload>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.mode = action.payload.mode;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
