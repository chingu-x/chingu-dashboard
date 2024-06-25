"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import routePaths from "@/utils/routePaths";
import { type ErrorType } from "@/utils/error";

interface ErrorProps {
  message: string;
  errorType?: ErrorType;
  reset?: () => void;
}

export default function ErrorComponent({
  message,
  errorType,
  reset,
}: ErrorProps) {
  const router = useRouter();
  const isUnauthorized = message.toLowerCase().includes("unauthorized");

  function handleReset() {
    if (reset) reset();
    else router.refresh();
  }

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[600px] flex-col items-center justify-center gap-y-5">
      <h1 className="text-xl font-semibold capitalize">Error</h1>
      <p className="font-medium">An following error occured:</p>
      <p className="w-full rounded-lg bg-error-content/50 px-6 py-3 text-center font-semibold uppercase">
        {`${errorType ? errorType : ""} ${message}.`}
      </p>
      <div className="flex w-full gap-x-10">
        <Button
          className="w-full"
          variant="neutral"
          type="button"
          onClick={handleReset}
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
