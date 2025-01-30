import { Avatar } from "@chingu-x/components/avatar";
import Image from "next/image";
import { AvatarGroup } from "@chingu-x/components/avatar-group";
import GetIcon from "./GetIcons";
import type { SelectedCategory } from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/utils/getSelectedTechItems";
import type { TechStackItemVotes } from "@/store/features/techStack/techStackSlice";

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
          <FinalizedTechListItem
            key={item.id}
            name={item.name}
            votes={item.teamTechStackItemVotes}
          />
        ))}
      </div>
    </>
  );
}

interface FinalizedTechListItemProps {
  name: string;
  votes: TechStackItemVotes[];
}
export function FinalizedTechListItem({
  name,
  votes,
}: FinalizedTechListItemProps) {
  const avatars = votes.map((vote) => vote.votedBy.member);

  return (
    <div className="flex h-12 items-center rounded-md bg-base-100 px-4 py-2">
      <h1 className="w-1/3 font-medium">{name}</h1>
      <AvatarGroup>
        {avatars.map((member) => (
          <Avatar key={member.id}>
            <Image
              src={member.avatar}
              alt={`${member.firstName}'s avatar`}
              width={24}
              height={24}
            />
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
