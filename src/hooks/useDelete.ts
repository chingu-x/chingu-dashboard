import { useCallback } from "react";
import useServerAction from "./useServerAction";
import { useAppDispatch } from "@/store/hooks";
import {
  onCloseModal,
  onOpenModal,
  Payload,
  ActionType,
  DeleteProps,
  DeleteResponse,
} from "@/store/features/modal/modalSlice";

export default function useDelete(payload: Payload) {
  const dispatch = useAppDispatch();
  const { params, redirect, deleteFunction } = payload;
  const { runAction, isLoading, setIsLoading } = useServerAction(
    deleteFunction as ActionType<DeleteProps, DeleteResponse>,
  );

  const handleDelete = useCallback(async () => {
    if (!params) {
      return;
    }
    const [res, error] = await runAction(params);

    if (res) {
      dispatch(onCloseModal());
      if (redirect && redirect.route) {
        redirect.router?.push(redirect.route);
      }
    }
    if (error) {
      dispatch(
        onOpenModal({
          type: "error",
          content: { message: error.message },
        }),
      );
    }
    setIsLoading(false);
  }, [redirect, dispatch, setIsLoading, params, runAction]);

  return { handleDelete, isLoading };
}
