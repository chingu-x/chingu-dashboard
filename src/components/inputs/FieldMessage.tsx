"use client";

import {
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

import { cn } from "@/lib/utils";

interface FieldMessageProps {
  id: string;
  errorMessage?: string;
  suggestionMessage?: string;
}

export default function FieldMessage({
  id,
  errorMessage,
  suggestionMessage,
}: FieldMessageProps) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      <span
        className={cn(
          "flex items-center h-4 gap-1 py-4 text-[13px] font-medium text-base-300",
          errorMessage && "text-error",
        )}
      >
        {errorMessage && (
          <>
            <QuestionMarkCircleIcon className="w-[10.5px] h-[10.5px] stroke-[1.5px] stroke-error fill-transparent" />
            {errorMessage}
          </>
        )}
        {suggestionMessage && (
          <>
            <ExclamationCircleIcon className="w-[10.5px] h-[10.5px] stroke-[1.5px] stroke-base-300 fill-transparent" />
            {suggestionMessage}
          </>
        )}
      </span>
    </div>
  );
}
