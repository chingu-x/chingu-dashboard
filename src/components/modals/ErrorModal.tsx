"use client";

import { useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import Button from "@/components/Button";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function ErrorModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const { content } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "error";

  const handleClose = useCallback(() => {
    dispatch(onCloseModal());
  }, [dispatch]);

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <div className="flex items-center justify-between p-6 bg-error-content">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="w-8 mr-2" />
          <h3 className="text-xl font-semibold capitalize">Submission Error</h3>
        </div>
        <button type="button" aria-label="close modal" onClick={handleClose}>
          <XMarkIcon className="w-6 h-6 fill-current" />
        </button>
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col p-6 mr-1 overflow-y-auto min-h-[90px] relative">
          <div className="flex flex-col gap-4">{content.message}</div>
          <div className="flex flex-col gap-5 pt-8">
            <Button
              size="lg"
              variant="neutral"
              type="button"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
