"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

import Label from "@/components/inputs/Label";

export interface CheckboxGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string | JSX.Element;
}

export const CheckboxGroupItem = React.forwardRef<
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
      <span className="peer-checked:text-base-300">{label}</span>
    </Label>
  </div>
));

CheckboxGroupItem.displayName = "CheckboxGroupItem";
