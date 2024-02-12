"use client";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";

interface ErrorModalProps {
  isOpen: boolean;
  handleClose: () => void;
  errorMessage: string;
}

export default function ErrorModal({
  isOpen,
  handleClose,
  errorMessage,
}: ErrorModalProps) {
  return (
    <Modal isOpen={isOpen} title={"Error"} onClose={handleClose}>
      <div className="flex flex-col gap-4">{errorMessage}</div>
      <div className="flex flex-col gap-5 pt-8">
        <Button size="lg" type="button" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
