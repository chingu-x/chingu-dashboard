"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

import Label from "./Label";

interface CheckboxGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string | JSX.Element;
  value: string;
}

const CheckboxGroupItem = React.forwardRef<
  HTMLInputElement,
  CheckboxGroupItemProps
>(({ id, value, label, ...props }, ref) => (
  <div className="relative flex items-center w-full gap-x-4">
    <Label
      htmlFor={id}
      className="flex items-center normal-case cursor-pointer text-neutral-focus gap-x-4"
    >
      <input
        id={id}
        value={value}
        type="checkbox"
        ref={ref}
        {...props}
        className="hidden peer"
      />
      <span className="flex items-center justify-center w-6 h-6 border rounded bg-base-200 border-neutral/40 transition-all [&>*]:hidden peer-checked:[&>*]:block">
        <CheckIcon className="hidden checkbox-icon text-base-300" />
      </span>
      {label}
    </Label>
  </div>
));

CheckboxGroupItem.displayName = "CheckboxGroupItem";

interface CheckboxGroupProps {
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
