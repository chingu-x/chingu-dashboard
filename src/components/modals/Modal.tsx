"use client";

import { useEffect, useState } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components";

interface ModalProps {
  isOpen: boolean;
  title: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  onSubmit: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  title,
  children,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
  onSubmit,
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
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog className="modal bg-base-300/25" open={showModal} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box bg-base-content flex flex-col text-base-300 md:min-w-[730px] overflow-y-hidden p-10"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between pb-8">
          <h3 className="text-xl font-semibold capitalize">{title}</h3>
          <button type="button" aria-label="close modal" onClick={onClose}>
            <XMarkIcon className="w-6 h-6 fill-current" />
          </button>
        </div>
        {/* FORM */}
        <form onSubmit={onSubmit} className="flex flex-col overflow-hidden">
          {/* BODY */}
          <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[50px]">
            {children}
          </div>
          {/* BUTTONS */}
          <div className="flex flex-col gap-5 pt-8">
            <Button
              type="submit"
              title={primaryActionLabel}
              customClassName="text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus"
            >
              {primaryActionLabel}
            </Button>
            {secondaryAction && secondaryActionLabel && (
              <Button
                onClick={secondaryAction}
                title={secondaryActionLabel}
                customClassName="text-base border-none font-semibold capitalize bg-error-content text-base-300 hover:bg-error"
              >
                <TrashIcon className="w-4 h-4" />
                {secondaryActionLabel}
              </Button>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
}
