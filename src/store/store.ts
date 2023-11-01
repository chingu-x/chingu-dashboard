import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import modalReducer from "./features/modal/modalSlice";
import directoryReducer from "./features/directory/directorySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    directory: directoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
