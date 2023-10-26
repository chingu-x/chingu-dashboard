"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/toast/toastSlice";

export default function ToastProvider() {
  const dispatch = useAppDispatch();
  const { isToastOpen, toastType, message } = useAppSelector(
    (state) => state.toast
  );

  // Toast dissapears after 3 seconds
  useEffect(() => {
    if (isToastOpen) {
      const timer = setTimeout(() => {
        dispatch(onClose());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isToastOpen]);

  return (
    <AnimatePresence>
      {isToastOpen && (
        <div className="absolute right-3 top-[75px] z-10 overflow-hidden">
          <motion.div
            key="toast"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`flex gap-x-4 items-center p-6 text-xl font-medium border rounded-2xl w-[424px] text-base-300 shadow-sm ${
              toastType === "success"
                ? "bg-success-content border-success"
                : "bg-error-content border-error"
            }`}
          >
            <div className="w-6 h-6 text-base-300">
              {toastType === "success" ? (
                <CheckCircleIcon />
              ) : (
                <ExclamationTriangleIcon />
              )}
            </div>
            <span>{message}</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
