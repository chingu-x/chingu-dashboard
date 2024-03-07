"use client";

import { useCallback, useState } from "react";
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

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  // modalError: string;
  // setModalError: (value: SetStateAction<string>) => void;
  title: string;
  message: string;
  confirmationText: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  confirmationText,
}: ErrorModalProps) {
  const params = useParams<{ teamId: string; ideationId: string }>();
  const teamId = +params.teamId;
  const router = useRouter();
  const [modalError, setModalError] = useState<string>("");

  const {
    runAction: deleteIdeationAction,
    isLoading: deleteIdeationLoading,
    setIsLoading: setDeleteIdeationLoading,
  } = useServerAction(deleteIdeation);

  const handleClose = () => {
    onClose();
  };

  const handleDelete = useCallback(async () => {
    const ideationId = +params.ideationId;
    const [res, error] = await deleteIdeationAction({ teamId, ideationId });
    if (res) {
      router.push(routePaths.ideationPage(teamId.toString()));
    }
    if (error) {
      setDeleteIdeationLoading(false);
    }
  }, [
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
    <Modal isOpen={isOpen} title={title} onClose={handleClose}>
      <div className="">{message}</div>
      <div className="">
        <Button
          size="lg"
          variant="neutral"
          type="button"
          disabled={deleteIdeationLoading}
          onClick={handleDelete}
        >
          {renderDeleteButtonContent()}
        </Button>
      </div>
    </Modal>
  );
}

{
  /* <ErrorModal
  isOpen={isErrorModalOpen}
  onClose={closeErrorModal}
  modalError={modalError}
  setModalError={setModalError}
/>; */
}
