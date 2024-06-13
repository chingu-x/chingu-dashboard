import React from "react";

interface FeaturesStateContentProps {
  contentObject?: string[];
}
function FeaturesStateContent({ contentObject }: FeaturesStateContentProps) {
  return (
    <div className="mt-4 flex h-full flex-col justify-center">
      <div className="flex max-h-[200px] w-full flex-col overflow-auto pr-3">
        {contentObject?.map((item) => (
          <p
            key={item}
            className="mb-3 flex h-[35px] w-full items-center rounded-lg bg-base-200 px-3 py-2"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FeaturesStateContent;
