"use client";

import React from "react";
import Label from "./Label";
import { cn } from "@/lib/utils";

interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string | JSX.Element;
  altLayout?: boolean;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ id, label, altLayout, ...props }, ref) => (
    <div
      className={cn(
        "relative flex items-center w-full gap-x-4",
        altLayout && "w-auto",
      )}
    >
      <Label
        htmlFor={id}
        className="flex items-center normal-case cursor-pointer text-neutral-focus gap-x-4 group"
      >
        <input
          id={id}
          type="radio"
          ref={ref}
          {...props}
          className="hidden peer"
        />
        <span className="inline-block w-6 h-6 border rounded-full bg-base-200 border-neutral/40 transition-all group-hover:bg-base-100 group-hover:border group-hover:border-neutral peer-disabled:bg-base-100 peer-checked:border-0 peer-checked:bg-base-200 peer-checked:shadow-[inset_0_0_0_7px] peer-checked:shadow-base-300 group-hover:peer-checked:shadow-neutral peer-disabled:peer-checked:bg-neutral-focus peer-disabled:peer-checked:shadow-neutral" />
        {!altLayout && label}
      </Label>
    </div>
  ),
);

RadioGroupItem.displayName = "RadioGroupItem";

interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: RadioGroupItemProps[];
  titleLeft?: string;
  titleRight?: string;
}

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ options, titleLeft, titleRight, ...props }, ref) => {
    const altLayout = titleLeft && true;
    // ALT LAYOUT (HORIZONTAL)
    if (altLayout) {
      return (
        <div className="flex flex-col gap-y-5">
          <div
            className={cn(
              "h-[80px] w-full bg-neutral-content px-4 grid grid-cols-[150px_1fr] gap-x-4 items-center justify-between rounded-lg",
              titleRight &&
                "grid-cols-[80px_1fr_80px] px-0 xl:px-4 xl:grid-cols-[130px_1fr_130px] bg-base-100",
            )}
          >
            {/* LEFT TITLE */}
            <span className="text-base font-medium text-base-300">
              {titleLeft}
            </span>
            {/* RADIO GROUP */}
            <div className="flex justify-between px-6">
              {options.map(({ id, value, label }) => (
                <RadioGroupItem
                  key={id}
                  id={id}
                  value={value}
                  label={label}
                  {...props}
                  ref={ref}
                  altLayout={true}
                />
              ))}
            </div>
            {/* RIGHT TITLE */}
            {titleRight && (
              <span className="text-base font-medium text-base-300">
                {titleRight}
              </span>
            )}
          </div>
        </div>
      );
      // SIMPLE LAYOUT (LIST)
    } else {
      return (
        <div className="flex flex-col gap-y-5">
          {options.map(({ id, value, label }) => (
            <RadioGroupItem
              key={id}
              id={id}
              value={value}
              label={label}
              {...props}
              ref={ref}
            />
          ))}
        </div>
      );
    }
  },
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
