import { Dispatch, SetStateAction } from "react";
import Button from "@/components/Button";
import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import { ProjectIdeaVotes } from "@/store/features/ideation/ideationSlice";

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
      variant="outline"
      className={`flex-col w-[800px] gap-y-2 ${
        finalizedIdeation === title ? "bg-primary text-base-200" : ""
      }`}
      onClick={handleClick}
    >
      <h2 className="font-semibold text-base">{title}</h2>
      <AvatarGroup>
        {projectIdeaVotes.map((votes) => {
          const {
            votedBy: {
              member: { avatar, id },
            },
          } = votes;
          return <Avatar width={24} height={24} key={id} image={avatar} />;
        })}
      </AvatarGroup>
    </Button>
  );
}
