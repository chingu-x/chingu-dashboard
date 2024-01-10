"use client";

import { cn } from "@/lib/utils";
import {
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

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
          "flex items-center h-4 gap-1 text-[13px] font-medium",
          errorMessage ? "text-error" : "text-base-300"
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
