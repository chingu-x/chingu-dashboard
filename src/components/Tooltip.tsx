import React, { useState } from "react";
import PropTypes from "prop-types";

interface TooltipProps {
  content: string;
  supportText?: string;
  position: "top" | "bottom" | "left" | "right";
  children: any;
  toolTipWidth: "small" | "medium" | "large";
}

// TODO:
// configure tooltip width on tailwind global for custom uses
// configure tooltip to have a position on tailwind global
// light / dark mode
// style to add support text

const Tooltip = ({
  content,
  supportText,
  position,
  children,
  toolTipWidth,
}: TooltipProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative cursor-pointer border border-red-500`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div
        className={`absolute transition ease-in-out duration-300 z-[2]
        ${hovered ? "opacity-100" : "opacity-0"}
        text-white bg-neutral-content bg-black rounded-md p-2 transform after:absolute after:content-[''] after:border-neutral-content after:border-[7px] after:border-solid
        ${
          toolTipWidth === "small"
            ? "w-[120px]"
            : toolTipWidth === "medium"
              ? "w-[160px]"
              : "w-[300px]"
        }
        
        ${
          position === "top" || position === "bottom"
            ? "-translate-x-1/2 after:border-x-transparent after:-translate-x-1/2 after:left-1/2"
            : "-translate-y-1/2 after:border-y-transparent after:-translate-y-1/2 after:top-1/2"
        }
        ${
          position === "top"
            ? "bottom-[150%] left-1/2 after:top-full after:border-b-transparent"
            : position === "bottom"
              ? "top-[150%] left-1/2 after:bottom-full after:border-t-transparent"
              : position === "right"
                ? "top-1/2 left-[150%] after:right-full after:border-l-transparent"
                : "top-1/2 right-[150%] after:left-full after:border-r-transparent"
        }`}
      >
        <div>{content}</div>
        {supportText && <div>{supportText}</div>}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "right", "left"]).isRequired,
  children: PropTypes.any.isRequired,
};

export default Tooltip;
