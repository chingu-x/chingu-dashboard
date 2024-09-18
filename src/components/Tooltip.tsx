"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Position = "top" | "bottom" | "left" | "right";
type TooltipWidth = "small" | "medium" | "large";

export interface TooltipProps {
  content: string;
  supportText?: string;
  position: Position;
  children: React.ReactNode;
  tooltipWidth: TooltipWidth;
  isDisplay: boolean;
  hovered: boolean;
  customClassName?: string;
}

export default function Tooltip({
  content,
  supportText,
  position,
  children,
  tooltipWidth,
  isDisplay,
  hovered,
  customClassName,
}: TooltipProps) {
  let nonSupportTextWidth;

  if (tooltipWidth === "small") {
    nonSupportTextWidth = "w-[138px]";
  } else if (tooltipWidth === "medium") {
    nonSupportTextWidth = "w-[164px]";
  } else {
    nonSupportTextWidth = "w-[169px]";
  }

  return (
    <div className="relative">
      {children}
      <div
        className={cn(
          "absolute z-[2] break-all shadow-md transition duration-300 ease-in-out",
          supportText ? "text-left" : "text-center",
          (!hovered || !isDisplay) && "hidden",
          supportText ? "w-[320px]" : nonSupportTextWidth,
          "rounded-lg bg-base-100 px-3 py-2 text-base-300 after:absolute after:border-8 after:border-solid after:border-base-100 after:content-['']",
          position === "top" || position === "bottom"
            ? "-translate-x-1/2 after:left-1/2 after:-translate-x-1/2 after:border-x-transparent"
            : "-translate-y-1/2 after:top-1/2 after:-translate-y-1/2 after:border-y-transparent",
          position === "top" &&
            "bottom-full left-1/2 -translate-y-3 after:top-full after:border-b-transparent",
          position === "bottom" &&
            "left-1/2 top-full translate-y-3 after:bottom-full after:border-t-transparent",
          position === "right" &&
            "left-full top-1/2 translate-x-3 after:right-full after:border-l-transparent",
          position === "left" &&
            "right-full top-1/2 -translate-x-3 after:left-full after:border-r-transparent",
          customClassName,
        )}
      >
        <div
          className={`${supportText && "mb-2"}`}
          style={{ textWrap: "nowrap" }}
        >
          {content}
        </div>
        {supportText && <div>{supportText}</div>}
      </div>
    </div>
  );
}
