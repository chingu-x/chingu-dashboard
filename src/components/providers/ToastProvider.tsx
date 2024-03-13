"use client";

import { useEffect } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import Alert from "@/components/Alert";

import { useAppDispatch, useToast } from "@/store/hooks";
import { onClose } from "@/store/features/toast/toastSlice";

export default function ToastProvider() {
  const dispatch = useAppDispatch();
  const { isToastOpen, context, message } = useToast();

  // To make toast disappear after 3 seconds
  useEffect(() => {
    if (isToastOpen) {
      const timer = setTimeout(() => {
        dispatch(onClose());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isToastOpen, dispatch]);

  const toastVariants: Variants = {
    hidden: {
      x: "100vw",
      transition: { delay: 0.5, duration: 0.4 },
    },
    show: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: 1,
      },
    },
  };

  return (
    <AnimatePresence>
      {isToastOpen && (
        <motion.div
          key="toast"
          variants={toastVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="absolute z-10 right-3 top-[80px]"
        >
          <Alert context={context} message={message} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
