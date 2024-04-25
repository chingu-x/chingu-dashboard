import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useModal = () => useAppSelector((state) => state.modal);
export const useAuth = () => useAppSelector((state) => state.auth);
export const useUser = () => useAppSelector((state) => state.user);
export const useIdeation = () => useAppSelector((state) => state.ideation);
export const useDirectory = () => useAppSelector((state) => state.directory);
export const useSprint = () => useAppSelector((state) => state.sprint);
export const useResource = () => useAppSelector((state) => state.resources);
export const useFeatures = () => useAppSelector((state) => state.features);
