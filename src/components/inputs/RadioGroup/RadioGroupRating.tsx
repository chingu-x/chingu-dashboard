"use client";

import React from "react";
import RadioGroupItem, { type RadioGroupItemProps } from "./RadioGroupItem";

interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: RadioGroupItemProps[];
  leftTitle: string;
  rightTitle: string;
}

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ options, leftTitle, rightTitle, ...props }, ref) => (
    <div className="flex flex-col gap-y-5">
      <div className="grid h-[80px] w-full grid-cols-[80px_1fr_80px] items-center justify-between gap-x-4 xl:grid-cols-[130px_1fr_130px]">
        {/* LEFT TITLE */}
        <span className="text-right text-base font-medium text-base-300">
          {leftTitle}
        </span>
        {/* RADIO GROUP */}
        <div className="flex items-center justify-between px-6">
          {options.map(({ id, value, label }) => (
            <RadioGroupItem
              key={id}
              id={id}
              value={value}
              label={label}
              {...props}
              ref={ref}
              groupLayout="rating"
            />
          ))}
        </div>
        {/* RIGHT TITLE */}
        <span className="text-base font-medium text-base-300">
          {rightTitle}
        </span>
      </div>
    </div>
  ),
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
