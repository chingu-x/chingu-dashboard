import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";
import ideationReducer from "./features/ideation/ideationSlice";
import resourceReducer from "./features/resources/resourcesSlice";
import userReducer from "./features/user/userSlice";
import directoryReducer from "./features/directory/directorySlice";
import sprintReducer from "./features/sprint/sprintSlice";
import featuresReducer from "./features/features/featuresSlice";
import techStackReducer from "./features/techStack/techStackSlice";

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
  whitelist: ["ideation", "sprint"],
};

// Root reducer should be used as import directly only for tests
export const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  user: userReducer,
  ideation: ideationReducer,
  directory: directoryReducer,
  features: featuresReducer,
  resources: resourceReducer,
  sprint: sprintReducer,
  techStack: techStackReducer,
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
