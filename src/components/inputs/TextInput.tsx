"use client";

import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import FieldMessage from "./FieldMessage";

export interface TextInputProps {
  id: string;
  label?: string;
  placeholder: string;
  suggestion?: string;
  maxLength?: number;
}

export default function TextInput({
  id,
  label,
  placeholder,
  suggestion,
  maxLength,
  ...props
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
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
      {label && (
        <label
          htmlFor={id}
          className="text-base font-medium capitalize text-base-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        aria-describedby={`${id}-message`}
        {...register(id)}
        onChange={(e) => {
          // call react-hook-form onChange
          void register(id).onChange(e);
          // call your handler
          handleOnChange(e);
        }}
        className={cn(
          "w-full my-2 text-base outline-none rounded-lg border px-3.5 py-2.5 shadow-transparent shadow-[0px_0px_0px_3px] bg-base-200 text-neutral-focus placeholder:capitalize",
          errors[id]
            ? "border-error focus-visible:shadow-error/30"
            : "border-neutral/40 focus-visible:shadow-neutral/30"
        )}
        {...props}
      />
      <FieldMessage
        id={`${id}-message`}
        errorMessage={errors[id]?.message as string}
        suggestionMessage={errors[id]?.message ? "" : currentSuggestion}
      />
    </div>
  );
}
