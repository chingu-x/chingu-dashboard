"use client";

import React, { ChangeEvent, useState } from "react";

import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Label from "./Label";
import FieldMessage from "./FieldMessage";

import { cn } from "@/lib/utils";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder: string;
  suggestion?: string;
  maxLength?: number;
  errorMessage?: string | undefined;
  type?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      placeholder,
      suggestion,
      maxLength,
      errorMessage,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
      setShowPassword(!showPassword);
    }

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
      <div className="relative w-full">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          id={id}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
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
        {type === "password" && (
          <div
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 flex items-center pt-2 pr-5 cursor-pointer"
          >
            {showPassword ? (
              <EyeIcon className="h-5" />
            ) : (
              <EyeSlashIcon className="h-5" />
            )}
          </div>
        )}
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
