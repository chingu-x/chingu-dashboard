"use client";

import { useState } from "react";
import {
  RectangleGroupIcon,
  ChartBarIcon,
  BookmarkSquareIcon,
  RocketLaunchIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/components";

const pagesProperties = [
  {
    name: "Dashboard",
    marginBottom: "mb-[16px]",
    icon: <RectangleGroupIcon className="h-[18px]" />
  },
  {
    name: "Assessment",
    marginBottom: "mb-[16px]",
    icon: <ChartBarIcon className="h-[18px]" />
  },
  {
    name: "Resources",
    marginBottom: "mb-[60px]",
    icon: <BookmarkSquareIcon className="h-[18px]" />
  },
  {
    name: "My Voyage",
    marginBottom: "mb-[20px]",
    icon: <RocketLaunchIcon className="h-[18px]" />
  },
];

const voyagePages = [
  "Directory",
  "Tech Stack",
  "Ideation",
  "Features",
  "Sprints",
  "Resources",
];

export default function Sidebar() {
  const [expand, setExpand] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>();

  const buttonStyles = `${
    expand
      ? "w-[230px] flex justify-start pl-[24px] transition-all"
      : "w-[50px]"
  } h-[50px] text-black capitalize border-none`;

  const getButtonBackgroundStyle = (page: string) =>
    selectedButton === page ? "bg-neutral-content" : "bg-white";

  const getButtonText = (page: string) => (expand ? page : "");

  return (
    <aside
      className={`fixed z-0 top-0 bottom-0 left-0 ${
        expand ? "w-[295px]" : "w-[93px]"
      } text-center bg-white transition-all box-content flex flex-col justify-between pt-[64px]`}
    >
      <ul
        className={`flex flex-col ${
          expand ? "items-start pl-[40px]" : "items-center"
        } pt-[24px]  transition-all`}
      >
        {pagesProperties.map((element) =>
          <li key={element.name}>
            <Button
              title={element.name}
              customClassName={`${buttonStyles} ${getButtonBackgroundStyle(
                element.name,
              )} ${element.marginBottom}`}
              onClick={() => setSelectedButton(element.name)}
            >
              {element.icon}
              {getButtonText(element.name)}
            </Button>
          </li>
        )}
        {expand && (
          <ul className="flex flex-col items-center">
            {voyagePages.map((element) => (
              <li key={element} className="h-[28px]">
                <Button
                  title={element}
                  customClassName="bg-transparent hover:bg-transparent w-[150px] h-[28px] min-h-0 mb-[10px] flex justify-start pl-[24px] transition-all text-black capitalize border-none"
                >
                  <LockClosedIcon className="h-[18px]" />
                  {element}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </ul>
      <div className="flex flex-col items-end justify-start border-t border-secondary-focus h-[80px]">
        <Button
          title="Expand"
          customClassName="w-[50px]
             bg-white text-black capitalize hover:bg-white mr-[8px] border-none"
          onClick={() => setExpand(!expand)}
        >
          {expand ? (
            <ArrowLeftOnRectangleIcon className="h-[24px]" />
          ) : (
            <ArrowRightOnRectangleIcon className="h-[24px]" />
          )}
        </Button>
      </div>
    </aside>
  );
}
