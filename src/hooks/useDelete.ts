import { useCallback } from "react";
import useServerAction from "./useServerAction";
import { useAppDispatch } from "@/store/hooks";
import {
  onCloseModal,
  onOpenModal,
  Payload,
} from "@/store/features/modal/modalSlice";
import routePaths from "@/utils/routePaths";
import { AsyncActionResponse } from "@/utils/handleAsync";
import { DeleteIdeationResponse } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { DeleteResourceResponse } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/resourcesService";

interface Undefined {
  params: undefined;
  redirect: undefined;
  deleteFunction: undefined;
}
type useDeleteProps = Payload | Undefined;

type ResponseTypes = DeleteIdeationResponse | DeleteResourceResponse;

export default function useDelete(payload: useDeleteProps) {
  const dispatch = useAppDispatch();
  const { params, redirect, deleteFunction } = payload;
  const { runAction, isLoading, setIsLoading } = useServerAction(
    deleteFunction!,
  );

  const handleDelete = useCallback(async () => {
    if (!params) {
      return;
    }
    const [res, error] = (await runAction(params)) as [
      AsyncActionResponse<ResponseTypes> | null,
      Error | null,
    ];

    if (res) {
      dispatch(onCloseModal());
      if (redirect && redirect.route) {
        try {
          await redirect.router?.push(routePaths.ideationPage(redirect.route));
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
