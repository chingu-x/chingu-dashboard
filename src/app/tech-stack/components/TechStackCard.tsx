import type { TeamTechStackItems } from "./types/types";
import TechStackButton from "./TechStackButton";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";

interface TechStackCardProps {
  title: string;
  data: TeamTechStackItems[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
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
              <Button
                title={title}
                customClassName="capitalize w-[62px] h-[32px] p-0 min-h-full text-xs font-medium text-base-300 bg-primary-content border-transparent mr-4 rounded-[32px] hover:bg-primary hover:border-transparent gap-x-0"
              >
                Vote
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <TechStackButton title={title} />
    </div>
  );
}
