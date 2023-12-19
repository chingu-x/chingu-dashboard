import { PlusCircleIcon } from "@heroicons/react/24/outline";
import type { TechItem } from "./fixtures/TechStack";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";

interface TechStackCardProps {
  title: string;
  data: TechItem[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
  return (
    <div className="card min-w-[400px] sm:w-96 text-base-300 bg-base-200 rounded-lg px-6 py-5">
      <div className="flex flex-row justify-between">
        <h3 className="self-center text-xl font-semibold text-base-300">
          {title}
        </h3>
      </div>
      <div className="h-40 pt-1 mt-6 overflow-y-auto">
        <ul className="text-base-300">
          {data.map((element) => (
            <li
              className="text-base mb-5 last:mb-0 relative grid grid-cols-[1fr,auto] items-center"
              key={element.id}
            >
              {element.value}
              <div className="absolute -space-x-2 avatar-group left-28">
                {element.users.map((user) => (
                  <Avatar
                    key={`${element.id}-${user}`}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
              <button className="capitalize w-[62px] h-[32px] p-0 min-h-full text-xs font-medium text-base-300 bg-primary-content border-transparent mr-4 rounded-[32px] hover:bg-primary hover:border-transparent gap-x-0">
                Vote
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Button variant="secondary" className="justify-start w-full">
        <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
        Add Tech Stack
      </Button>
    </div>
  );
}
