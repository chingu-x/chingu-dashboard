import React from "react";
import type { TechStackData } from "./mocks/voyageDashboardData";

interface TechStackStateContentProps {
  contentObject?: TechStackData[];
}

function TechStackStateContent({ contentObject }: TechStackStateContentProps) {
  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex flex-col overflow-auto w-full max-h-[200px] pr-3">
        {contentObject?.map((item) => (
          <div
            key={item.title}
            className="h-[55px] bg-base-200 rounded-lg w-full px-3 py-2 mb-3 flex flex-col"
          >
            <div className="flex items-center justify-start gap-x-2">
              <div className="h-3 w-3 text-neutral-focus">{<item.icon />}</div>
              <p className="text-[13px] font-medium text-neutral-focus">
                {item.title}
              </p>
            </div>
            <p className="text-base font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStackStateContent;
