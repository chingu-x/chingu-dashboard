import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2" | "editHours";

interface ModalData {
  teamId?: number;
  userId?: string;
}

interface ModalState {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  data: {},
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (
      state,
      action: PayloadAction<{ type: ModalType; data?: ModalData }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;

      if (action.payload.data) state.data = action.payload.data;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.type = null;
      state.data = {};
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
