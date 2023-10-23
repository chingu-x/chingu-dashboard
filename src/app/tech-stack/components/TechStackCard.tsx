"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import type { TechItem } from "./fixtures/TechStack";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";

interface TechStackCardProps {
  title: string;
  data: TechItem[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
  const dispatch = useAppDispatch();

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
      <Button
        title={`add ${title}`}
        customClassName="mt-6 capitalize w-full h-[42px] p-0 min-h-full text-xs font-medium text-base-300 bg-secondary border-transparent flex justify-start pl-5 items-center hover:bg-secondary hover:border-transparent"
        onClick={() => dispatch(onOpen({ type: "TechStackModal" }))}
      >
        <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
        Add Tech Stack
      </Button>
    </div>
  );
}
