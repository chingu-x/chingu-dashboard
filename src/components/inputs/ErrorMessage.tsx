"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <label className="p-0 pt-1 label">
      <span className="flex items-center h-4 gap-1 text-sm label-text-alt text-error">
        {message && (
          <>
            <QuestionMarkCircleIcon className="w-4 h-4 stroke-error fill-transparent" />
            {message}
          </>
        )}
      </span>
    </label>
  );
}
