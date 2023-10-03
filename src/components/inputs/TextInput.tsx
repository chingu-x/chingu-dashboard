"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

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
        {...register(id)}
        className={`w-full my-2 text-base shadow-transparent shadow-[0px_0px_0px_3px] input input-bordered bg-base-200 text-neutral-focus ${
          errors[id]
            ? "border-error focus-visible:shadow-error/30"
            : "border-neutral/40 focus-visible:shadow-neutral/30"
        }`}
      />
      <label className="p-0 pt-1 label">
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
