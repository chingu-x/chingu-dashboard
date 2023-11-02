import type { TeamTechStackItems } from "./types/types";
import TechStackButton from "./TechStackButton";
import VoteButton from "./VoteButton";
import Avatar from "@/components/Avatar";

interface TechStackCardProps {
  title: string;
  data: TeamTechStackItems[];
  id: number;
}

export default function TechStackCard({ title, data, id }: TechStackCardProps) {
  return (
    <div className="card min-w-[400px] sm:w-96 text-base-300 bg-base-200 rounded-lg px-6 py-5">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl font-semibold text-base-300 self-center">
          {title}
        </h3>
      </div>
      <div className="h-40 overflow-y-auto mt-6 pt-1">
        <ul className="text-base-300">
          {data.map((element) => (
            <li
              className="text-base mb-5 last:mb-0 relative grid grid-cols-[1fr,auto] items-center"
              key={element.id}
            >
              {element.name}
              <div className="avatar-group -space-x-2 absolute left-28">
                {element.teamTechStackItemVotes.map((user) => (
                  <Avatar key={user.votedBy.member.id} width={24} height={24} />
                ))}
              </div>
              <VoteButton
                title={title}
                id={element.id}
                votedBy={element.teamTechStackItemVotes}
              />
            </li>
          ))}
        </ul>
      </div>
      <TechStackButton title={title} id={id} data={data} />
    </div>
  );
}
