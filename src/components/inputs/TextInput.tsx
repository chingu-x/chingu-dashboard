"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  id: string;
  label?: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
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
    <div className="w-full form-control">
      <label htmlFor={id} className="p-0 label">
        {label && (
          <span className="text-base font-medium capitalize label-text text-base-300">
            {label}
          </span>
        )}
        <span className="h-6 label-text-alt text-error">
          {errors[id]?.message as string}
        </span>
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        {...register(id)}
        className={`w-full my-2 text-base shadow-sm input input-bordered bg-base-200 text-neutral-focus border-neutral/40 focus-visible:ring-0 focus-visible:bg-base-200 ${
          errors[id] ? "border-error" : "border-neutral/40"
        }`}
      />
    </div>
  );
}
