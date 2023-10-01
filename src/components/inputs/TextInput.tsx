"use client";

interface TextInputProps {
  id: string;
  label?: string;
  placeholder: string;
  required?: boolean;
}

export default function TextInput({
  id,
  label,
  placeholder,
  required,
}: TextInputProps) {
  return (
    <div className="w-full form-control">
      {label && (
        <label htmlFor={id} className="p-0 label">
          <span className="text-base font-medium capitalize label-text text-base-300">
            {label}
          </span>
        </label>
      )}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        required={required}
        className="w-full my-2 text-base shadow-sm input input-bordered bg-base-200 text-neutral-focus border-neutral/40 focus-visible:ring-0 focus-visible:bg-base-200"
      />
    </div>
  );
}
