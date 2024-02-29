import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import modalReducer from "./features/modal/modalSlice";
import errorModalReducer from "./features/modal/errorModalSlice";
import confirmationModalReducer from "./features/modal/confirmationModalSlice";
import toastReducer from "./features/toast/toastSlice";
import authReducer from "./features/auth/authSlice";
import ideationReducer from "./features/ideation/ideationSlice";
import userReducer from "./features/user/userSlice";

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ideation"],
};

const modal = combineReducers({
  baseModal: modalReducer,
  errorModal: errorModalReducer,
  confirmationModal: confirmationModalReducer,
});

const rootReducer = combineReducers({
  modal,
  toast: toastReducer,
  auth: authReducer,
  user: userReducer,
  ideation: ideationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (MiddlewareArray) =>
    MiddlewareArray({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development" ? true : false,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
