"use client";

import React from "react";
import Label from "./Label";
import { cn } from "@/lib/utils";

interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  label: string;
  altLayout?: boolean;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ id, value, label, altLayout, ...props }, ref) => (
    <div
      className={cn(
        "relative flex items-center w-full gap-x-4",
        altLayout && "w-auto",
      )}
    >
      <input id={id} value={value} type="radio" ref={ref} {...props} />
      <Label
        htmlFor={id}
        className={`text-neutral-focus ${altLayout && "w-0 h-0 opacity-0"}`}
      >
        {label}
      </Label>
    </div>
  ),
);

RadioGroupItem.displayName = "RadioGroupItem";

interface RadioGroupProps {
  options: RadioGroupItemProps[];
  title?: string;
}

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ options, title, ...props }, ref) => {
    if (title) {
      return (
        <div className="flex flex-col gap-y-5">
          <div className="w-full bg-neutral-content px-4 py-[23px] grid grid-cols-[150px_1fr] gap-x-4 items-center justify-between rounded-lg">
            <span className="text-base font-medium text-base-300">{title}</span>
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
          </div>
        </div>
      );
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
