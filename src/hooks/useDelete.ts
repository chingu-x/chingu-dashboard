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

interface Undefined {
  params: undefined;
  redirect: undefined;
  deleteFunction: undefined;
}
type useDeleteProps = Payload | Undefined;

export default function useDelete(payload: useDeleteProps) {
  if (!payload) {
    return { handleDelete: null, isLoading: false };
  }
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
        try {
          redirect.router?.push(redirect.route);
        } catch (redirectError) {
          dispatch(
            onOpenModal({
              type: "error",
              content: {
                message:
                  "Delete successful but something went wrong navigating back to page.",
              },
            }),
          );
        }
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
