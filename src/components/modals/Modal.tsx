"use client";

import { useCallback, useEffect } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { onClose } from "@/store/features/modal";

interface ModalProps {
  title: string;
  modalType: string;
  primaryActionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function Modal({
  title,
  modalType,
  children,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
  onSubmit,
}: ModalProps) {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === modalType;

  const handleClick = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  // Use ESC to close the modal
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClick();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [dispatch, handleClick]);

  return (
    <dialog
      className="modal bg-base-300/25"
      open={isModalOpen}
      onClick={handleClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box bg-base-content flex flex-col text-base-300 md:min-w-[730px] overflow-y-hidden p-10"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between pb-10">
          <h3 className="text-xl font-semibold capitalize">{title}</h3>
          <button type="button" aria-label="close modal" onClick={handleClick}>
            <XMarkIcon className="w-6 h-6 fill-current" />
          </button>
        </div>
        {/* FORM */}
        <form onSubmit={onSubmit} className="flex flex-col overflow-y-hidden">
          <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[100px]">
            {children}
          </div>
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
