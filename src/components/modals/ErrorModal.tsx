"use client";

import { useCallback } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import Button from "@/components/Button";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";

export default function ErrorModal() {
  const { isOpen, type, content } = useModal();
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "error";

  const handleClose = useCallback(() => {
    dispatch(onCloseModal());
  }, [dispatch]);

  return (
    <Modal
      isOpen={isModalOpen}
      title="Submission Error"
      onClose={handleClose}
      icon={<ExclamationTriangleIcon className="w-8" />}
      headerBackground="bg-error-content"
    >
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[90px]">
          <div className="flex flex-col gap-4 text-base text-base-300 font-medium max-w-[650px]">
            {content?.message}
          </div>
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
