import { frontend } from "./fixtures/TechStackCard";
import { Avatar } from "@/components";

interface TechStackCardProps {
  title: string
}

export default function TechStackCard({ title }: TechStackCardProps) {
  return (
    <div className="card w-96 text-primary-content bg-neutral-100 rounded-lg">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl font-semibold text-neutral-900 mt-5 ml-5 self-center">
          {title}
        </h3>
        <button
          type="button"
          className="btn mt-5 mr-5 capitalize w-16 h-8 min-h-full text-sm font-semibold text-neutral-500 bg-white border-transparent"
          aria-label={`Edit ${title}`}
        >
          Edit
        </button>
      </div>
      <div className="h-40 overflow-y-auto mx-5 mt-6 mb-5">
        <ul className="text-neutral-900 last:mb-0">
          {frontend.map((element) => (
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
