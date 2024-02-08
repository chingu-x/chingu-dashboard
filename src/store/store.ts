import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import counterReducer from "./features/counter/counterSlice";
import modalReducer from "./features/modal/modalSlice";
import toastReducer from "./features/toast/toastSlice";
import authReducer from "./features/auth/authSlice";
import ideationReducer from "./features/ideation/ideationSlice";
import userReducer from "./features/user/userSlice";

// todo: only persist projectIdea state
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ideation"],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  modal: modalReducer,
  toast: toastReducer,
  auth: authReducer,
  user: userReducer,
  ideation: ideationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
