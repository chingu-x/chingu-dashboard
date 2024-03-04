import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface SprintItemProps {
  title: string;
  link: string;
}
function SprintItem({ title, link }: SprintItemProps) {
  return (
    <Link href={link}>
      <div className="flex flex-row items-center w-full rounded-lg bg-base-100 p-3 my-4 cursor-pointer justify-between">
        <p className="text-base font-medium max-w-[150px] break-words cursor-pointer">
          {title}
        </p>
        <ChevronRightIcon className="w-[15px]" />
      </div>
    </Link>
  );
}

export default SprintItem;
