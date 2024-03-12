"use client";

import { useEffect, useRef, useState } from "react";
import TeamMemberDataItemWrapper from "./TeamMemberDataItemWrapper";
import EditHours from "./EditHours";
import { cn } from "@/lib/utils";
import { VoyageTeam } from "@/store/features/directory/directorySlice";
import { useUser } from "@/store/hooks";

interface TeamMemberProps {
  teamMember: VoyageTeam;
}

export default function TeamMember({ teamMember }: TeamMemberProps) {
  const user = useUser().voyageTeamMembers;

  const { firstName, lastName, discordId, currentTime } = teamMember.member;
  const { id, hrPerSprint, voyageRole } = teamMember;
  const isCurrentUser = user.some((user) => user.id === id);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const newRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
    if (newRef.current && !newRef.current.contains(e.target as Node)) {
      setIsEditing(false);
    }
  };

  function handleclick() {
    setIsEditing(true);
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center p-8 text-base font-medium border border-base-100 3xl:border-none 3xl:grid 3xl:grid-cols-5 text-base-300 bg-base-200 3xl:bg-transparent 3xl:p-0 rounded-2xl 3xl:rounded-none",
        isCurrentUser && "pt-8 pb-3"
      )}
    >
      <TeamMemberDataItemWrapper label="Name">
        {firstName + " " + lastName}
      </TeamMemberDataItemWrapper>
      <TeamMemberDataItemWrapper label="Discord ID">
        {discordId}
      </TeamMemberDataItemWrapper>
      <TeamMemberDataItemWrapper label="Timezone">
        {currentTime}
      </TeamMemberDataItemWrapper>
      <TeamMemberDataItemWrapper
        label="Position"
        className={`${isCurrentUser && "pb-0"}`}
      >
        {voyageRole.name}
      </TeamMemberDataItemWrapper>
      <TeamMemberDataItemWrapper label="Average Hour/Sprint" className="pb-0">
        <div
          className={`max-w-[227px] ${isCurrentUser && "pt-4"}`}
          ref={newRef}
        >
          {isCurrentUser ? (
            <EditHours
              hrPerSprint={hrPerSprint}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleclick={handleclick}
            />
          ) : (
            hrPerSprint
          )}
        </div>
      </TeamMemberDataItemWrapper>
    </div>
  );
}
