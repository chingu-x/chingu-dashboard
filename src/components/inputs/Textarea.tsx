"use client";

import { ChangeEvent, ElementRef, useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

import FieldMessage from "./FieldMessage";

interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  suggestion?: string;
  maxLength?: number;
}

export default function Textarea({
  id,
  label,
  placeholder,
  register,
  errors,
  suggestion,
  maxLength,
}: TextareaProps) {
  const [currentSuggestion, setCurrentSuggestion] = useState(suggestion);
  const { ref, ...rest } = register;
  const textAreaRef = useRef<ElementRef<"textarea"> | null>(null);

  // Set Textarea height to fit the placeholder content
  useEffect(() => {
    // The 2 corresponds to the 2 1px borders (top and bottom):
    if (textAreaRef !== null && textAreaRef.current !== null) {
      textAreaRef.current.style.height = `${Math.max(
        textAreaRef.current.scrollHeight + 2,
        0,
      )}px`;
    }
  }, [textAreaRef]);

  function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
    // Make Textarea expand or shrink vertically to fit the content
    // The 2 corresponds to the 2 1px borders (top and bottom):
    e.target.style.height = e.target.style.minHeight = "auto";
    e.target.style.minHeight = `${Math.min(
      e.target.scrollHeight + 2,
      parseInt(e.target.style.maxHeight),
    )}px`;
    e.target.style.height = `${Math.max(e.target.scrollHeight + 2, 0)}px`;

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
    <div className="w-full pr-2 ml-1 form-control">
      <label htmlFor={id} className="p-0 label">
        <span className="text-base font-medium capitalize label-text text-base-300">
          {label}
        </span>
      </label>
      <textarea
        id={id}
        rows={1}
        ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
        placeholder={placeholder}
        {...rest}
        onChange={(e) => {
          // call react-hook-form onChange
          void register.onChange(e);
          // call your handler
          handleOnChange(e);
        }}
        className={`textarea textarea-bordered leading-5 resize-none w-full py-[10px] px-[14px] my-2 text-base shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus focus-visible:ring-0 focus-visible:bg-base-200 placeholder-base placeholder:leading-5 ${
          errors[id]
            ? "border-error focus-visible:shadow-error/30"
            : "border-neutral/40 focus-visible:shadow-neutral/30"
        }`}
      />
      <FieldMessage
        errorMessage={errors[id]?.message as string}
        suggestionMessage={errors[id]?.message ? "" : currentSuggestion}
      />
    </div>
  );
}
