"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

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
      </label>
      <textarea
        id={id}
        className={`w-full h-24 my-2 text-base shadow-sm textarea textarea-bordered bg-base-200 text-neutral-focus focus-visible:ring-0 focus-visible:bg-base-200 placeholder-base ${
          errors[id] ? "border-error" : "border-neutral/40"
        }`}
        placeholder={placeholder}
        {...register(id)}
      />
      <label className="p-0 label">
        <span className="flex items-center h-4 gap-1 text-sm label-text-alt text-error">
          {errors[id] && (
            <QuestionMarkCircleIcon className="w-4 h-4 stroke-error fill-transparent" />
          )}
          {errors[id]?.message as string}
        </span>
      </label>
    </div>
  );
}
