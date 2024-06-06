"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import EmptyWidgetContent from "./EmptyWidgetContent";

interface DashboardWidgetProps {
  title: string;
  linkTitle: string;
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
  linkTitle,
  link,
  buttonTitle,
  description,
  children,
}: DashboardWidgetProps) {
  const [linkHovered, setLinkHovered] = useState<boolean>(false);
  const [widgetHovered, setWidgetHovered] = useState<boolean>(false);

  return (
    <div
      className="flex h-full w-full flex-col rounded-lg bg-base-100 p-4 hover:shadow-md"
      onMouseEnter={() => setWidgetHovered(true)}
      onMouseLeave={() => setWidgetHovered(false)}
    >
      <div
        className="inline-flex max-w-[100px] items-start text-neutral-focus"
        onMouseEnter={() => setLinkHovered(true)}
        onMouseLeave={() => setLinkHovered(false)}
      >
        <Link href={link}>
          <p
            className={`relative inline-block cursor-pointer text-[13px] font-semibold hover:text-primary ${
              widgetHovered ? "text-base-300" : "text-neutral-focus"
            }`}
          >
            {linkTitle}
            {linkHovered ? (
              <div className="absolute right-[-15px] top-[4px]">
                <ArrowRightIcon className="ml-1 w-3" />
              </div>
            ) : null}
          </p>
        </Link>
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
  );
}

export default DashboardWidget;
