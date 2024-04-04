import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import { ProjectIdeaVotes } from "@/store/features/ideation/ideationSlice";

interface FinalizeIdeationItemProps {
  title: string;
  projectIdeaVotes: ProjectIdeaVotes[];
}

export default function FinalizeIdeationItem({
  title,
  projectIdeaVotes,
}: FinalizeIdeationItemProps) {
  return (
    <div className="flex flex-col items-center w-[800px] bg-base-200 rounded-lg border border-primary gap-y-2 py-3">
      <h2 className="font-semibold text-base text-base-300">{title}</h2>
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
    </div>
  );
}
