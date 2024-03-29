import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import modalReducer from "./features/modal/modalSlice";
import toastReducer from "./features/toast/toastSlice";
import authReducer from "./features/auth/authSlice";
import ideationReducer from "./features/ideation/ideationSlice";
import resourceReducer from "./features/resources/resourcesSlice";
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

const rootReducer = combineReducers({
  modal: modalReducer,
  toast: toastReducer,
  auth: authReducer,
  user: userReducer,
  ideation: ideationReducer,
  resources: resourceReducer,
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
