import { useCallback, useEffect } from "react";
import { deleteResource } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/resourcesService";
import { deleteIdeation } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { useAppDispatch } from "@/store/hooks";
import { onCloseModal, onOpenModal } from "@/store/features/modal/modalSlice";
import useServerAction from "./useServerAction";
import routePaths from "@/utils/routePaths";

export default function useDelete(type: any, props: any, helpers: any) {
  const dispatch = useAppDispatch();

  //for deleting voyage resources
  const { id } = props;

  //for deleting ideations
  const { ideationId, teamId } = props;
  const { router } = helpers;

  const {
    runAction: deleteResourceAction,
    isLoading: deleteResourceLoading,
    setIsLoading: setDeleteResourceLoading,
  } = useServerAction(deleteResource);

  const {
    runAction: deleteIdeationAction,
    isLoading: deleteIdeationLoading,
    setIsLoading: setDeleteIdeationLoading,
  } = useServerAction(deleteIdeation);

  const handleDeleteResource = useCallback(async () => {
    const [res, error] = await deleteResourceAction({ resourceId: id });

    if (res) {
      dispatch(onCloseModal());
    }

    if (error) {
      dispatch(
        onOpenModal({
          type: "error",
          content: { message: "An error has occurred. Please try again." },
        }),
      );
    }

    setDeleteResourceLoading(false);
  }, [id]);

  const handleDeleteIdeation = useCallback(async () => {
    const [res, error] = await deleteIdeationAction({
      teamId: teamId,
      ideationId: ideationId,
    });

    if (res) {
      dispatch(onCloseModal());
      router.push(routePaths.ideationPage(teamId.toString()));
    }

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }
    setDeleteIdeationLoading(false);
  }, [ideationId]);

  return {
    handleClick: handleDeleteIdeation,
    loadingState: deleteIdeationLoading,
  };
  //return { handleClick: handleDeleteResource, loadingState:deleteResourceLoading}
}
