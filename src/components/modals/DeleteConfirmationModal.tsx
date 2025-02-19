"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { Button } from "@chingu-x/components/button";
import { Spinner } from "@chingu-x/components/spinner";
import { Modal } from "@chingu-x/components/modal";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";
import useDelete from "@/hooks/useDelete";

export default function DeleteConfirmationModal() {
  const { isOpen, payload } = useModal();
  const modal = useModal();
  const dispatch = useAppDispatch();

  const { handleDelete, isLoading } = useDelete(payload!);

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  function renderDeleteButtonContent() {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <>
        <TrashIcon className="h-4 w-4" />
        {modal.content?.confirmationText}
      </>
    );
  }

  return (
    <Modal isOpen={isOpen} title={modal.content!.title!} onClose={handleClose}>
      <div className="mb-10 max-w-[650px] text-base font-medium text-base-300">
        {modal.content?.message}
      </div>
      <div className="mt-10 flex gap-x-10">
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
          disabled={isLoading}
          onClick={handleDelete}
          className="w-1/2"
        >
          {renderDeleteButtonContent()}
        </Button>
      </div>
    </Modal>
  );
}
