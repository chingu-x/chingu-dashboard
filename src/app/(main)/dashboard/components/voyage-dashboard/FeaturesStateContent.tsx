import React from "react";

interface FeaturesStateContentProps {
  contentObject?: string[];
}
function FeaturesStateContent({ contentObject }: FeaturesStateContentProps) {
  return (
    <div className="mt-4 flex h-full flex-col justify-start">
      <div className="flex max-h-[200px] w-full flex-col gap-y-3 overflow-auto pr-3">
        {contentObject?.map((item) => (
          <div
            key={item}
            className="flex items-center rounded-lg bg-base-200 px-3 py-2"
          >
            <p className="w-full break-words font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesStateContent;
