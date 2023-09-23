"use client";

import { useEffect } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body: React.ReactElement;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  primaryActionLabel,
  secondaryActionLabel,
  secondaryAction,
}: ModalProps) {
  // Use ESC tp close the modal
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

  return (
    <dialog className="modal bg-base-300/25" open={isOpen} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box bg-base-content p-10 text-base-300 md:min-w-[730px]"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold capitalize">{title}</h3>
          <button aria-label="close modal" onClick={onClose}>
            <XMarkIcon className="w-6 h-6 fill-current" />
          </button>
        </div>
        {/* FORM */}
        <form onSubmit={onSubmit}>
          {/* BODY */}
          <div className="py-10">{body}</div>
          {/* BUTTONS */}
          <div className="flex flex-col gap-5">
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
