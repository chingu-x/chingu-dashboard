"use client";

import { useState } from "react";
import type React from "react";
import { usePathname } from "next/navigation";
import {
  RectangleGroupIcon,
  ChartBarIcon,
  BookmarkSquareIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import PageButton from "./PageButton";
import VoyagePageButton from "./VoyagePageButton";
import ExpandButton from "./ExpandButton";

export enum MainPages {
  dashboard = "Dashboard",
  assessment = "Assessment",
  resources = "Resources",
  myVoyage = "My Voyage",
}

export enum VoyagePages {
  directory = "Directory",
  techStack = "Tech Stack",
  ideation = "Ideation",
  features = "Features",
  sprints = "Sprints",
  resources = "Resources",
}

export type VoyagePageProperty = {
  name: string;
  link: string;
};

export type PageProperty = {
  name: MainPages;
  marginBottom: string;
  icon: React.JSX.Element;
  link: string;
};

export const voyagePages: VoyagePageProperty[] = [
  {
    name: VoyagePages.directory,
    link: "/directory",
  },
  {
    name: VoyagePages.techStack,
    link: "/tech-stack",
  },
  {
    name: VoyagePages.ideation,
    link: "/ideation",
  },
  {
    name: VoyagePages.features,
    link: "/features",
  },
  {
    name: VoyagePages.sprints,
    link: "/sprints",
  },
  {
    name: VoyagePages.resources,
    link: "/voyage-resources",
  },
];

const pagesProperties: PageProperty[] = [
  {
    name: MainPages.dashboard,
    marginBottom: "mb-4",
    icon: <RectangleGroupIcon className="h-[1.125rem]" />,
    link: "/",
  },
  {
    name: MainPages.assessment,
    marginBottom: "mb-4",
    icon: <ChartBarIcon className="h-[1.125rem]" />,
    link: "/assessment",
  },
  {
    name: MainPages.resources,
    marginBottom: "mb-[3.75rem]",
    icon: <BookmarkSquareIcon className="h-[1.125rem]" />,
    link: "/resources",
  },
  {
    name: MainPages.myVoyage,
    marginBottom: "mb-4",
    icon: <RocketLaunchIcon className="h-[1.125rem]" />,
    link: "",
  },
];

//-- Mocked fake data just for testing purpose --//
const isVoyageStarted: boolean = true;
//-- --//

export default function Sidebar() {
  const currentPath = usePathname();

  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState<string>(currentPath);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handlePageClick = (element: PageProperty | string) => {
    if (typeof element === "string") {
      setSelectedButton(element);
      setIsOpenSidebar(false);
    } else if (element.name === MainPages.myVoyage) {
      setIsOpenSidebar(true);
    } else {
      setSelectedButton(element.link);
      setIsOpenSidebar(false);
    }
  };

  return (
    <aside
      className={`overflow-y-auto ${
        isOpenSidebar ? "w-[18.438rem]" : "w-[5.813rem]"
      } text-center bg-base-200 flex flex-col justify-between border-r border-neutral-content shadow-[4px_4px_4px_0] shadow-neutral-focus/30`}
    >
      <ul
        className={`flex flex-col ${
          isOpenSidebar ? "items-start pl-10" : "items-center"
        } pt-6`}
      >
        {pagesProperties.map((element) => (
          <PageButton
            key={element.name}
            element={element}
            onClick={handlePageClick}
            selectedButton={selectedButton}
            isOpen={isOpenSidebar}
            link={element.link}
            setHoveredButton={setHoveredButton}
          />
        ))}
        {isOpenSidebar && (
          <ul className="flex flex-col items-center">
            {voyagePages.map((element) => (
              <VoyagePageButton
                key={element.name}
                element={element}
                onClick={handlePageClick}
                hoveredButton={hoveredButton}
                selectedButton={selectedButton}
                isVoyageStarted={isVoyageStarted}
                setHoveredButton={setHoveredButton}
              />
            ))}
          </ul>
        )}
      </ul>
      <div className="flex flex-col items-end justify-start border-t border-neutral-content">
        <ExpandButton isOpen={isOpenSidebar} onClick={setIsOpenSidebar} />
      </div>
    </aside>
  );
}
