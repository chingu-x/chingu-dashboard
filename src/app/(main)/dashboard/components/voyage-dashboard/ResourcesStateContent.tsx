import React from "react";
import ResourceItem from "./ResourceItem";
import type { ResourcesData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";

interface ResourcesStateContentProps {
  contentObject?: ResourcesData[];
}
function ResourcesStateContent({ contentObject }: ResourcesStateContentProps) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="mb-4 text-xl font-semibold">Recently Shared</p>
      <div className="flex max-h-[200px] w-full flex-col overflow-auto pr-3">
        {contentObject?.map((item) => (
          <ResourceItem
            key={item.title}
            id={Number(item.id)}
            resourceUrl={item.resourceUrl}
            title={item.title}
            userName={item.userName}
            userAvatarUrl={item.userAvatarUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default ResourcesStateContent;
