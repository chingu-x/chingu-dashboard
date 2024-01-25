"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Position = "top" | "bottom" | "left" | "right";
type TooltipWidth = "small" | "medium" | "large";

export interface TooltipProps {
  content: string;
  supportText?: string;
  position: Position;
  children: React.ReactNode;
  tooltipWidth: TooltipWidth;
}

export default function Tooltip({
  content,
  supportText,
  position,
  children,
  tooltipWidth,
}: TooltipProps) {
  const [hovered, setHovered] = useState(false);

  let nonSupportTextWidth;

  if (tooltipWidth === "small") {
    nonSupportTextWidth = "w-[138px]";
  } else if (tooltipWidth === "medium") {
    nonSupportTextWidth = "w-[164px]";
  } else {
    nonSupportTextWidth = "w-[169px]";
  }

  const tooltipPositionStyling =
    position === "top" || position === "bottom"
      ? "-translate-x-1/2 after:border-x-transparent after:-translate-x-1/2 after:left-1/2"
      : "-translate-y-1/2 after:border-y-transparent after:-translate-y-1/2 after:top-1/2";

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div
        className={cn(
          "absolute transition shadow-md ease-in-out duration-300 z-[2] break-all",
          supportText ? "text-left" : "text-center",
          hovered ? "opacity-100" : "opacity-0",
          supportText ? "w-[320px]" : nonSupportTextWidth,
          "text-base-300 bg-base-100 rounded-lg py-2 px-3 after:absolute after:content-[''] after:border-base-100 after:border-8 after:border-solid",
          tooltipPositionStyling,
          position === "top" &&
            "bottom-full left-1/2 -translate-y-3 after:top-full after:border-b-transparent",
          position === "bottom" &&
            "top-full left-1/2 translate-y-3 after:bottom-full after:border-t-transparent",
          position === "right" &&
            "top-1/2 left-full translate-x-3 after:right-full after:border-l-transparent",
          position === "left" &&
            "top-1/2 right-full -translate-x-3 after:left-full after:border-r-transparent"
        )}
      >
        <div className={`${supportText && "mb-2"}`}>{content}</div>
        {supportText && <div>{supportText}</div>}
      </div>
    </div>
  );
}
