import { type Dispatch, type SetStateAction } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@chingu-x/components/avatar";
import Image from "next/image";
import { AvatarGroup } from "@chingu-x/components/avatar-group";
import { type FinalizedIdeation } from "./FinalizeIdeationList";
import Button from "@/components/Button";
import { type ProjectIdeaVotes } from "@/store/features/ideation/ideationSlice";

interface FinalizeIdeationItemProps {
  title: string;
  projectIdeaVotes: ProjectIdeaVotes[];
  ideationId: number;
  finalizedIdeation: FinalizedIdeation;
  setFinalizedIdeation: Dispatch<SetStateAction<FinalizedIdeation>>;
}

export default function FinalizeIdeationItem({
  title,
  projectIdeaVotes,
  finalizedIdeation,
  ideationId,
  setFinalizedIdeation,
}: FinalizeIdeationItemProps) {
  function handleClick() {
    setFinalizedIdeation({
      id: ideationId,
      title,
    });
  }
  return (
    <Button
      variant={finalizedIdeation.title === title ? "primary" : "outline"}
      className="w-full gap-x-0"
      onClick={handleClick}
      aria-label="Finalized Project Idea"
    >
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <h2 className="text-base font-semibold">{title}</h2>
        <AvatarGroup>
          {projectIdeaVotes.map((votes) => {
            const {
              votedBy: {
                member: { avatar, id },
              },
            } = votes;
            return (
              <Avatar key={id}>
                <Image src={avatar} alt="avatar" width={24} height={24} />
              </Avatar>
            );
          })}
        </AvatarGroup>
      </div>
      <div className="h-6 w-6">
        <CheckCircleIcon
          className={`${
            finalizedIdeation.title === title
              ? "h-6 w-6 text-base-200"
              : "hidden"
          }`}
        />
      </div>
    </Button>
  );
}
