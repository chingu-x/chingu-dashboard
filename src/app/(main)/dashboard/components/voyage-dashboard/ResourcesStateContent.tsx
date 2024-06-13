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
    <div className="flex h-full flex-col justify-center">
      <p className="mb-4 text-xl font-semibold">Recently Shared</p>
      <div className="flex max-h-[200px] w-full flex-col overflow-auto pr-3">
        {contentObject?.map((item) => (
          <div
            key={item.title}
            className="mb-4 flex h-[79px] w-full items-center justify-between rounded-lg bg-base-200 p-4"
          >
            <div className="flex max-w-[400px] flex-col">
              <p className="mb-1 truncate text-base font-semibold">
                {item.title}
              </p>
              <div className="flex">
                <p className="mr-2 text-base font-medium">Shared by</p>
                <Badge
                  title={item.userName}
                  variant="primary"
                  isAvatarBadge={true}
                  avatarUrlImage={item.userImage}
                />
              </div>
            </div>
            <Link href={item.resourceUrl} target="_blank">
              <ArrowTopRightOnSquareIcon className="mr-3 h-6 w-6 text-base-300" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesStateContent;
