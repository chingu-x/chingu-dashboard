"use client";

import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface TextInputProps {
  id: string;
  label?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
}

export default function TextInput({
  id,
  label,
  placeholder,
  register,
  errors,
}: TextInputProps) {
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
        type="text"
        placeholder={placeholder}
        {...register}
        className={`w-full my-2 text-base shadow-transparent shadow-[0px_0px_0px_3px] input input-bordered bg-base-200 text-neutral-focus ${
          errors[id]
            ? "border-error focus-visible:shadow-error/30"
            : "border-neutral/40 focus-visible:shadow-neutral/30"
        }`}
      />
      <ErrorMessage message={errors[id]?.message as string} />
    </div>
  );
}
