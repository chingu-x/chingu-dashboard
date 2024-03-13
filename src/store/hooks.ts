import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useModal = () => useAppSelector((state) => state.modal);
export const useToast = () => useAppSelector((state) => state.toast);
export const useAuth = () => useAppSelector((state) => state.auth);
export const useUser = () => useAppSelector((state) => state.user);
export const useIdeation = () => useAppSelector((state) => state.ideation);
export const useSprint = () => useAppSelector((state) => state.sprint);
