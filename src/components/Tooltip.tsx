import React, { useState } from "react";
import PropTypes from "prop-types";

interface TooltipProps {
  content: string;
  position: "top" | "bottom" | "left" | "right";
  children: any;
  toolTipWidth: "small" | "medium" | "large";
}

// ${hovered ? "opacity-100 visible" : " opacity-0 hidden"}

// TODO:
// configure tooltip width on tailwind global for custom uses
// light / dark mode
// create arrow tip

const Tooltip = ({
  content,
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
        className={`absolute transition-opacity duration-300 z-[2]
        text-white bg-neutral-content bg-black rounded-md p-2 transform 
        ${
          toolTipWidth === "small"
            ? "w-[120px]"
            : toolTipWidth === "medium"
              ? "w-[160px]"
              : "w-[300px]"
        }
        
        ${
          position === "top" || position === "bottom"
            ? "-translate-x-1/2"
            : "-translate-y-1/2"
        }
        ${
          position === "top"
            ? "bottom-full left-1/2"
            : position === "bottom"
              ? "top-full left-1/2"
              : position === "right"
                ? "top-1/2 left-full"
                : "top-1/2 right-full"
        }`}
      >
        {content}
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
