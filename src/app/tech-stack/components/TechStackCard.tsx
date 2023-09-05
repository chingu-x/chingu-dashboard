import { TechItem } from "./fixtures/TechStack";
import { Avatar, EditButton } from "@/components";

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
        <EditButton title={title} />
      </div>
      <div className="h-40 overflow-y-auto mx-5 mt-6 mb-5">
        <ul className="text-black">
          {data.map((element) => (
            <li
              className="text-base mb-5 last:mb-0 relative grid grid-cols-[1fr,auto] items-center"
              key={element.id}
            >
              {element.value}
              <div className="avatar-group -space-x-2 absolute left-28">
                {element.users.map((user) => (
                  <Avatar key={`${element.id}-${user}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
