"use client";

import React, { ChangeEvent, useState, useRef, ElementRef } from "react";
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
  suggestion?: string;
  maxLength?: number;
  errorMessage?: string | undefined;
  inputGroupContent?: JSX.Element;
  submitButtonText?: string;
  clearInputAction?: () => void;
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
      inputGroupContent,
      submitButtonText,
      clearInputAction,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const textInputRef = useRef<ElementRef<"input"> | null>(null);
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
            `Character length ${currentLength}/${maxLength}`
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
      <div className="relative w-full pr-2 ml-1">
        {/* LABEL */}
        {label && <Label htmlFor={id}>{label}</Label>}
        {/* INPUT */}
        <div
          className={cn(
            "group relative my-2",
            isClearButtonVisible && "pr-[48px]"
          )}
        >
          <input
            id={id}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            aria-describedby={`${id}-message`}
            className={cn(
              "transition border-2 peer w-full outline-none rounded-lg px-3.5 py-2.5 shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus disabled:cursor-not-allowed border-neutral/40 group-hover:border-neutral-focus group-hover:focus-visible:border-neutral/40 focus-visible:border-neutral/40 focus-visible:shadow-neutral/30 disabled:bg-base-100 disabled:group-hover:border-neutral/40",
              errorMessage &&
                "border-error/40 hover:border-error focus-visible:border-error/40 focus-visible:shadow-error/20",
              inputGroupContent && "pl-[56px]",
              submitButtonText && "pr-[72px]",
              className
            )}
            ref={(e) => {
              if (typeof ref === "function") {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
              textInputRef.current = e;
            }}
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
            <div className="left-[2px] rounded-l-md flex justify-center items-center top-1/2 -translate-y-1/2 bg-neutral peer-disabled:bg-neutral-content [&>*]:text-base-200 h-[calc(100%-4px)] py-3 transition absolute [&>*]:mx-[14px] [&>*]:w-5 [&>*]:h-5 hover:peer-disabled:cursor-not-allowed">
              {inputGroupContent}
            </div>
          )}
          {/* SUBMIT BUTTON */}
          {submitButtonText && (
            <Button
              type="submit"
              variant="neutral"
              size="sm"
              className={cn(
                "absolute top-1/2 -translate-y-1/2 right-[2px] h-[calc(100%-4px)] rounded-[6.2px]",
                isClearButtonVisible && "right-[50px]"
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
              className="absolute right-0 p-[10px] -translate-y-1/2 top-1/2"
            >
              <XMarkIcon className="w-5 h-5 text-base-300" />
            </button>
          )}
          {/* SHOW/HIDE PASSWORD TOGGLE */}
          {type === "password" && (
            <div
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center px-5 cursor-pointer"
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
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
