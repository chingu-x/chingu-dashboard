"use client";

import React from "react";
import Label from "@/components/inputs/Label";
import { cn } from "@/lib/utils";

type groupLayoutTypes = "vertical" | "horizontal" | "rating";

export interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string | JSX.Element;
  groupLayout?: groupLayoutTypes;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ id, label, groupLayout = "vertical", className, ...props }, ref) => (
    <div
      className={cn(
        "relative flex w-full items-center gap-x-4",
        groupLayout !== "vertical" && "w-auto",
      )}
    >
      <Label
        htmlFor={id}
        className={cn(
          "group flex cursor-pointer items-center gap-x-4 normal-case text-neutral-focus",
          groupLayout === "rating" && "flex-col-reverse gap-y-4 text-base-300",
          className,
        )}
      >
        <input
          id={id}
          type="radio"
          ref={ref}
          {...props}
          className="peer hidden"
        />
        <span className="inline-block h-6 w-6 rounded-full border border-neutral/40 bg-base-200 transition-all group-hover:border group-hover:border-neutral group-hover:bg-base-100 peer-checked:border-0 peer-checked:bg-base-200 peer-checked:shadow-[inset_0_0_0_7px] peer-checked:shadow-base-300 group-hover:peer-checked:shadow-neutral peer-disabled:bg-base-100 peer-disabled:peer-checked:bg-neutral-focus peer-disabled:peer-checked:shadow-neutral" />
        <span className="peer-checked:text-base-300">
          {groupLayout !== "horizontal" && label}
        </span>
      </Label>
    </div>
  ),
);

RadioGroupItem.displayName = "RadioGroupItem";

export default RadioGroupItem;
