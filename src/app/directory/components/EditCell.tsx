"use client";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import type { TeamMember } from "./fixtures/MyTeam";
import Button from "@/components/Button";

import { useAppDispatch } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";

interface EditCellProps {
  teamMember: TeamMember;
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function EditCell({ teamMember, currentUser }: EditCellProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(
      onOpen({
        type: "editHours",
        data: { userId: currentUser.id, teamId: currentUser.teamId },
      })
    );
  }

  return (
    <div
      className={`flex items-center justify-between h-[35px] rounded-md pl-4 ${
        // need ids in the res as well
        // teamMember.member.id === currentUser.id &&
        teamMember.member.discordId === "joso-discord" &&
        "bg-base-100 hover:cursor-pointer hover:bg-secondary transition"
      }`}
    >
      {teamMember.hrPerSprint === 0 ? "Add hours" : teamMember.hrPerSprint}
      {
        // need ids in the res as well
        // teamMember.member.id === currentUser.id && (
        teamMember.member.discordId === "joso-discord" && (
          <Button
            onClick={handleClick}
            title="edit"
            customClassName="pl-2 pr-1 h-full rounded-l-none rounded-r-md p-0 min-h-0 text-sm font-medium text-base-300 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
          >
            <PencilSquareIcon className="w-4 h-4 text-base-300" />
          </Button>
        )
      }
    </div>
  );
}
