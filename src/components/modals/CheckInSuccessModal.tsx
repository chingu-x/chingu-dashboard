"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import checkmarkLight from "@/public/lotties/checkmark_light.json";
import checkmarkDark from "@/public/lotties/checkmark_dark.json";

import Modal from "@/components/modals/Modal";

import { useAppDispatch, useModal } from "@/store/hooks";
import { onCloseModal } from "@/store/features/modal/modalSlice";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function CheckInSuccessModal() {
  const { isOpen } = useModal();
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(onCloseModal());
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} title="" onClose={handleClose}>
      <div className="grid max-w-[700px] grid-cols-[1fr_200px] items-center gap-x-10">
        <div className="flex flex-col gap-y-4 py-10 text-base-300">
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
