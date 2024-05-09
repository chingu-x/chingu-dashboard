"use client";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

interface SettingsMenuProps {
  onClose: () => void;
  setIsEditing: (value: number) => void;
  id: number;
}

export default function SettingsMenu({
  onClose,
  setIsEditing,
  id,
}: SettingsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const openEdit = () => {
    setIsEditing(id);
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
    <>
      <div
        ref={menuRef}
        className="absolute z-10 ml-20 mt-28 bg-base-200 border-2 border-base-100 rounded-xl  w-40 h-36 flex flex-col justify-evenly p-2"
      >
        <Button
          variant="outline"
          size="xs"
          className="flex justify-start"
          onClick={openEdit}
        >
          <PencilSquareIcon className="w-3/12 h-3/12 " />
          Edit
        </Button>
        <Button variant="error" size="xs" className="flex justify-start">
          <TrashIcon className="w-3/12 h-3/12" />
          Delete
        </Button>
      </div>
    </>
  );
}
