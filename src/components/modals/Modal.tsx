"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  // To keep DaisyUI modal animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(isOpen);
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen]);

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

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      className="fixed z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto overlay bg-base-300/25"
      open={showModal}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl bg-base-content flex flex-col text-base-300 md:min-w-[730px] overflow-y-hidden p-10"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between pb-8">
          <h3 className="text-xl font-semibold capitalize">{title}</h3>
          <button type="button" aria-label="close modal" onClick={onClose}>
            <XMarkIcon className="w-6 h-6 fill-current" />
          </button>
        </div>
        {/* CONTENT */}
        {children}
      </div>
    </dialog>
  );
}
