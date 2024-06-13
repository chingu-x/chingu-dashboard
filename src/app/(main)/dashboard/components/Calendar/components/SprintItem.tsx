import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

type SprintItemProps = {
  title: string;
  link: string;
  time?: string;
  useTargetBlank?: boolean;
};
function SprintItem({
  title,
  link,
  time,
  useTargetBlank = true,
}: SprintItemProps) {
  return (
    <Link href={link} target={useTargetBlank ? "_blank" : ""}>
      <div className="my-4 flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-base-100 p-3">
        <div>
          {time ? (
            <time className="text-sm font-medium text-base-300">{time}</time>
          ) : null}
          <p className="max-w-[150px] cursor-pointer break-words text-base font-medium">
            {title}
          </p>
        </div>
        <ChevronRightIcon className="w-[15px]" />
      </div>
    </Link>
  );
}

export default SprintItem;
