"use client";

import React from "react";
import Label from "./Label";

interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  label: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ id, value, label, ...props }, ref) => (
    <div className="relative flex items-center w-full gap-x-4">
      <input id={id} value={value} type="radio" ref={ref} {...props} />
      <Label htmlFor={id} className="text-neutral-focus">
        {label}
      </Label>
    </div>
  ),
);

RadioGroupItem.displayName = "RadioGroupItem";

interface RadioGroupProps {
  options: RadioGroupItemProps[];
}

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
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

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
