"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-2 mt-2">
      <h2>Something went wrong!</h2>
      <Button
        type="button"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
