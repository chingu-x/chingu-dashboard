import type { Dispatch, SetStateAction } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import SettingsMenu from "./SettingsMenu";
import Button from "@/components/Button";

interface RemoveVoteBtnProps {
  id: number;
  openMenu: (value: number) => void;
  numberOfVotes: number;
  closeMenu: () => void;
  setIsEditing: Dispatch<SetStateAction<number>>;
  isMenuOpen: number;
}

export default function RemoveVoteBtn({
  id,
  openMenu,
  numberOfVotes,
  closeMenu,
  setIsEditing,
  isMenuOpen,
}: RemoveVoteBtnProps) {
  const handleClick = () => {
    openMenu(id);
  };

  return (
    <div className="flex justify-end items-center w-[165px] col-span-2 relative">
      {numberOfVotes < 2 && (
        <div className="w-1/6 h-1/6">
          <EllipsisVerticalIcon
            className="rounded-xl hover:bg-base-100 mr-2  hover:cursor-pointer"
            onClick={handleClick}
          />
          {isMenuOpen === id && (
            <SettingsMenu
              onClose={closeMenu}
              setIsEditing={setIsEditing}
              id={id}
            />
          )}
        </div>
      )}
      <Button
        variant="error"
        size="xs"
        className="rounded-3xl justify-self-end font-semibold"
      >
        Remove Vote
      </Button>
    </div>
  );
}
