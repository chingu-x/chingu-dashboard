"use client";

import React, { ChangeEvent, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

import Label from "./Label";
import FieldMessage from "./FieldMessage";
import Button from "@/components/Button";

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

type ButtonVariants = "primary" | "secondary" | "neutral";

type ConditionalTextInputProps =
  | {
      inputGroup: "left";
      inputGroupContent: JSX.Element;
      inputGroupAction?: never;
      submitButtonText?: never;
      submitButtonVariant?: never;
      clearInputAction?: never;
    }
  | {
      inputGroup: "right";
      inputGroupContent: JSX.Element | string;
      inputGroupAction: () => void;
      submitButtonText?: never;
      submitButtonVariant?: never;
      clearInputAction?: never;
    }
  | {
      inputGroup: "right";
      inputGroupContent: JSX.Element | string;
      inputGroupAction: () => void;
      submitButtonText: string;
      submitButtonVariant: ButtonVariants;
      clearInputAction: () => void;
    }
  | {
      inputGroup?: never;
      inputGroupContent?: undefined;
      inputGroupAction?: never;
      submitButtonText?: never;
      submitButtonVariant?: never;
      clearInputAction?: never;
    }
  | {
      inputGroup?: undefined;
      inputGroupContent?: never;
      inputGroupAction?: never;
      submitButtonText?: never;
      submitButtonVariant?: never;
      clearInputAction?: never;
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
      inputGroup,
      inputGroupContent,
      inputGroupAction,
      submitButtonVariant,
      submitButtonText,
      clearInputAction,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);
    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false);
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

      // Submit button toggle
      if (
        submitButtonText &&
        submitButtonVariant &&
        e.target.value.length > 0
      ) {
        setIsSubmitButtonVisible(true);
      } else {
        setIsSubmitButtonVisible(false);
      }
    }

    function clearInput() {
      if (clearInputAction) {
        clearInputAction();
        setIsSubmitButtonVisible(false);
      }
    }

    return (
      <div className="relative w-full pr-2 ml-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div
          className={cn("relative my-2", isSubmitButtonVisible && "pr-[48px]")}
        >
          <input
            id={id}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            aria-describedby={`${id}-message`}
            className={cn(
              "transition border-2 peer w-full outline-none rounded-lg px-3.5 py-2.5 shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus disabled:cursor-not-allowed border-neutral/40 hover:border-neutral-focus focus-visible:border-neutral/40 focus-visible:shadow-neutral/30 disabled:bg-base-100 disabled:hover:border-neutral/40",
              errorMessage &&
                "border-error/40 hover:border-error focus-visible:border-error/40 focus-visible:shadow-error/20",
              inputGroup === "left" && inputGroupContent && "pl-[56px]",
              inputGroup === "right" && inputGroupContent && "pr-[56px]",
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
          {/* FIXED INPUT GROUP */}
          {/* LEFT */}
          {inputGroup === "left" && inputGroupContent && (
            <div className="left-[2px] rounded-l-md flex justify-center items-center top-1/2 -translate-y-1/2 bg-neutral peer-disabled:bg-neutral-content [&>*]:text-base-200 h-[calc(100%-4px)] py-3 transition absolute [&>*]:mx-[14px] [&>*]:w-5 [&>*]:h-5">
              {inputGroupContent}
            </div>
          )}
          {/* RIGHT */}
          {inputGroup === "right" && inputGroupContent && (
            <button
              type="button"
              onClick={inputGroupAction}
              className={cn(
                "right-[2px] rounded-r-md flex justify-center items-center top-1/2 -translate-y-1/2 bg-neutral peer-disabled:bg-neutral-content [&>*]:text-base-200 h-[calc(100%-4px)] py-3 transition absolute [&>*]:mx-[14px] [&>*]:w-5 [&>*]:h-5",
                typeof inputGroupContent === "string" &&
                  "text-[13px] p-[10px] text-base-200 font-semibold",
                isSubmitButtonVisible && "hidden"
              )}
            >
              {inputGroupContent}
            </button>
          )}
          {/* SUBMIT BUTTON */}
          {isSubmitButtonVisible && (
            <Button
              type="submit"
              variant={submitButtonVariant}
              size="sm"
              className="absolute top-1/2 -translate-y-1/2 right-[50px] h-[calc(100%-4px)] rounded-[6.2px]"
            >
              {submitButtonText}
            </Button>
          )}
          {/* CLEAR INPUT BUTTON */}
          {isSubmitButtonVisible && (
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
