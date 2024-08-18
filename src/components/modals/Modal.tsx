"use client";

import { useEffect } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import IconButton from "@/components/IconButton";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  headerBackground?: string;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  icon,
  headerBackground,
}: ModalProps) {
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
          className="fixed z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-overlay"
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
            className="flex max-h-[calc(100vh-5em)] flex-col overflow-y-hidden rounded-2xl bg-base-content text-base-300 md:min-w-[730px]"
          >
            {/* HEADER */}
            <div
              className={cn(
                `flex items-center justify-between px-10 pt-10 ${headerBackground}`,
                headerBackground && "py-6",
              )}
            >
              <div className="flex items-center gap-x-4">
                {icon}
                <h3 className="text-xl font-semibold capitalize">{title}</h3>
              </div>
              <IconButton ariaLabel="close modal" onClick={onClose}>
                <XMarkIcon className="h-6 w-6 fill-current" />
              </IconButton>
            </div>
            {/* CONTENT */}
            <div className="p-10">{children}</div>
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
}
