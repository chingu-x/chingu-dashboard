"use client";

import React, { ChangeEvent, useState } from "react";

import Label from "./Label";
import FieldMessage from "./FieldMessage";

import { cn } from "@/lib/utils";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder: string;
  defaultValue: string;
  suggestion?: string;
  maxLength?: number;
  errorMessage?: string | undefined;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      placeholder,
      defaultValue,
      suggestion,
      maxLength,
      errorMessage,
      className,
      ...props
    },
    ref
  ) => {
    const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
      if (!maxLength) return;

      const currentLength = e.target.value.length;
      if (currentLength > 0) {
        setCurrentSuggestion(`Character length ${currentLength}/${maxLength}`);
      } else {
        setCurrentSuggestion(suggestion);
      }
    }

    return (
      <div className="w-full pr-2 ml-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-describedby={`${id}-message`}
          className={cn(
            "w-full my-2 text-base outline-none rounded-lg border px-3.5 py-2.5 shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus disabled:cursor-not-allowed border-neutral/40 focus-visible:shadow-neutral/30",
            errorMessage && "border-error focus-visible:shadow-error/30",
            className
          )}
          ref={ref}
          {...props}
          onChange={(e) => {
            // call onChange which can be passed as prop
            if (props.onChange) void props.onChange(e);
            // call your handler
            handleOnChange(e);
          }}
        />
        <FieldMessage
          id={`${id}-message`}
          errorMessage={errorMessage && errorMessage}
          suggestionMessage={errorMessage ? "" : currentSuggestion}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
