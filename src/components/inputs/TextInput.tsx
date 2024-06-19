"use client";

import React, { type ChangeEvent, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

import Label from "./Label";
import FieldMessage from "./FieldMessage";
import Button from "@/components/Button";

import { cn } from "@/lib/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder: string;
  defaultValue?: string;
  suggestion?: string;
  maxLength?: number;
  errorMessage?: string | undefined;
  inputGroupContent?: JSX.Element;
  submitButtonText?: string | React.ReactNode;
  buttonDisabled?: boolean;
  ariaLabel?: string;
  clearInputAction?: () => void;
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
      inputGroupContent,
      submitButtonText,
      buttonDisabled,
      clearInputAction,
      className,
      type = "text",
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [isClearButtonVisible, setIsClearButtonVisible] = useState(false);
    const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
      setShowPassword(!showPassword);
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
      // Max length suggestion message
      if (maxLength) {
        const currentLength = e.target.value.length;
        if (currentLength > 0) {
          setCurrentSuggestion(
            `Character length ${currentLength}/${maxLength}`,
          );
        } else {
          setCurrentSuggestion(suggestion);
        }
      }

      // Clear button toggle
      if (clearInputAction && e.target.value.length > 0) {
        setIsClearButtonVisible(true);
      } else {
        setIsClearButtonVisible(false);
      }
    }

    function clearInput() {
      if (clearInputAction) {
        clearInputAction();
        setIsClearButtonVisible(false);
      }
    }

    return (
      <div className="relative w-full">
        {/* LABEL */}
        {label && <Label htmlFor={id}>{label}</Label>}
        {/* INPUT */}
        <div
          className={cn(
            "group relative my-2",
            isClearButtonVisible && "pr-[48px]",
          )}
        >
          <input
            aria-label={ariaLabel}
            id={id}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            aria-describedby={`${id}-message`}
            className={cn(
              "peer w-full rounded-lg border-2 border-neutral/40 bg-base-200 px-3.5 py-2.5 text-base-300 shadow-[0px_0px_0px_3px] shadow-transparent outline-none transition focus-visible:border-neutral/40 focus-visible:shadow-neutral/30 disabled:cursor-not-allowed disabled:bg-base-100 group-hover:border-neutral-focus group-hover:focus-visible:border-neutral/40 disabled:group-hover:border-neutral/40",
              errorMessage &&
                "border-error/40 hover:border-error focus-visible:border-error/40 focus-visible:shadow-error/20",
              inputGroupContent && "pl-[56px]",
              submitButtonText && "pr-[72px]",
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
          {/* FIXED INPUT GROUP */}
          {inputGroupContent && (
            <div className="absolute left-[2px] top-1/2 flex h-[calc(100%-4px)] -translate-y-1/2 items-center justify-center rounded-l-md bg-neutral py-3 transition peer-disabled:bg-neutral-content hover:peer-disabled:cursor-not-allowed [&>*]:mx-[14px] [&>*]:h-5 [&>*]:w-5 [&>*]:text-base-200">
              {inputGroupContent}
            </div>
          )}
          {/* SUBMIT BUTTON */}
          {submitButtonText && (
            <Button
              type="submit"
              variant="neutral"
              size="sm"
              disabled={buttonDisabled}
              className={cn(
                "absolute right-[2px] top-1/2 h-[calc(100%-4px)] -translate-y-1/2 rounded-[6.2px]",
                isClearButtonVisible && "right-[50px]",
              )}
            >
              {submitButtonText}
            </Button>
          )}
          {/* CLEAR INPUT BUTTON */}
          {isClearButtonVisible && (
            // TODO: replace with an Icon Button
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-[10px]"
            >
              <XMarkIcon className="h-5 w-5 text-base-300" />
            </button>
          )}
          {/* SHOW/HIDE PASSWORD TOGGLE */}
          {type === "password" && (
            <div
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-5"
            >
              {showPassword ? (
                <EyeIcon className="h-5" />
              ) : (
                <EyeSlashIcon className="h-5" />
              )}
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
