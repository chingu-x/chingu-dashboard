import React from "react";
import "./tooltip.css";

interface TooltipProps {
  /**
   * Where to position the tooltip
   */
  position: "top" | "left" | "right" | "bottom";

  /**
   * What is the tooltip referring to?
   */
  children: any;

  /**
   * Tooltip content
   */
  content: string;

  /**
   * Option to add more information to the tooltip content
   */
  supportText?: string;

  /**
   * Width of tooltip
   */
  tooltipWidth: string;
}
/**
 * Primary UI component for user interaction
 */
export function Tooltip({
  position = "right",
  children,
  content = "This is a tooltip",
  supportText,
  tooltipWidth = "small",
}: TooltipProps) {
  return (
    <div
      className={`storybook-tooltip storybook-tooltip-${position}`}
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div
        className={`storybook-tooltip-content
                    
        ${supportText && "text-left"}
        text-base-300 bg-base-100 after:border-base-100
        ${
          supportText
            ? "w-[320px]"
            : tooltipWidth === "small"
              ? "w-[138px]"
              : tooltipWidth === "medium"
                ? "w-[164px]"
                : "w-[169px]"
        }
        `}
      >
        <div className={`${supportText && "pb-2"}`}>{content}</div>
        {supportText && <div>{supportText}</div>}
      </div>
    </div>
  );
}

// go back for later: hover functionality
