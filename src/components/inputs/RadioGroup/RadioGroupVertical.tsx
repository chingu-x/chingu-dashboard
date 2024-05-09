"use client";

import React from "react";
import RadioGroupItem, { type RadioGroupItemProps } from "./RadioGroupItem";

interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: RadioGroupItemProps[];
}

const RadioGroupVertical = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ options, ...props }, ref) => (
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
  ),
);

RadioGroupVertical.displayName = "RadioGroupVertical";

export default RadioGroupVertical;
