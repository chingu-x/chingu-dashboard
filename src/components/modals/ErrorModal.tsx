"use client";

import { useCallback } from "react";
import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function ErrorModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal.baseModal);
  const { error } = useAppSelector((state) => state.modal.errorModal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "error";

  const handleClose = useCallback(() => {
    dispatch(onCloseModal({ type: "error" }));
  }, [dispatch]);

  return (
    <Modal isOpen={isModalOpen} title={"Error"} onClose={handleClose}>
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[90px]">
          <div className="flex flex-col gap-4">{error}</div>
          <div className="flex flex-col gap-5 pt-8">
            <Button size="lg" type="button" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
