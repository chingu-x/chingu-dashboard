import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TechItem } from "./fixtures/TechStack";
import { Avatar, Button } from "@/components";

interface TechStackCardProps {
  title: string;
  data: TechItem[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
  return (
    <div className="card w-72 sm:w-96 text-black bg-white rounded-lg">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl font-semibold text-black mt-5 ml-5 self-center">
          {title}
        </h3>
        <Button
          title={`edit ${title}`}
          customClassName="mt-5 mr-5 capitalize w-16 h-8 p-0 min-h-full text-sm font-semibold text-black bg-secondary border-transparent"
        >
          <PencilSquareIcon className="h-4 w-4 text-black" />
          Edit
        </Button>
      </div>
      <div className="h-40 overflow-y-auto mx-5 mt-6 mb-5 pt-1">
        <ul className="text-black">
          {data.map((element) => (
            <li
              className="text-base mb-5 last:mb-0 relative grid grid-cols-[1fr,auto] items-center"
              key={element.id}
            >
              {element.value}
              <div className="avatar-group -space-x-2 absolute left-28">
                {element.users.map((user) => (
                  <Avatar key={`${element.id}-${user}`} image="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" width={24} height={24} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
