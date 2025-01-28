"use client";

import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Badge } from "@chingu-x/components/badge";
import { Avatar } from "@chingu-x/components/avatar";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface ResourceItemProps {
  id: number;
  title: string;
  userName: string;
  resourceUrl: string;
  userAvatarUrl?: string;
}
function ResourceItem({
  id,
  title,
  userName,
  resourceUrl,
  userAvatarUrl,
}: ResourceItemProps) {
  const dispatch = useAppDispatch();

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
    <button
      type="button"
      aria-label="open resource details"
      key={title}
      className="group mb-4 flex w-full cursor-pointer items-center justify-between gap-x-4 rounded-lg bg-base-200 hover:shadow-md"
      onClick={openViewModal}
    >
      <div className="flex flex-col p-4">
        <p className="mb-1 text-left text-base font-semibold">{title}</p>
        <div className="flex">
          <p className="mr-2 text-base font-medium">Shared by</p>
          {/* TO DO: replace undefined with default avatar when it is ready. */}
          <Badge title={userName}>
            {userAvatarUrl ? (
              <Avatar customClassName="h-4 w-4">
                <Image
                  src={userAvatarUrl}
                  alt={`${userName}'s avatar`}
                  width={16}
                  height={16}
                />
              </Avatar>
            ) : undefined}
          </Badge>
        </div>
      </div>
      <ArrowTopRightOnSquareIcon className="m-7 h-6 w-6 shrink-0 text-base-300 group-hover:stroke-base-300" />
    </button>
  );
}

export default ResourceItem;
