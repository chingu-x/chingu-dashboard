import React from "react";

type DotProps = {
  color?: string;
};

function Dot({ color = "bg-neutral-content" }: DotProps) {
  return (
    <div
      className={`w-2 h-2 ${color} rounded-full left-0 right-0 bottom-[6px] m-auto absolute`}
    />
  );
}

export default Dot;
