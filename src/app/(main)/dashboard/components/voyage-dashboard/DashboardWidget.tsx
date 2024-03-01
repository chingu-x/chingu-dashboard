import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

interface DashboardWidgetProps {
  title: string;
  link: string;
  buttonTitle: string;
  description: string;
  imageLight?: string;
  imageDark?: string;
}
function DashboardWidget({
  imageLight,
  imageDark,
  title,
  link,
  buttonTitle,
  description,
}: DashboardWidgetProps) {
  return (
    <div className="rounded-lg bg-base-100 p-4">
      <p className="text-[13px] font-semibold text-neutral-focus pb-4">
        {link}
      </p>
      <div className="flex flex-row">
        <div className="flex flex-col gap-y-4">
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-base font-medium">{description}</p>
          <Button variant="outline" className="text-base font-semibold">
            {buttonTitle}
          </Button>
        </div>
        {imageLight && imageDark ? (
          <div className="w-full">
            <div
              data-hide-on-theme="dark"
              className="flex h-[140px] w-full relative shrink-0"
            >
              <Image
                src={imageLight}
                alt="Light pre Voyage image"
                fill={true}
                style={{ objectFit: "contain" }}
                priority={true}
              />
            </div>
            <div
              data-hide-on-theme="light"
              className="flex h-[140px] w-full relative shrink-0"
            >
              <Image
                src={imageDark}
                alt="Light pre Voyage image"
                fill={true}
                style={{ objectFit: "contain" }}
                priority={true}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DashboardWidget;
