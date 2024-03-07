import React from "react";
import type { IdeationData } from "./mocks/voyageDashboardData";

interface IdeationStateContentProps {
  contentObject?: IdeationData;
}
function IdeationStateContent({ contentObject }: IdeationStateContentProps) {
  if (!contentObject || Object.keys(contentObject).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row flex-grow max-h-[255px]">
      <div className="flex flex-col gap-y-4 h-full justify-between">
        <p className="text-xl font-semibold">{contentObject?.title}</p>
        <p className="text-base text-neutral-focus font-semibold">
          {contentObject?.topic}
        </p>
        <p className="text-base font-medium overflow-auto">
          {contentObject?.description}
        </p>
      </div>
    </div>
  );
}

export default IdeationStateContent;
