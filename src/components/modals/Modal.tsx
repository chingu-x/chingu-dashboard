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
        className="modal-box bg-base-content flex flex-col text-base-300 md:min-w-[730px] overflow-y-hidden p-10"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between pb-10">
          <h3 className="text-xl font-semibold capitalize">{title}</h3>
          <button type="button" aria-label="close modal" onClick={onClose}>
            <XMarkIcon className="w-6 h-6 fill-current" />
          </button>
        </div>
        {/* FORM */}
        <form onSubmit={onSubmit} className="flex flex-col overflow-y-hidden">
          {/* BODY */}
          <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[100px]">
            {body}
          </div>
          {/* BUTTONS */}
          <div className="flex flex-col gap-5 pt-10">
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
