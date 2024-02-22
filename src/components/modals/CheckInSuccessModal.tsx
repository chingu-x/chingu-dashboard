"use client";

import { useCallback } from "react";
// import Lottie from "react-lottie";
// import { useTheme } from "next-themes";
// import checkmarkLight from "@/public/lotties/checkmark_light.json";
// import checkmarkDark from "@/public/lotties/checkmark_dark.json";

import Modal from "@/components/modals/Modal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";

export default function CheckInSuccessModal() {
  // const { theme } = useTheme();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "checkInSuccess";

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  // const checkmarkOptions = {
  //   loop: false,
  //   autoplay: true,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

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
        <div className="relative flex items-center justify-center">
          {/* {theme === "light" && (
            <Lottie
              options={{ ...checkmarkOptions, animationData: checkmarkLight }}
              height={220}
              width={220}
            />
          )}
          {theme === "dark" && (
            <Lottie
              options={{ ...checkmarkOptions, animationData: checkmarkDark }}
              height={220}
              width={220}
            />
          )} */}
        </div>
      </div>
    </Modal>
  );
}
