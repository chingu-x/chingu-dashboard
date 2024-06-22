"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const isUnauthorized = error.message.toLowerCase().includes("unauthorized");

  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[600px] flex-col items-center justify-center gap-y-5">
      <h1 className="text-xl font-semibold capitalize">Error</h1>
      <p className="font-medium">An following error occured:</p>
      <p className="w-full rounded-lg bg-error-content/50 px-6 py-3 text-center font-semibold">
        {error.message}.
      </p>
      <div className="flex w-full gap-x-10">
        <Button
          className="w-full"
          variant="neutral"
          type="button"
          onClick={() => reset()}
        >
          Try again
        </Button>
        {isUnauthorized ? (
          <Button
            className="w-full"
            type="button"
            onClick={() => router.push(routePaths.signIn())}
          >
            Log in
          </Button>
        ) : (
          <Button
            className="w-full"
            type="button"
            onClick={() => router.push(routePaths.dashboardPage())}
          >
            Return to dashboard
          </Button>
        )}
      </div>
    </div>
  );
}
