import React from "react";
import PropTypes from "prop-types";

interface TooltipProps {
  content: string;
  position: string;
  children: any;
}

const Tooltip = ({ content, position, children }: TooltipProps) => {
  return (
    <div className={`tooltip tooltip--${position}`}>
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "right", "left"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;