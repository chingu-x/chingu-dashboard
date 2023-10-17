"use client";

import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import FieldMessage from "./FieldMessage";

interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
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
    <div className="w-full pr-2 ml-1 form-control">
      <label htmlFor={id} className="p-0 label">
        <span className="text-base font-medium capitalize label-text text-base-300">
          {label}
        </span>
      </label>
      <textarea
        id={id}
        className={`w-full h-24 my-2 text-base shadow-transparent shadow-[0px_0px_0px_3px] textarea textarea-bordered bg-base-200 text-neutral-focus focus-visible:ring-0 focus-visible:bg-base-200 placeholder-base ${
          errors[id]
            ? "border-error focus-visible:shadow-error/30"
            : "border-neutral/40 focus-visible:shadow-neutral/30"
        }`}
        placeholder={placeholder}
        {...register}
      />
      <FieldMessage errorMessage={errors[id]?.message as string} />
    </div>
  );
}
