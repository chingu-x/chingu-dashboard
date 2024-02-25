"use client";

import React, {
  ChangeEvent,
  ElementRef,
  useEffect,
  useRef,
  useState,
} from "react";

import Label from "./Label";
import FieldMessage from "./FieldMessage";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  placeholder: string;
  suggestion?: string;
  maxLength?: number;
  errorMessage?: string | undefined;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      suggestion,
      maxLength,
      errorMessage,
      className,
      ...props
    },
    ref,
  ) => {
    const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);
    const textAreaRef = useRef<ElementRef<"textarea"> | null>(null);

    // Set Textarea height to fit the content on first load
    useEffect(() => {
      // The 2 corresponds to the 2 1px borders (top and bottom):
      if (textAreaRef !== null && textAreaRef.current !== null) {
        textAreaRef.current.style.height = `${Math.max(
          textAreaRef.current.scrollHeight + 4,
          0,
        )}px`;
      }
    }, [textAreaRef?.current?.innerHTML]);

    function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
      // Make Textarea expand or shrink vertically to fit the content
      // The 2 corresponds to the 2 1px borders (top and bottom):
      e.target.style.height = e.target.style.minHeight = "auto";
      e.target.style.minHeight = `${Math.min(
        e.target.scrollHeight + 4,
        parseInt(e.target.style.maxHeight),
      )}px`;
      e.target.style.height = `${Math.max(e.target.scrollHeight + 4, 0)}px`;

      // Set character length counter
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
        <textarea
          id={id}
          rows={1}
          ref={(e) => {
            if (typeof ref === "function") {
              ref(e);
            } else if (ref) {
              ref.current = e;
            }
            textAreaRef.current = e;
          }}
          placeholder={placeholder}
          aria-describedby={`${id}-message`}
          className={cn(
            "hover:border-neutral-focus hover:focus-visible:border-neutral/40 focus-visible:border-neutral/40 disabled:bg-base-100 disabled:hover:border-neutral/40 transition resize-none outline-none px-3.5 py-2.5 rounded-lg border-2 w-full my-2 text-base shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus focus-visible:ring-0 focus-visible:bg-base-200 placeholder-base disabled:cursor-not-allowed border-neutral/40 focus-visible:shadow-neutral/30",
            errorMessage &&
              "border-error/40 focus-visible:border-error/40 focus-visible:shadow-error/20",
            className,
          )}
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
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
