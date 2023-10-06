import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { TechItem } from ".";
import { Avatar, Button } from "@/components";

interface TechStackCardProps {
  title: string;
  data: TechItem[];
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
              {element.value}
              <div className="avatar-group -space-x-2 absolute left-28">
                {element.users.map((user) => (
                  <Avatar
                    key={`${element.id}-${user}`}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        title={`edit ${title}`}
        customClassName="mt-6 capitalize w-full h-[42px] p-0 min-h-full text-xs font-medium text-base-300 bg-secondary border-transparent flex justify-start pl-5 items-center"
      >
        <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
        Add Tech Stack
      </Button>
    </div>
  );
}
