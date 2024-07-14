import React from "react";

type TechItem = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  value: string;
};
interface TechStackStateContentProps {
  contentObject?: TechItem[];
}

function TechStackStateContent({ contentObject }: TechStackStateContentProps) {
  return (
    <div className="mt-4 flex h-full flex-col justify-center">
      <div className="flex max-h-[200px] w-full flex-col overflow-auto pr-3">
        {contentObject?.map((item) =>
          item.value ? (
            <div
              key={item.title}
              className="mb-3 flex h-[55px] w-full flex-col rounded-lg bg-base-200 px-3 py-2"
            >
              <div className="flex items-center justify-start gap-x-2">
                <div className="h-3 w-3 text-neutral-focus">
                  {<item.icon />}
                </div>
                <p className="text-[13px] font-medium text-neutral-focus">
                  {item.title}
                </p>
              </div>
              <p className="w-40 truncate text-base font-semibold max-[1469px]:w-[300px] max-[1200px]:w-full">
                {item.value}
              </p>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}

export default TechStackStateContent;
