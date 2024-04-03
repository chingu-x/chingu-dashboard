import React from "react";

type DotProps = {
  color?: string;
  onClick?: () => void;
};

function Dot({ color = "bg-neutral-content", onClick }: DotProps) {
  return (
    <div
      className={`w-2 h-2 ${
        "bg-" + color
      } rounded-full left-0 right-0 bottom-[6px] m-auto absolute cursor-pointer`}
      onClick={onClick}
    />
  );
}

export default Dot;
