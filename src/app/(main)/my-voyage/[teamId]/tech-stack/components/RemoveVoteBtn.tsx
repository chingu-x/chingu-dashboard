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
    <div className="relative col-span-2 flex w-[165px] items-center justify-end">
      {numberOfVotes < 2 && (
        <div className="h-1/6 w-1/6">
          <EllipsisVerticalIcon
            className="mr-2 rounded-xl hover:cursor-pointer hover:bg-base-100"
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
        className="justify-self-end rounded-3xl font-semibold"
      >
        Remove Vote
      </Button>
    </div>
  );
}
