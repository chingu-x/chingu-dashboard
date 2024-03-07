"use client";

import { useEffect } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children, onClose }: ModalProps) {
  // Use ESC to close the modal
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onClose]);

  const overlayVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.25,
      },
    },
  };

  const modalBoxVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.75,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeOut",
        duration: 0.15,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      transition: {
        ease: "easeIn",
        duration: 0.15,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.dialog
          key="overlay"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-overlay"
          open={isOpen}
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            variants={modalBoxVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl bg-base-content flex flex-col text-base-300 md:min-w-[730px] overflow-y-hidden max-h-[calc(100vh-5em)]"
          >
            {children}
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
}
