"use client";

import React, { ChangeEvent, useState } from "react";

import Label from "./Label";
import FieldMessage from "./FieldMessage";

import { cn } from "@/lib/utils";

interface CommonTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder: string;
  suggestion?: string;
  maxLength?: number;
  errorMessage?: string | undefined;
}

type ConditionalTextInputProps =
  | {
      inputGroupPosition:
        | "left"
        | "right"
        | "left-transparent"
        | "right-transparent";
      inputGroupIcon: JSX.Element;
    }
  | {
      inputGroupPosition?: never;
      inputGroupIcon?: undefined;
    }
  | {
      inputGroupPosition?: undefined;
      inputGroupIcon?: never;
    };

export type TextInputProps = CommonTextInputProps & ConditionalTextInputProps;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      placeholder,
      suggestion,
      maxLength,
      errorMessage,
      inputGroupPosition,
      inputGroupIcon,
      className,
      ...props
    },
    ref,
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
        <div className="relative my-2">
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            aria-describedby={`${id}-message`}
            className={cn(
              "transition border-2 peer w-full outline-none rounded-lg px-3.5 py-2.5 shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus disabled:cursor-not-allowed border-neutral/40 hover:border-neutral-focus focus-visible:border-neutral/40 focus-visible:shadow-neutral/30 disabled:bg-base-100 disabled:hover:border-neutral/40",
              errorMessage &&
                "border-error/40 hover:border-error/40 focus-visible:border-error/40 focus-visible:shadow-error/20",
              inputGroupPosition === "left" && "pl-[56px]",
              inputGroupPosition === "right" && "pr-[56px] ",
              inputGroupPosition === "left-transparent" && "pl-[42px]",
              inputGroupPosition === "right-transparent" && "pr-[42px]",
              className,
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
          {inputGroupPosition && inputGroupIcon && (
            <div
              className={cn(
                "h-[calc(100%-4px)] py-3 transition absolute peer-hover:[&>*]:text-base-300 peer-focus-visible:[&>*]:text-base-300 peer-disabled:peer-hover:[&>*]:text-neutral peer-disabled:peer-focus-visible:[&>*]:text-neutral [&>*]:mx-[14px] [&>*]:w-5 [&>*]:h-5 [&>*]:text-neutral",
                (inputGroupPosition === "left" ||
                  inputGroupPosition === "left-transparent") &&
                  "top-1/2 -translate-y-1/2 left-[1.6px]",
                (inputGroupPosition === "right" ||
                  inputGroupPosition === "right-transparent") &&
                  "top-1/2 -translate-y-[calc(50%+0.3px)] right-[1.6px]",
                (inputGroupPosition === "left" ||
                  inputGroupPosition === "right") &&
                  "bg-neutral peer-disabled:bg-neutral-content [&>*]:text-base-200 peer-hover:[&>*]:text-base-200 peer-focus-visible:[&>*]:text-base-200 peer-disabled:peer-hover:[&>*]:text-base-200 peer-disabled:peer-focus-visible:[&>*]:text-base-200",
                inputGroupPosition === "left" && "rounded-l-md",
                inputGroupPosition === "right" && "rounded-r-md",
              )}
            >
              {inputGroupIcon}
            </div>
          )}
        </div>
        <FieldMessage
          id={`${id}-message`}
          errorMessage={errorMessage && errorMessage}
          suggestionMessage={errorMessage ? "" : currentSuggestion}
        />
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
