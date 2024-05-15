"use client";
import { useEffect, useRef } from "react";
import EditMenu from "@/components/EditMenu";

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
    <div ref={menuRef}>
      <EditMenu handleClick={openEdit} />
    </div>
  );
}
