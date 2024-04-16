import { useCallback } from "react";
import {
  DeleteResourceProps,
  DeleteResourceResponse,
  deleteResource,
} from "@/app/(main)/my-voyage/[teamId]/voyage-resources/resourcesService";
import {
  DeleteIdeationProps,
  DeleteIdeationResponse,
  deleteIdeation,
} from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { useAppDispatch } from "@/store/hooks";
import { onCloseModal, onOpenModal } from "@/store/features/modal/modalSlice";
import useServerAction from "./useServerAction";
import routePaths from "@/utils/routePaths";
import { AsyncActionResponse } from "@/utils/handleAsync";

type ActionType<X, Y> = (arg: X) => Promise<AsyncActionResponse<Y>>;

type ActionProps = DeleteIdeationProps | DeleteResourceProps;

type ActionrResponse = DeleteIdeationResponse | DeleteResourceResponse;

export default function useDelete(type: any, payload: any) {
  const dispatch = useAppDispatch();
  const { deleteArgs } = payload;
  const { redirect } = payload;
  const getDeleteFunction = useCallback(() => {
    switch (type) {
      case "confirmation":
        return deleteIdeation;
      case "resource":
        return deleteResource;
      default:
        return null;
    }
  }, [type]);
  const deleteFunction = getDeleteFunction() as ActionType<
    ActionProps,
    ActionrResponse
  >;
  const { runAction, isLoading, setIsLoading } =
    useServerAction(deleteFunction);

  const handleDelete = useCallback(async () => {
    const [res, error] = await runAction(deleteArgs);

    if (res) {
      dispatch(onCloseModal());
      redirect
        ? redirect.router.push(routePaths.ideationPage(redirect.route))
        : null;
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
  }, [type, redirect, dispatch, setIsLoading]);

  return { handleClick: handleDelete, loadingState: isLoading };
}
