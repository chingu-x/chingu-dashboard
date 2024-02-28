"use client";

import { useCallback } from "react";
import Lottie from "react-lottie";
import checkmark from "@/public/lotties/CheckmarkAnimated.json";

import Modal from "@/components/modals/Modal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onCloseModal } from "@/store/features/modal/modalSlice";

export default function CheckInSuccessModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal.baseModal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "checkInSuccess";

  const handleClose = useCallback(() => {
    dispatch(onCloseModal({ type: "checkInSuccess" }));
  }, [dispatch]);

  const checkmarkOptions = {
    loop: false,
    autoplay: true,
    animationData: checkmark,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal isOpen={isModalOpen} title="" onClose={handleClose}>
      <div className="grid grid-cols-2 max-w-[700px] gap-x-10 items-center">
        <div className="flex flex-col py-10 gap-y-4 text-base-300">
          <h3 className="text-[30px] font-bold">
            Check In Submission Recieved
          </h3>
          <p className="text-lg font-medium">
            Thanks for checking in this week!
          </p>
        </div>
        <div className="relative flex items-center">
          <Lottie options={checkmarkOptions} height={220} width={220} />
        </div>
      </div>
    </Modal>
  );
}
