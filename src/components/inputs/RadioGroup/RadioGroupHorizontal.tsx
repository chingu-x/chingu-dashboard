"use client";

import React from "react";
import RadioGroupItem, { RadioGroupItemProps } from "./RadioGroupItem";

interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: RadioGroupItemProps[];
  title: string;
}

const RadioGroupHorizontal = React.forwardRef<
  HTMLInputElement,
  RadioGroupProps
>(({ options, title, ...props }, ref) => (
  <div className="flex flex-col gap-y-5">
    <div className="h-[80px] w-full bg-neutral-content px-4 grid grid-cols-[150px_1fr] gap-x-4 items-center justify-between rounded-lg">
      {/* TITLE */}
      <span className="text-base font-medium text-base-300">{title}</span>
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
            groupLayout="horizontal"
          />
        ))}
      </div>
    </div>
  </div>
));

RadioGroupHorizontal.displayName = "RadioGroupHorizontal";

export default RadioGroupHorizontal;
