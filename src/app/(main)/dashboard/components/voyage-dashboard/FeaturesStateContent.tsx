import React from "react";

interface FeaturesStateContentProps {
  contentObject?: string[];
}
function FeaturesStateContent({ contentObject }: FeaturesStateContentProps) {
  if (!contentObject || contentObject.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-auto w-full max-h-[200px] pr-3">
      {contentObject.map((item) => (
        <p
          key={item}
          className="bg-base-200 rounded-lg h-[35px] w-full px-3 py-2 mb-3 flex items-center"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default FeaturesStateContent;
