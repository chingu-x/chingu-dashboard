"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function Textarea({
  id,
  label,
  placeholder,
  register,
  errors,
}: TextareaProps) {
  return (
    <div className="form-control">
      <label htmlFor={id} className="p-0 label">
        <span className="text-base font-medium capitalize label-text text-base-300">
          {label}
        </span>
        <span className="label-text-alt text-error">
          {errors[id]?.message as string}
        </span>
      </label>
      <textarea
        id={id}
        className={`w-full h-24 my-2 text-base shadow-sm textarea textarea-bordered bg-base-200 text-neutral-focus border-neutral/40 focus-visible:ring-0 focus-visible:bg-base-200 placeholder-base ${
          errors[id] ? "border-error" : "border-neutral/40"
        }`}
        placeholder={placeholder}
        {...register(id)}
      ></textarea>
    </div>
  );
}
