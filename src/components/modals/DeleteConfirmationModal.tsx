"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Modal from "./Modal";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import type {
  DeleteFunctionsMap,
  DeleteProps,
} from "@/store/features/modal/modalSlice";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";

export default function DeleteConfirmationModal() {
  const { isOpen, payload } = useModal();
  const { params, deleteFunction } = payload || {};
  const modal = useModal();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  function handleDelete() {
    if (deleteFunction && params) {
      setLoading(true);

      deleteFunction(params, {
        onSettled: () => setLoading(false),
      });
    }
  }

  function renderDeleteButtonContent() {
    if (loading) {
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
          disabled={loading}
          onClick={handleDelete}
          className="w-1/2"
        >
          {renderDeleteButtonContent()}
        </Button>
      </div>
    </Modal>
  );
}
