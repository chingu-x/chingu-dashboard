"use client";

import { ChangeEvent, useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

import FieldMessage from "./FieldMessage";

interface TextInputProps {
  id: string;
  label?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  suggestion?: string;
  maxLength?: number;
}

export default function TextInput({
  id,
  label,
  placeholder,
  register,
  errors,
  suggestion,
  maxLength,
}: TextInputProps) {
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
    <div className="w-full pr-2 ml-1 form-control">
      <label htmlFor={id} className="p-0 label">
        {label && (
          <span className="text-base font-medium capitalize label-text text-base-300">
            {label}
          </span>
        )}
      </label>
      <input
        id={id}
        type="password"
        placeholder={placeholder}
        {...register}
        onChange={(e) => {
          // call react-hook-form onChange
          void register.onChange(e);
          // call your handler
          handleOnChange(e);
        }}
        className={`w-full my-2 text-base shadow-transparent shadow-[0px_0px_0px_3px] input input-bordered bg-base-200 text-neutral-focus ${
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
