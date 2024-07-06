import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

type EventItemProps = {
  title?: string;
  link?: string;
  time?: string;
  useTargetBlank?: boolean;
  isDisabled?: boolean;
};
function SprintItem({
  title,
  link,
  time,
  useTargetBlank = true,
  isDisabled = false,
}: EventItemProps) {
  if (link) {
    return (
      <Link
        href={isDisabled ? "#" : link}
        target={useTargetBlank ? "_blank" : ""}
        onClick={(e) => isDisabled && e.preventDefault()}
      >
        <div className="my-4 flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-base-100 p-3">
          <div>
            {time ? (
              <time
                className={`text-sm font-medium text-base-300 ${
                  isDisabled ? "text-neutral" : ""
                }`}
              >
                {time}
              </time>
            ) : null}
            <p
              className={`max-w-[150px] cursor-pointer break-words text-base font-medium ${
                isDisabled ? "text-neutral" : ""
              }`}
            >
              {title}
            </p>
          </div>
          <ChevronRightIcon
            className={`w-[15px] ${isDisabled ? "text-neutral" : ""}`}
          />
        </div>
      </Link>
    );
  }
  return (
    <p className="mt-4 w-full rounded-lg bg-primary-content p-3 text-base font-medium">
      {title}
    </p>
  );
}

export default SprintItem;
