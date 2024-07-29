import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { type StaticImageData } from "next/image";
import { type Key } from "react";
import Button from "@/components/Button";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";
import { type TechStackItemVotes } from "@/store/features/techStack/techStackSlice";

interface FinalizeTechListItemProps {
  title: string;
  techItemVotes: TechStackItemVotes[];
  techId: number;
  isSelected: boolean;
}
type Vote = {
  votedBy: {
    member: {
      id: Key | null | undefined;
      avatar: string | StaticImageData | undefined;
    };
  };
};

export default function FinalizeTechListItem({
  title,
  techItemVotes,
  //techId,
  isSelected,
}: FinalizeTechListItemProps) {
  return (
    <Button
      variant={isSelected ? "primary" : "outline"}
      className="gap-x-0"
      aria-label="Finalized Project Idea"
    >
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <h2 className="text-base font-semibold">{title}</h2>
        <AvatarGroup>
          {techItemVotes.map((vote: Vote) => (
            <Avatar
              key={vote.votedBy.member.id}
              image={vote.votedBy.member.avatar}
              width={24}
              height={24}
            />
          ))}
        </AvatarGroup>
      </div>
      <div className="h-6 w-6">{isSelected && <CheckCircleIcon />}</div>
    </Button>
  );
}
