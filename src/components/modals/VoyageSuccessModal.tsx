"use client";

import { useCallback } from "react";
import Lottie from "react-lottie";
import rocket from "@/public/lotties/RocketAnimated.json";
import confeti from "@/public/lotties/ConfetiAnimated.json";

import Modal from "@/components/modals/Modal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";

export default function VoyageSuccessModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "voyageSuccess";

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const rocketOptions = {
    loop: true,
    autoplay: true,
    animationData: rocket,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const confetiOptions = {
    loop: false,
    autoplay: true,
    animationData: confeti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal isOpen={isModalOpen} title="" onClose={handleClose}>
      <div className="grid grid-cols-2 max-w-[1000px] gap-x-10 items-center">
        <div className="flex flex-col py-10 gap-y-4 text-base-300">
          <h3 className="text-[30px] font-bold">Congratulations!</h3>
          <p className="text-lg font-medium">
            Big high-fives and a virtual standing ovation for completing your
            voyage!
            <br />
            <br />
            We&apos;ll review your team&apos;s project and will create and email
            Completion Certificates soon. Stay tuned to the Vnn-announcements
            channel in Discord where we will post status updates on this.
            <br />
            <br />
            Keep celebrating your achievements by sharing your project in the
            Discord community and updating your portfolio.
          </p>
        </div>
        <div className="relative flex items-center">
          <Lottie options={rocketOptions} height={220} width={400} />
          <div className="absolute top-0 left-0">
            <Lottie options={confetiOptions} height={220} width={400} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
