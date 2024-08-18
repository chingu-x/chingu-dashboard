"use client";

import React, { useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import EmptyWidgetContent from "./EmptyWidgetContent";

interface DashboardWidgetProps {
  title: string;
  headerTitle: string;
  link: string;
  buttonTitle: string;
  description: string;
  imageLight?: string;
  imageDark?: string;
  children?: React.ReactNode;
}
function DashboardWidget({
  imageLight,
  imageDark,
  title,
  headerTitle,
  link,
  buttonTitle,
  description,
  children,
}: DashboardWidgetProps) {
  const [widgetHovered, setWidgetHovered] = useState<boolean>(false);
  const router = useRouter();

  const isWidgetClickable = widgetHovered && children;

  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!children) return;
    router.push(link);
  };

  return (
    <div
      onClick={handleLinkClick}
      className={`w-full ${isWidgetClickable ? "cursor-pointer" : ""}`}
    >
      <div
        className={`flex h-full w-full flex-col rounded-lg bg-base-100 p-4 ${
          isWidgetClickable ? "hover:shadow-md" : ""
        }`}
        onMouseEnter={() => setWidgetHovered(true)}
        onMouseLeave={() => setWidgetHovered(false)}
      >
        <div className="inline-flex max-w-[100px] items-start text-neutral-focus">
          <p
            className={`relative inline-block text-[13px] font-semibold ${
              isWidgetClickable
                ? "cursor-pointer text-primary"
                : "text-neutral-focus"
            }`}
          >
            {headerTitle}
            {isWidgetClickable ? (
              <div className="absolute right-[-15px] top-[4px]">
                <ChevronDoubleRightIcon className="ml-1 w-3" />
              </div>
            ) : null}
          </p>
        </div>

        {!children ? (
          <EmptyWidgetContent
            title={title}
            description={description}
            link={link}
            buttonTitle={buttonTitle}
            imageLight={imageLight}
            imageDark={imageDark}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}

export default DashboardWidget;
