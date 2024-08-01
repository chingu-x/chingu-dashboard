import React from "react";
import ResourceItem from "./ResourceItem";

type ResourceItemData = {
  id: number;
  title: string;
  resourceUrl: string;
  userFirstName: string;
  userLastName: string;
  userAvatarUrl: string;
};

interface ResourcesStateContentProps {
  contentObject?: ResourceItemData[];
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
            userFirstName={item.userFirstName}
            userLastName={item.userLastName}
            userAvatarUrl={item.userAvatarUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default ResourcesStateContent;
