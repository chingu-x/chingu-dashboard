import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { ResourcesData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";
import Badge from "@/components/badge/Badge";

interface ResourcesStateContentProps {
  contentObject?: ResourcesData[];
}
function ResourcesStateContent({ contentObject }: ResourcesStateContentProps) {
  return (
    <div className="flex flex-col h-full justify-center">
      <p className="text-xl font-semibold mb-4">Recently Shared</p>
      <div className="flex flex-col overflow-auto w-full max-h-[200px] pr-3">
        {contentObject?.map((item) => (
          <div
            key={item.title}
            className="h-[79px] bg-base-200 rounded-lg w-full p-4 mb-4 flex justify-between items-center"
          >
            <div className="flex flex-col max-w-[400px]">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold mb-1">
                {item.title}
              </p>
              <div className="flex">
                <p className="font-medium text-base mr-2">Shared by</p>
                <Badge
                  title={item.userName}
                  variant="primary"
                  isAvatarBadge={true}
                  avatarUrlImage={item.userImage}
                />
              </div>
            </div>
            <Link href={item.resourceUrl} target="_blank">
              <ArrowTopRightOnSquareIcon className="w-6 h-6 text-base-300 mr-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesStateContent;
