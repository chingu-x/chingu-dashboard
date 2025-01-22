"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import { Banner } from "@chingu-x/components/banner";

import Image from "next/image";
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

  function handleResetAndRefresh() {
    startTransition(() => {
      router.refresh();
      if (reset) reset();
    });
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-155px)] w-full max-w-[628px] flex-col items-center justify-center gap-y-6">
      <Banner
        imageLight={<Image src="/img/error_light.png" alt="Login light error image" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 484px" priority />}
        imageDark={<Image src="/img/error_dark.png" alt="Login dark error image" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 484px" priority />}
        height="h-[315px]"
        width="w-[484px]"
      />
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-3xl font-semibold uppercase text-primary">Error</h1>
        <span className="text-lg font-medium text-base-300">
          The following error occurred:
        </span>
        <div className="flex flex-col items-center gap-y-2 text-lg font-medium uppercase text-base-300">
          <h2>{errorType ? errorType : ""}</h2>
          <span>{message}.</span>
        </div>
      </div>
      <div className="flex w-full gap-x-10">
        <Button
          className="w-full"
          variant="neutral"
          type="button"
          size="lg"
          onClick={handleResetAndRefresh}
        >
          Try again
        </Button>
        {isUnauthorized ? (
          <Button
            className="w-full"
            type="button"
            size="lg"
            onClick={() => router.push(routePaths.signIn())}
          >
            Log in
          </Button>
        ) : (
          <Button
            className="w-full"
            type="button"
            size="lg"
            onClick={() => router.push(routePaths.dashboardPage())}
          >
            Return to dashboard
          </Button>
        )}
      </div>
    </div>
  );
}
