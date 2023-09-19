"use client";

import { useState } from "react";
import {
  RectangleGroupIcon,
  ChartBarIcon,
  BookmarkSquareIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import PageButton from "./PageButton";
import VoyagePageButton from "./VoyagePageButton";
import VoyageStatus from "./VoyageStatus";
import ExpandButton from "./ExpandButton";

export type PageProperty = {
  name: string;
  marginBottom: string;
  icon: JSX.Element;
};

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

const pagesProperties: PageProperty[] = [
  {
    name: MainPages.dashboard,
    marginBottom: "mb-4",
    icon: <RectangleGroupIcon className="h-[1.125rem]" />,
  },
  {
    name: MainPages.assessment,
    marginBottom: "mb-4",
    icon: <ChartBarIcon className="h-[1.125rem]" />,
  },
  {
    name: MainPages.resources,
    marginBottom: "mb-[3.75rem]",
    icon: <BookmarkSquareIcon className="h-[1.125rem]" />,
  },
  {
    name: MainPages.myVoyage,
    marginBottom: "mb-4",
    icon: <RocketLaunchIcon className="h-[1.125rem]" />,
  },
];

//-- Mocked fake data just for testing purpose --//
const isVoyageStarted: boolean = true;
const voyageData = {
  tier: "Tier 3",
  team: "Team",
  voyage: "V29",
};
//-- --//

export default function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handlePageClick = (element: PageProperty | string) => {
    if (typeof element === "string") {
      setSelectedButton(element);
      setIsOpenSidebar(false);
    } else if ((element.name as MainPages) === MainPages.myVoyage) {
      setSelectedButton(element.name);
      setIsOpenSidebar(true);
    } else {
      setSelectedButton(element.name);
      setIsOpenSidebar(false);
    }
  };

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-theme(spacing.16))] w-[15%] ${
        isOpenSidebar ? "w-[15%]" : "w-[6%]"
      } text-center bg-white flex flex-col justify-between pt-16`}
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
          />
        ))}
        {isOpenSidebar && (
          <ul className="flex flex-col items-center">
            {Object.values(VoyagePages).map((element) => (
              <VoyagePageButton
                key={element}
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
      <div className="flex-grow flex flex-col justify-end">
        {isOpenSidebar && (
          <VoyageStatus
            isVoyageStarted={isVoyageStarted}
            voyageData={voyageData}
          />
        )}
      </div>
      <div className="flex flex-col items-end justify-start border-t border-secondary-focus h-20">
        <ExpandButton isOpen={isOpenSidebar} onClick={setIsOpenSidebar} />
      </div>
    </aside>
  );
}
