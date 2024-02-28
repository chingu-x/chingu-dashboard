"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import checkmarkLight from "@/public/lotties/checkmark_light.json";
import checkmarkDark from "@/public/lotties/checkmark_dark.json";

import Modal from "@/components/modals/Modal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onCloseModal } from "@/store/features/modal/modalSlice";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function CheckInSuccessModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal.baseModal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "checkInSuccess";

  const handleClose = useCallback(() => {
    dispatch(onCloseModal({ type: "checkInSuccess" }));
  }, [dispatch]);

  return (
    <Modal isOpen={isModalOpen} title="" onClose={handleClose}>
      <div className="grid grid-cols-[1fr_200px] max-w-[700px] gap-x-10 items-center">
        <div className="flex flex-col py-10 gap-y-4 text-base-300">
          <h3 className="text-[30px] font-bold">
            Check In Submission Recieved
          </h3>
          <p className="text-lg font-medium">
            Thanks for checking in this week!
          </p>
        </div>
        <div className="relative flex items-center justify-center">
          <Lottie
            animationData={checkmarkLight}
            loop={false}
            data-hide-on-theme="dark"
          />
          <Lottie
            animationData={checkmarkDark}
            loop={false}
            data-hide-on-theme="light"
          />
        </div>
      </div>
    </Modal>
  );
}
