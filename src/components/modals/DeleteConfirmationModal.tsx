"use client";

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { onCloseModal, onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import { deleteIdeation } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import routePaths from "@/utils/routePaths";

export default function DeleteConfirmationModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const { title, message, confirmationText } = useAppSelector(
    (state) => state.modal.content,
  );
  const dispatch = useAppDispatch();
  const params = useParams<{ teamId: string; ideationId: string }>();
  const teamId = +params.teamId;
  const router = useRouter();

  const {
    runAction: deleteIdeationAction,
    isLoading: deleteIdeationLoading,
    setIsLoading: setDeleteIdeationLoading,
  } = useServerAction(deleteIdeation);

  const isModalOpen = isOpen && type === "confirmation";

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  const handleDelete = useCallback(async () => {
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

  function renderDeleteButtonContent() {
    if (deleteIdeationLoading) {
      return <Spinner />;
    }

    return (
      <>
        <TrashIcon className="w-4 h-4" />
        {confirmationText}
      </>
    );
  }

  return (
    <Modal isOpen={isModalOpen} title={title!} onClose={handleClose}>
      <div className="mb-10 text-base text-base-300 font-medium ">
        {message}
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
          disabled={deleteIdeationLoading}
          onClick={handleDelete}
          className="w-1/2"
        >
          {renderDeleteButtonContent()}
        </Button>
      </div>
    </Modal>
  );
}
