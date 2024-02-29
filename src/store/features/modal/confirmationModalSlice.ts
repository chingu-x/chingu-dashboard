import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  onOpenModal,
  onCloseModal,
  ModalOpenActionPayload,
  ContentPayload,
} from "./modalSlice";

interface ModalState extends Required<ContentPayload> {}

const initialState: ModalState = {
  title: "",
  message: "",
  confirmationText: "",
  cancelText: "",
};

export const confirmationModalSlice = createSlice({
  name: "confirmationModal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      onOpenModal,
      (state, action: PayloadAction<ModalOpenActionPayload>) => {
        const { content, type } = action.payload;

        if (type === "confirmation") {
          return { ...state, ...content };
        }
      }
    );
    builder.addCase(onCloseModal, (_, action) => {
      const { type } = action.payload;
      if (type === "confirmation") {
        return initialState;
      }
    });
  },
});

export default confirmationModalSlice.reducer;
