"use client";

import React, { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Badge from "@/components/badge/BadgeAlt";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface ResourceItemProps {
  id: number;
  title: string;
  userFirstName: string;
  userLastName: string;
  resourceUrl: string;
  userAvatarUrl?: string;
}
function ResourceItem({
  id,
  title,
  userFirstName,
  userLastName,
  resourceUrl,
  userAvatarUrl,
}: ResourceItemProps) {
  const dispatch = useAppDispatch();
  const [widgetHovered, setWidgetHovered] = useState<boolean>(false);

  const openViewModal = (event: React.MouseEvent) => {
    event.stopPropagation();

    const hideResourceModal = localStorage.getItem("hideResourceModal");
    if (hideResourceModal) {
      window.open(resourceUrl, "_blank");
    } else {
      dispatch(
        onOpenModal({
          type: "viewResource",
          id,
        }),
      );
    }
  };

  return (
    <div
      key={title}
      className="mb-4 flex h-[79px] w-full cursor-pointer items-center justify-between rounded-lg bg-base-200 p-4 hover:shadow-md"
      onClick={openViewModal}
      onMouseEnter={() => setWidgetHovered(true)}
      onMouseLeave={() => setWidgetHovered(false)}
    >
      <div className="flex max-w-[400px] flex-col">
        <p className="mb-1 w-[300px] truncate text-base font-semibold max-[1469px]:w-full max-[1200px]:w-56">
          {title}
        </p>
        <div className="flex">
          <p className="mr-2 text-base font-medium">Shared by</p>
          <Badge
            title={`${userFirstName} ${userLastName}`}
            firstName={userFirstName}
            lastName={userLastName}
            avatarUrl={userAvatarUrl}
          />
        </div>
      </div>
      <ArrowTopRightOnSquareIcon
        className={`mr-3 h-6 w-6 text-base-300 ${
          widgetHovered ? "stroke-base-300" : ""
        }`}
      />
    </div>
  );
}

export default ResourceItem;
