"use client";

import { useEffect } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/toast/toastSlice";

export default function ToastProvider() {
  const dispatch = useAppDispatch();
  const { isToastOpen, context, message } = useAppSelector(
    (state) => state.toast
  );

  // To make toast disappear after 3 seconds
  useEffect(() => {
    if (isToastOpen) {
      const timer = setTimeout(() => {
        dispatch(onClose());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isToastOpen]);

  const icon = {
    success: <CheckCircleIcon />,
    error: <ExclamationTriangleIcon />,
  };

  const customStyles = {
    success: "bg-success-content border-success",
    error: "bg-error-content border-error",
  };

  const toastVariant: Variants = {
    hidden: {
      x: "120%",
      transition: { duration: 0.3 },
    },
    show: {
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.15,
        delay: 1,
      },
    },
  };

  return (
    <AnimatePresence>
      {isToastOpen && (
        <motion.div
          key="toast"
          variants={toastVariant}
          initial="hidden"
          animate="show"
          exit="hidden"
          className={`absolute z-10 right-3 top-3 flex gap-x-4 items-center p-6 text-xl font-medium border rounded-2xl w-[424px] text-base-300 shadow-sm ${customStyles[context]}`}
        >
          <div className="w-6 h-6 text-base-300">{icon[context]}</div>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
