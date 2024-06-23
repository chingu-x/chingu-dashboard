"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useAuth, useUser } from "@/store/hooks";
import routePaths from "@/utils/routePaths";

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
  "aria-label": string;
};

const pagesProperties: PageProperty[] = [
  {
    name: MainPages.dashboard,
    marginBottom: "mb-4",
    icon: <RectangleGroupIcon className="h-[1.125rem]" />,
    link: routePaths.dashboardPage(),
    "aria-label": "Dashboard Page",
  },
  {
    name: MainPages.assessment,
    marginBottom: "mb-4",
    icon: <ChartBarIcon className="h-[1.125rem]" />,
    link: "/assessment",
    "aria-label": "Assessment Page",
  },
  {
    name: MainPages.resources,
    marginBottom: "mb-[3.75rem]",
    icon: <BookmarkSquareIcon className="h-[1.125rem]" />,
    link: "/resources",
    "aria-label": "Resources Page",
  },
  {
    name: MainPages.myVoyage,
    marginBottom: "mb-4",
    icon: <RocketLaunchIcon className="h-[1.125rem]" />,
    link: "",
    "aria-label": "Voyage Main Page",
  },
];

export default function Sidebar() {
  const currentPath = usePathname();

  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState<string>(currentPath);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const { voyageTeamMembers } = useUser();

  const isActive = useMemo(() => {
    if (voyageTeamMembers.length === 0) {
      return false;
    }
    return voyageTeamMembers.some(
      (member) => member.voyageTeam.voyage.status.name === "Active",
    );
  }, [voyageTeamMembers]);

  const isVoyageStarted: boolean = isAuthenticated && isActive;

  const currentVoyageTeam = voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
  );

  const teamId = currentVoyageTeam?.voyageTeamId.toString();

  const voyagePages: VoyagePageProperty[] = [
    {
      name: VoyagePages.directory,
      link: routePaths.directoryPage(teamId!),
    },
    {
      name: VoyagePages.techStack,
      link: routePaths.techStackPage(teamId!),
    },
    {
      name: VoyagePages.ideation,
      link: routePaths.ideationPage(teamId!),
    },
    {
      name: VoyagePages.features,
      link: routePaths.featuresPage(teamId!),
    },
    {
      name: VoyagePages.sprints,
      link: routePaths.sprintsPage(teamId!),
    },
    {
      name: VoyagePages.resources,
      link: routePaths.voyageResourcesPage(teamId!),
    },
  ];

  useEffect(() => {
    setSelectedButton(currentPath);
  }, [currentPath]);

  const handlePageClick = useCallback(
    (element: PageProperty | string) => {
      if (typeof element !== "string" && element.name === MainPages.myVoyage) {
        setIsOpenSidebar(true);
      } else if (typeof element !== "string") {
        setSelectedButton(element.link);
      }
    },
    [setSelectedButton, setIsOpenSidebar],
  );

  return (
    <aside
      className={`${
        isOpenSidebar ? "w-[18.438rem]" : "w-[5.813rem]"
      } flex h-full flex-col justify-between border-r border-neutral-content bg-base-200 text-center shadow-[4px_4px_4px_0] shadow-neutral-focus/5`}
    >
      <div
        className={`flex flex-col ${
          isOpenSidebar ? "items-start pl-10" : "items-center"
        } pt-6`}
      >
        <ul>
          {pagesProperties.map((element) => (
            <PageButton
              key={element.name}
              element={element}
              onClick={handlePageClick}
              selectedButton={selectedButton}
              isOpen={isOpenSidebar}
              link={element.link}
              setHoveredButton={setHoveredButton}
              voyagePages={voyagePages}
              ariaLabel={element["aria-label"]}
            />
          ))}
        </ul>

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
      </div>
      <div className="flex min-h-[80px] flex-col items-end justify-start border-t border-neutral-content pr-6 pt-4">
        <ExpandButton isOpen={isOpenSidebar} onClick={setIsOpenSidebar} />
      </div>
    </aside>
  );
}
