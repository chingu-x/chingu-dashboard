import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

type SprintItemProps = {
  title: string;
  link: string;
  time: string;
};
function SprintItem({ title, link, time }: SprintItemProps) {
  return (
    <Link href={link} target="_blank">
      <div className="flex flex-row items-center w-full rounded-lg bg-base-100 p-3 my-4 cursor-pointer justify-between">
        <div>
          <time className="text-sm font-medium text-base-300">{time}</time>
          <p className="text-base font-medium max-w-[150px] break-words cursor-pointer">
            {title}
          </p>
        </div>
        <ChevronRightIcon className="w-[15px]" />
      </div>
    </Link>
  );
}

export default SprintItem;
