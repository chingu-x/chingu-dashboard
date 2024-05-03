"use client";

import React from "react";

import {
  CheckboxGroupItem,
  type CheckboxGroupItemProps,
} from "./CheckboxGroupItem";

interface CheckboxGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: CheckboxGroupItemProps[];
}

const CheckboxGroup = React.forwardRef<HTMLInputElement, CheckboxGroupProps>(
  ({ options, ...props }, ref) => (
    <div className="flex flex-col gap-y-5">
      {options.map(({ id, value, label }) => (
        <CheckboxGroupItem
          key={id}
          id={id}
          value={value}
          label={label}
          {...props}
          ref={ref}
        />
      ))}
    </div>
  )
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
