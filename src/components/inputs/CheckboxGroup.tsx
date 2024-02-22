"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

import Label from "./Label";

interface CheckboxGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string | JSX.Element;
}

const CheckboxGroupItem = React.forwardRef<
  HTMLInputElement,
  CheckboxGroupItemProps
>(({ id, label, ...props }, ref) => (
  <div className="relative flex items-center w-full gap-x-4">
    <Label
      htmlFor={id}
      className="flex items-center normal-case cursor-pointer text-neutral-focus gap-x-4 group"
    >
      <input
        id={id}
        type="checkbox"
        ref={ref}
        {...props}
        className="hidden peer"
      />
      <span className="flex items-center justify-center w-6 h-6 border rounded bg-base-200 border-neutral/40 transition-all [&>*]:hidden group-hover:bg-base-100 peer-checked:border-base-300 [&>*]:text-base-300 peer-checked:[&>*]:block group-hover:peer-checked:[&>*]:text-neutral-content group-hover:peer-checked:border-neutral-content">
        <CheckIcon className="hidden transition" />
      </span>
      {label}
    </Label>
  </div>
));

CheckboxGroupItem.displayName = "CheckboxGroupItem";

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
  ),
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
