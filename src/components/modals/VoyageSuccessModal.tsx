"use client";

import { useCallback } from "react";
// import Lottie from "react-lottie";
import { useTheme } from "next-themes";
// import rocketLight from "@/public/lotties/rocket_light.json";
// import rocketDark from "@/public/lotties/rocket_dark.json";
// import confetti from "@/public/lotties/confetti.json";

import Modal from "@/components/modals/Modal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";

export default function VoyageSuccessModal() {
  const { theme } = useTheme();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "voyageSuccess";

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const rocketOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const confettiOptions = {
    loop: false,
    autoplay: true,
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
        <div className="relative flex items-center justify-center w-full h-full">
          {/* {theme === "light" && (
            <Lottie
              options={{ ...rocketOptions, animationData: rocketLight }}
              height={220}
              width={400}
            />
          )}
          {theme === "dark" && (
            <Lottie
              options={{ ...rocketOptions, animationData: rocketDark }}
              height={220}
              width={400}
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full">
            <Lottie options={{ ...confettiOptions, animationData: confetti }} />
          </div> */}
        </div>
      </div>
    </Modal>
  );
}
