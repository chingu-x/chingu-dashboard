"use client";

interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export default function Textarea({
  id,
  label,
  placeholder,
  required,
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
        required={required}
        className="w-full h-24 my-2 text-base shadow-sm textarea textarea-bordered bg-base-200 text-neutral-focus border-neutral/40 focus-visible:ring-0 focus-visible:bg-base-200 placeholder-base"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
