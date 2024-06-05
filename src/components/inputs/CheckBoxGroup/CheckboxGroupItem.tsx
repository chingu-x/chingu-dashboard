"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

import Label from "@/components/inputs/Label";
import { cn } from "@/lib/utils";

export interface CheckboxGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string | JSX.Element;
}

export const CheckboxGroupItem = React.forwardRef<
  HTMLInputElement,
  CheckboxGroupItemProps
>(({ id, label, className, ...props }, ref) => (
  <div className="relative flex w-full items-center gap-x-4">
    <Label
      htmlFor={id}
      className={cn(
        "group flex cursor-pointer items-center gap-x-4 normal-case text-neutral-focus",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        ref={ref}
        {...props}
        className="peer hidden"
      />
      <span className="flex h-6 w-6 items-center justify-center rounded border border-neutral/40 bg-base-200 transition-all group-hover:bg-base-100 peer-checked:border-base-300 group-hover:peer-checked:border-neutral-content [&>*]:hidden [&>*]:text-base-300 peer-checked:[&>*]:block group-hover:peer-checked:[&>*]:text-neutral-content">
        <CheckIcon className="hidden transition-all" />
      </span>
      <span className="transition-all peer-checked:text-base-300">{label}</span>
    </Label>
  </div>
));

CheckboxGroupItem.displayName = "CheckboxGroupItem";
