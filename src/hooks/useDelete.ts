import { useCallback } from "react";
import { NextRouter } from "next/router";
import useServerAction from "./useServerAction";
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
import { onCloseModal, onOpenModal, ModalType } from "@/store/features/modal/modalSlice";
import routePaths from "@/utils/routePaths";
import { AsyncActionResponse } from "@/utils/handleAsync";

type ActionType<X, Y> = (arg: X) => Promise<AsyncActionResponse<Y>>;
type ActionProps = DeleteIdeationProps | DeleteResourceProps
type ActionrResponse = DeleteIdeationResponse | DeleteResourceResponse;

interface RedirectProps {
  router: NextRouter;
  route: string
}
interface UseDeletePayload {
  deleteArgs?: ActionProps
  redirect?: RedirectProps 
}
interface UseDeleteProps {
  type: string | undefined;
  payload: UseDeletePayload ;
}
export default function useDelete( { type, payload } : UseDeleteProps ){
  const dispatch = useAppDispatch()
  const { deleteArgs, redirect } = payload

  const getDeleteFunction = useCallback(() => {
    const deleteFunctionMap = {
      "confirmation": deleteIdeation,
      "resource": deleteResource
    };
    if(type && type in deleteFunctionMap){
      return deleteFunctionMap[type as keyof typeof deleteFunctionMap];
    }
  }, [type]);
  
  const deleteFunction = getDeleteFunction() as ActionType< ActionProps, ActionrResponse >;
  const { 
    runAction, 
    isLoading, 
    setIsLoading 
  } = useServerAction(deleteFunction);

  const handleDelete = useCallback(async () => {
    if(!deleteArgs){
      return
    }
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
  }, [type, redirect, dispatch, setIsLoading, deleteArgs, runAction]);

  return { handleDelete, isLoading };
}
