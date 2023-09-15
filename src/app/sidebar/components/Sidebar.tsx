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
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Button } from "@/components";

type PageProperty = {
  name: string;
  marginBottom: string;
  icon: JSX.Element;
};

const pagesProperties: PageProperty[] = [
  {
    name: "Dashboard",
    marginBottom: "mb-4",
    icon: <RectangleGroupIcon className="h-[1.125rem]" />,
  },
  {
    name: "Assessment",
    marginBottom: "mb-4",
    icon: <ChartBarIcon className="h-[1.125rem]" />,
  },
  {
    name: "Resources",
    marginBottom: "mb-[3.75rem]",
    icon: <BookmarkSquareIcon className="h-[1.125rem]" />,
  },
  {
    name: "My Voyage",
    marginBottom: "mb-4",
    icon: <RocketLaunchIcon className="h-[1.125rem]" />,
  },
];

const voyagePages: string[] = [
  "Directory",
  "Tech Stack",
  "Ideation",
  "Features",
  "Sprints",
  "Resources",
];

const voyageStarted: boolean = true;

const voyageData = {
  tier: "Tier 3",
  team: "Team",
  voyage: "V29",
};

export default function Sidebar() {
  const [expand, setExpand] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const buttonStyles = `${
    expand
      ? "w-[14.375rem] flex justify-start pl-6 transition-all"
      : "w-[3.125rem]"
  } h-[3.125rem] text-black capitalize border-none`;

  const getButtonBackgroundStyle = (page: string) =>
    selectedButton === page ? "bg-neutral-content" : "bg-white";

  const getButtonText = (page: string) => (expand ? page : "");

  return (
    <aside
      className={`fixed z-0 top-0 bottom-0 left-0 ${
        expand ? "w-[18.4375rem]" : "w-[5.8125rem]"
      } text-center bg-white transition-all box-content flex flex-col justify-between pt-16`}
    >
      <ul
        className={`flex flex-col ${
          expand ? "items-start pl-10" : "items-center"
        } pt-6  transition-all`}
      >
        {pagesProperties.map((element) => (
          <li key={element.name}>
            <Link href={`/${element.name.toLowerCase()}`}>
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
            </Link>
          </li>
        ))}
        {expand && (
          <ul className="flex flex-col items-center">
            {voyagePages.map((element) => (
              <li key={element} className="h-7">
                <Link href={"#"}>
                  <Button
                    title={element}
                    customClassName={`bg-transparent hover:bg-transparent w-[9.375rem] h-[1.1875rem] min-h-0 mb-2.5 flex justify-start ${
                      voyageStarted ? "pl-11" : "pl-6"
                    } transition-all text-neutral-focus capitalize border-none`}
                    onMouseEnter={() => setHoveredButton(element)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => voyageStarted && setSelectedButton(element)}
                  >
                    {!voyageStarted && (
                      <LockClosedIcon className="h-[1.125rem]" />
                    )}
                    {voyageStarted &&
                      (hoveredButton === element ||
                        selectedButton === element) && (
                      <ArrowRightCircleIcon className="h-[1.125rem]" />
                    )}
                    {element}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ul>
      <div className="flex-grow flex flex-col justify-end">
        {expand && (
          <div className="w-[13.4375rem] h-[9.6875rem] bg-secondary-content rounded-2xl mx-auto px-6 py-4 mb-16 transition-all">
            <h3 className="text-black text-xl font-semibold text-left">
              Voyage Status
            </h3>
            {voyageStarted ? (
              Object.values(voyageData).map((element) => (
                <p
                  key={element}
                  className="mt-[0.6875rem] h-[1.1875rem] text-black text-base font-medium text-left"
                >
                  {element}
                </p>
              ))
            ) : (
              <p className="mt-[0.6875rem] text-black text-base font-medium text-left">
                Please join a voyage to see your status information.
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end justify-start border-t border-secondary-focus h-20">
        <Button
          title="Expand"
          customClassName="w-[3.125rem]
             bg-white text-black capitalize hover:bg-white mr-2 border-none"
          onClick={() => setExpand(!expand)}
        >
          {expand ? (
            <ArrowLeftOnRectangleIcon className="h-6" />
          ) : (
            <ArrowRightOnRectangleIcon className="h-6" />
          )}
        </Button>
      </div>
    </aside>
  );
}
