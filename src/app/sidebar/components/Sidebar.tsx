"use client";

import { useState } from "react";
import {
  RectangleGroupIcon,
  ChartBarIcon,
  BookmarkSquareIcon,
  RocketLaunchIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/components";

export default function Sidebar() {
  const [expand, setExpand] = useState(false);

  return (
    <aside
      className={`fixed z-0 top-0 bottom-0 left-0 ${
        expand ? "w-[295px]" : "w-[93px]"
      } text-center bg-white transition-all box-content`}
    >
      <div className="flex flex-col justify-between h-full pt-[64px]">
        <ul
          className={`flex flex-col ${
            expand ? "items-start pl-[40px]" : "items-center"
          } pt-[24px] h-full transition-all`}
        >
          <Button
            title="Dashboard"
            customClassName={`${
              expand
                ? "w-[230px] flex justify-start pl-[24px] transition-all"
                : "w-[50px]"
            } h-[50px] mb-[16px] bg-white text-black capitalize border-none`}
          >
            <RectangleGroupIcon className="h-[18px]" />
            {expand ? "Dashboard" : ""}
          </Button>
          <Button
            title="Assessment"
            customClassName={`${
              expand
                ? "w-[230px] flex justify-start pl-[24px] transition-all"
                : "w-[50px]"
            } h-[50px] mb-[16px] bg-white text-black capitalize border-none`}
          >
            <ChartBarIcon className="h-[18px]" />
            {expand ? "Assessment" : ""}
          </Button>
          <Button
            title="Resources"
            customClassName={`${
              expand
                ? "w-[230px] flex justify-start pl-[24px] transition-all"
                : "w-[50px]"
            } h-[50px] mb-[60px] bg-white text-black capitalize border-none`}
          >
            <BookmarkSquareIcon className="h-[18px]" />
            {expand ? "Resources" : ""}
          </Button>
          <Button
            title="My Voyage"
            customClassName={`${
              expand
                ? "w-[230px] flex justify-start pl-[24px] transition-all"
                : "w-[50px]"
            } h-[50px] bg-white text-black capitalize border-none`}
          >
            <RocketLaunchIcon className="h-[18px]" />
            {expand ? "My Voyage" : ""}
          </Button>
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
      </div>
    </aside>
  );
}
