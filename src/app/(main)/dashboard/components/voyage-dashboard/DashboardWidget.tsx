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
  data?: unknown; // TODO: need to update this value when we will have data from the backend
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
  data = {},
  children,
}: DashboardWidgetProps) {
  const [linkHovered, setLinkHovered] = useState<boolean>(false);
  const [widgetHovered, setWidgetHovered] = useState<boolean>(false);

  const isEmpty = (obj: unknown): boolean =>
    Object.keys(obj as object).length === 0;

  return (
    <div
      className="rounded-lg bg-base-100 p-4 hover:shadow-md flex flex-col h-full w-full"
      onMouseEnter={() => setWidgetHovered(true)}
      onMouseLeave={() => setWidgetHovered(false)}
    >
      <div
        className="inline-flex items-start text-neutral-focus max-w-[100px]"
        onMouseEnter={() => setLinkHovered(true)}
        onMouseLeave={() => setLinkHovered(false)}
      >
        <Link href={link}>
          <p
            className={`inline-block text-[13px] font-semibold mb-4 hover:text-primary cursor-pointer relative ${
              widgetHovered ? "text-base-300" : "text-neutral-focus"
            }`}
          >
            {linkTitle}
            {linkHovered ? (
              <div className="absolute top-[4px] right-[-15px]">
                <ArrowRightIcon className="w-3 ml-1" />
              </div>
            ) : null}
          </p>
        </Link>
      </div>

      {isEmpty(data) ? (
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
