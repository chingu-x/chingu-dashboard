import React, { useState } from "react";
import PropTypes from "prop-types";

interface TooltipProps {
  content: string;
  supportText?: string;
  // position: "top" | "bottom" | "left" | "right";
  position: any;
  children: any;
  // tooltipWidth: "small" | "medium" | "large";
  tooltipWidth: any;
}

const Tooltip = ({
  content,
  supportText,
  position,
  children,
  tooltipWidth,
}: TooltipProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div
        className={`absolute transition ease-in-out duration-300 z-[2] break-all 
        ${supportText && "text-left"}
        ${hovered ? "opacity-100" : "opacity-0"}
        text-base-300 bg-base-100 rounded-lg py-2 px-3 after:absolute after:content-[''] after:border-base-100 after:border-8 after:border-solid
        ${
          supportText
            ? "w-[320px]"
            : tooltipWidth === "small"
              ? "w-[138px]"
              : tooltipWidth === "medium"
                ? "w-[164px]"
                : "w-[169px]"
        }
        
        ${
          position === "top" || position === "bottom"
            ? "-translate-x-1/2 after:border-x-transparent after:-translate-x-1/2 after:left-1/2"
            : "-translate-y-1/2 after:border-y-transparent after:-translate-y-1/2 after:top-1/2"
        }
        ${
          position === "top"
            ? "bottom-full left-1/2 -translate-y-3 after:top-full after:border-b-transparent"
            : position === "bottom"
              ? "top-full left-1/2 translate-y-3 after:bottom-full after:border-t-transparent"
              : position === "right"
                ? "top-1/2 left-full translate-x-3 after:right-full after:border-l-transparent"
                : "top-1/2 right-full -translate-x-3 after:left-full after:border-r-transparent"
        }`}
      >
        <div className={`${supportText && "pb-2"}`}>{content}</div>
        {supportText && <div>{supportText}</div>}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  // position: PropTypes.oneOf(["top", "bottom", "right", "left"]).isRequired,
  position: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  supportText: PropTypes.string.isRequired,
  tooltipWidth: PropTypes.number,
};

export default Tooltip;
