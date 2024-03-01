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
  ({ id, label, groupLayout = "vertical", ...props }, ref) => (
    <div
      className={cn(
        "relative flex items-center w-full gap-x-4",
        groupLayout !== "vertical" && "w-auto",
      )}
    >
      <Label
        htmlFor={id}
        className={cn(
          "flex items-center normal-case cursor-pointer text-neutral-focus gap-x-4 group",
          groupLayout === "rating" && "flex-col-reverse text-base-300 gap-y-4",
        )}
      >
        <input
          id={id}
          type="radio"
          ref={ref}
          {...props}
          className="hidden peer"
        />
        <span className="inline-block w-6 h-6 border rounded-full bg-base-200 border-neutral/40 transition-all group-hover:bg-base-100 group-hover:border group-hover:border-neutral peer-disabled:bg-base-100 peer-checked:border-0 peer-checked:bg-base-200 peer-checked:shadow-[inset_0_0_0_7px] peer-checked:shadow-base-300 group-hover:peer-checked:shadow-neutral peer-disabled:peer-checked:bg-neutral-focus peer-disabled:peer-checked:shadow-neutral" />
        <span className="peer-checked:text-base-300">
          {groupLayout !== "horizontal" && label}
        </span>
      </Label>
    </div>
  ),
);

RadioGroupItem.displayName = "RadioGroupItem";

export default RadioGroupItem;
