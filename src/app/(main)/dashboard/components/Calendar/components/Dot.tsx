import React from "react";

type DotProps = {
  color?: string;
  onClick?: () => void;
};

function Dot({ color = "bg-neutral-content", onClick }: DotProps) {
  return (
    <div
      className={`h-2 w-2 ${
        "bg-" + color
      } absolute inset-x-0 bottom-[6px] m-auto cursor-pointer rounded-full`}
      onClick={onClick}
    />
  );
}

export default Dot;
