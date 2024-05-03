import { type Dispatch, type SetStateAction } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import { type ProjectIdeaVotes } from "@/store/features/ideation/ideationSlice";

interface FinalizeIdeationItemProps {
  title: string;
  projectIdeaVotes: ProjectIdeaVotes[];
  finalizedIdeation: string;
  setFinalizedIdeation: Dispatch<SetStateAction<string>>;
}

export default function FinalizeIdeationItem({
  title,
  projectIdeaVotes,
  finalizedIdeation,
  setFinalizedIdeation,
}: FinalizeIdeationItemProps) {
  function handleClick() {
    setFinalizedIdeation(title);
  }

  return (
    <Button
      variant={finalizedIdeation === title ? "primary" : "outline"}
      className="w-full gap-x-0"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center w-full gap-y-2">
        <h2 className="text-base font-semibold">{title}</h2>
        <AvatarGroup>
          {projectIdeaVotes.map((votes) => {
            const {
              votedBy: {
                member: { avatar, id },
              },
            } = votes;
            return (
              <Avatar
                width={24}
                height={24}
                key={id}
                image={avatar}
              />
            );
          })}
        </AvatarGroup>
      </div>
      <div className="w-6 h-6">
        <CheckCircleIcon
          className={`${
            finalizedIdeation !== title ? "hidden" : "w-6 h-6 text-base-200"
          }`}
        />
      </div>
    </Button>
  );
}
