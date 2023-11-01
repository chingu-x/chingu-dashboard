"use client";

import { useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import type { TeamMember } from "./fixtures/MyTeam";
import Button from "@/components/Button";

import { useAppDispatch, useDirectory } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";
import { setHoursPerSprint } from "@/store/features/directory/directorySlice";

interface EditCellProps {
  teamMember: TeamMember;
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function EditCell({ teamMember, currentUser }: EditCellProps) {
  const dispatch = useAppDispatch();
  const { hoursPerSprint } = useDirectory();
  const hasAvgHours =
    teamMember.hrPerSprint !== 0 && teamMember.hrPerSprint !== null;

  useEffect(() => {
    if (hasAvgHours) {
      dispatch(setHoursPerSprint({ hoursPerSprint: teamMember.hrPerSprint }));
    }
  }, []);

  function handleClick() {
    dispatch(
      onOpen({
        type: "editHours",
        isEditing: hasAvgHours,
      })
    );
  }

  if (teamMember.member.id === currentUser.id) {
    return (
      <Button
        onClick={handleClick}
        title="edit"
        className="flex items-center justify-between h-[35px] min-w-[198px] rounded-md px-4 bg-base-100 hover:cursor-pointer hover:bg-secondary transition"
      >
        {hasAvgHours ? hoursPerSprint : "Add hours"}
        <div className="">
          <PencilSquareIcon className="w-4 h-4 text-base-300" />
        </div>
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-between h-[35px] rounded-md pl-4">
      {teamMember.hrPerSprint === 0 ? "Add hours" : teamMember.hrPerSprint}
    </div>
  );
}
