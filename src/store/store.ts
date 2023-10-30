import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import modalReducer from "./features/modal/modalSlice";
import userReducer from "./features/user/userSlice";
import techStackReducer from "./features/techStack/techStackSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    user: userReducer,
    techStack: techStackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
