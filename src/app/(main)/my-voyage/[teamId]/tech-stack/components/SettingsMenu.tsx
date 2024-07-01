"use client";
import { useEffect, useRef } from "react";
import { deleteTechItem } from "@/myVoyage/tech-stack/techStackService";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import EditMenu from "@/components/EditMenu";

interface SettingsMenuProps {
  onClose: () => void;
  setEditItemId: (value: number) => void;
  id: number;
}

export default function SettingsMenu({
  onClose,
  setEditItemId,
  id,
}: SettingsMenuProps) {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const openEdit = () => {
    setEditItemId(id);
  };

  const handleDelete = () => {
    dispatch(
      onOpenModal({
        type: "confirmation",
        content: {
          title: "Confirm Deletion",
          message:
            "Are you sure you want to delete? You will permanently lose all the information and will not be able to recover it.",
          confirmationText: "Delete",
          cancelText: "Keep It",
        },
        payload: {
          params: {
            techItemId: id,
          },
          redirect: null,
          deleteFunction: deleteTechItem,
        },
      }),
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="absolute -mt-6 ml-[12px]" ref={menuRef}>
      <EditMenu handleClick={openEdit} handleDelete={handleDelete} />
    </div>
  );
}
