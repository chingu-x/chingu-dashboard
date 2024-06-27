"use client";

import { useEffect } from "react";
import ErrorComponent from "@/components/Error";

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
    <ErrorComponent
      message="Something went wrong. Please contact support"
      reset={reset}
    />
  );
}
