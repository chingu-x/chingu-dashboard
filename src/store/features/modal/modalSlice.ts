import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "example1" | "example2" | "TechStackModal";

interface TechStackModalData {
  techName: string;
}

interface ModalState {
  type: ModalType | null;
  data: TechStackModalData | null;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  data: null,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (
      state,
      action: PayloadAction<{ type: ModalType; data?: TechStackModalData }>,
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;

      if (action.payload.type === "TechStackModal" && action.payload.data) {
        state.data = action.payload.data;
      } else {
        state.data = null;
      }
    },
    onClose: (state) => {
      state.isOpen = false;
      state.type = null;
      state.data = null;
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
