"use client";

import { SetStateAction } from "react";
import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalError: string;
  setModalError: (value: SetStateAction<string>) => void;
}

export default function ErrorModal({
  isOpen,
  onClose,
  modalError,
  setModalError,
}: ErrorModalProps) {
  function handleClose() {
    if (typeof onClose === "function" && typeof setModalError === "function") {
      onClose();
      setModalError("");
    }
  }
  return (
    <Modal isOpen={isOpen} title={"Error"} onClose={handleClose}>
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[90px]">
          <div className="flex flex-col gap-4">{modalError}</div>
          <div className="flex flex-col gap-5 pt-8">
            <Button size="lg" type="button" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
