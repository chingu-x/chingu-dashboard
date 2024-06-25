"use client";

import { useCallback } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import Button from "@/components/Button";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";

export default function ErrorModal() {
  const { isOpen, content } = useModal();
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(onCloseModal());
  }, [dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      title="Submission Error"
      onClose={handleClose}
      icon={<ExclamationTriangleIcon className="w-8" />}
      headerBackground="bg-error-content"
    >
      <div className="flex flex-col overflow-hidden">
        <div className="mr-1 flex min-h-[90px] flex-col overflow-y-auto pr-2">
          <p className="flex max-w-[650px] flex-col gap-4 text-base font-medium text-base-300">
            {`The following error occurred: ${content?.message?.toUpperCase()}. Please try again later or contact support.`}
          </p>
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
