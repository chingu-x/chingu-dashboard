import { useCallback } from "react";
import useServerAction from "./useServerAction";
import { useAppDispatch } from "@/store/hooks";
import {
  onCloseModal,
  onOpenModal,
  type DeletePayload,
  type ActionType,
  type DeleteProps,
  type DeleteResponse,
} from "@/store/features/modal/modalSlice";

export default function useDelete(payload: Payload) {
  const dispatch = useAppDispatch();
  const { params, deleteFunction } = payload;

  const handleDelete = useCallback(async () => {
    if (!params) {
      return;
    }
    
    deleteFunction({params.})
  }, []);

  return { handleDelete, isLoading };
}
