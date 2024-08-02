import GetIcon from "./GetIcons";
import type { SelectedCategory } from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/utils/getSelectedTechItems";
import type { TechStackItemVotes } from "@/store/features/techStack/techStackSlice";
import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroup";

interface FinalizedTechStackCardProps {
  title: string;
  data: SelectedCategory;
}

export default function FinalizedTechStackCard({
  title,
  data,
}: FinalizedTechStackCardProps) {

  return (
    <>
      <div className="h-80 min-w-[420px] rounded-lg bg-base-200 p-6 text-base-300 sm:w-96 [&>*]:my-4">
        <div className="flex flex-row justify-start">
          {GetIcon(title)}
          <span className="self-center text-xl font-semibold text-base-300">
            {title}
          </span>
        </div>
        {data.techItems.map((item) => (
          <FinalizedTechListItem key={item.id} name={item.name} votes={item.teamTechStackItemVotes} />
        ))}
      </div>
    </>
  );
}

interface FinalizedTechListItemProps {
  name: string;
  votes: TechStackItemVotes[]
}
export function FinalizedTechListItem({ name, votes }: FinalizedTechListItemProps) {
  const avatars = votes.map((vote) => vote.votedBy.member);

  return (
    <div className="flex items-center bg-neutral-content h-12 px-4 py-2 rounded-md">
      <h1 className="font-medium w-1/3">{name}</h1>
      <AvatarGroup>
        {avatars.map((member) => (
          <Avatar
            key={member.id}
            image={member.avatar}
            width={24}
            height={24}
          />
        ))}
      </AvatarGroup>
    </div>
  );
}
