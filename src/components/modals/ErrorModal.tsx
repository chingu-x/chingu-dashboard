"use client";

import { /*Dispatch, SetStateAction,*/ useCallback } from "react";
import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import { onClose } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// interface ErrorModal {
//   action: Dispatch<SetStateAction<string>>;
// }

export default function ErrorModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);

  const isModalOpen = isOpen && type === "error";

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  return (
    <Modal isOpen={isModalOpen} title={"Error"} onClose={handleClose}>
      <div className="flex flex-col gap-4">Error</div>
      <div className="flex flex-col gap-5 pt-8">
        <Button size="lg" type="button" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
