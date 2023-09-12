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

enum Pages {
  DASHBOARD = "Dashboard",
  ASSESSMENT = "Assessment",
  RESOURCES = "Resources",
  MY_VOYAGE = "My Voyage",
}

export default function Sidebar() {
  const [expand, setExpand] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<Pages>();

  const buttonStyles = `${
    expand
      ? "w-[230px] flex justify-start pl-[24px] transition-all"
      : "w-[50px]"
  } h-[50px] text-black capitalize border-none`;

  const getButtonBackgroundStyle = (page: Pages) =>
    selectedButton === page ? "bg-neutral-content" : "bg-white";

  const getButtonText = (page: Pages) => (expand ? page : "");

  return (
    <aside
      className={`fixed z-0 top-0 bottom-0 left-0 ${
        expand ? "w-[295px]" : "w-[93px]"
      } text-center bg-white transition-all box-content flex flex-col justify-between pt-[64px]`}
    >
      <ul
        className={`flex flex-col ${
          expand ? "items-start pl-[40px]" : "items-center"
        } pt-[24px] h-full transition-all`}
      >
        <Button
          title={Pages.DASHBOARD}
          customClassName={`${buttonStyles} ${getButtonBackgroundStyle(
            Pages.DASHBOARD,
          )} mb-[16px]`}
          onClick={() => setSelectedButton(Pages.DASHBOARD)}
        >
          <RectangleGroupIcon className="h-[18px]" />
          {getButtonText(Pages.DASHBOARD)}
        </Button>
        <Button
          title={Pages.ASSESSMENT}
          customClassName={`${buttonStyles} ${getButtonBackgroundStyle(
            Pages.ASSESSMENT,
          )} mb-[16px]`}
          onClick={() => setSelectedButton(Pages.ASSESSMENT)}
        >
          <ChartBarIcon className="h-[18px]" />
          {getButtonText(Pages.ASSESSMENT)}
        </Button>
        <Button
          title={Pages.RESOURCES}
          customClassName={`${buttonStyles} ${getButtonBackgroundStyle(
            Pages.RESOURCES,
          )} mb-[60px]`}
          onClick={() => setSelectedButton(Pages.RESOURCES)}
        >
          <BookmarkSquareIcon className="h-[18px]" />
          {getButtonText(Pages.RESOURCES)}
        </Button>
        <Button
          title={Pages.MY_VOYAGE}
          customClassName={`${buttonStyles} ${getButtonBackgroundStyle(
            Pages.MY_VOYAGE,
          )}`}
          onClick={() => setSelectedButton(Pages.MY_VOYAGE)}
        >
          <RocketLaunchIcon className="h-[18px]" />
          {getButtonText(Pages.MY_VOYAGE)}
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
    </aside>
  );
}
