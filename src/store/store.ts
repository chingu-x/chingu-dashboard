import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import modalReducer from "./features/modal/modalSlice";
import ideationReducer from "./features/ideation/ideationSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    ideation: ideationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
