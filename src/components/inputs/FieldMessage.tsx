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
          "flex h-4 items-center gap-1 text-[13px] font-medium text-base-300",
          errorMessage && "text-error",
        )}
      >
        {errorMessage && (
          <>
            <QuestionMarkCircleIcon className="h-[10.5px] w-[10.5px] fill-transparent stroke-error stroke-[1.5px]" />
            {errorMessage}
          </>
        )}
        {suggestionMessage && (
          <>
            <ExclamationCircleIcon className="h-[10.5px] w-[10.5px] fill-transparent stroke-base-300 stroke-[1.5px]" />
            {suggestionMessage}
          </>
        )}
      </span>
    </div>
  );
}
