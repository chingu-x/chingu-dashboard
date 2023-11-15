import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import toastReducer from "./features/toast/toastSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
