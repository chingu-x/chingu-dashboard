import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import modalReducer from "./features/modal/modalSlice";
import toastReducer from "./features/toast/toastSlice";
import authReducer from "./features/auth/authSlice";
import ideationReducer from "./features/ideation/ideationSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    toast: toastReducer,
    auth: authReducer,
    user: userReducer,
    ideation: ideationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
