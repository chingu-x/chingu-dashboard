"use client";

import { useCallback } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { onCloseModal, onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import { deleteIdeation } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import routePaths from "@/utils/routePaths";
import { deleteResource } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/resourcesService";

export default function DeleteConfirmationModal() {
  const { isOpen, type, id } = useModal();
  const modal = useModal();
  const dispatch = useAppDispatch();
  const params = useParams<{ teamId: string; ideationId: string }>();
  const teamId = +params.teamId;
  const path = usePathname();
  const router = useRouter();

  const {
    runAction: deleteIdeationAction,
    isLoading: deleteIdeationLoading,
    setIsLoading: setDeleteIdeationLoading,
  } = useServerAction(deleteIdeation);

  const {
    runAction: deleteResourceAction,
    isLoading: deleteResourceLoading,
    setIsLoading: setDeleteResourceLoading,
  } = useServerAction(deleteResource);

  const isModalOpen = isOpen && type === "confirmation";
  const isTypeResource = path === `/my-voyage/${teamId}/voyage-resources`;

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
  }, [deleteResourceAction, dispatch, id, setDeleteResourceLoading]);

  const handleDeleteIdeation = useCallback(async () => {
    const ideationId = +params.ideationId;
    const [res, error] = await deleteIdeationAction({ teamId, ideationId });

    if (res) {
      dispatch(onCloseModal());
      router.push(routePaths.ideationPage(teamId.toString()));
    }

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
      setDeleteIdeationLoading(false);
    }
  }, [
    dispatch,
    deleteIdeationAction,
    params.ideationId,
    router,
    setDeleteIdeationLoading,
    teamId,
  ]);

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  function renderDeleteButtonContent() {
    if (deleteIdeationLoading || deleteResourceLoading) {
      return <Spinner />;
    }

    return (
      <>
        <TrashIcon className="w-4 h-4" />
        {modal.content?.confirmationText}
      </>
    );
  }

  return isModalOpen ? (
    <Modal
      isOpen={isModalOpen}
      title={modal.content!.title!}
      onClose={handleClose}
    >
      <div className="mb-10 text-base text-base-300 font-medium max-w-[650px]">
        {modal.content?.message}
      </div>
      <div className="flex gap-x-10 mt-10">
        <Button
          size="lg"
          variant="neutral"
          type="button"
          onClick={handleClose}
          className="w-1/2"
        >
          Keep It
        </Button>
        <Button
          size="lg"
          variant="error"
          type="button"
          disabled={deleteIdeationLoading || deleteResourceLoading}
          onClick={isTypeResource ? handleDeleteResource : handleDeleteIdeation}
          className="w-1/2"
        >
          {renderDeleteButtonContent()}
        </Button>
      </div>
    </Modal>
  ) : null;
}
