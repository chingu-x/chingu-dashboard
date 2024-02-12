"use client";

import { useCallback, useState } from "react";
import { AppError } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";

type ActionType<T, X> = (arg: T) => Promise<X | AppError>;

interface UseActionResult<T, X> {
  runAction: (arg: T) => Promise<X | AppError>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
}

export default function useAction<T, X>(
  action: ActionType<T, X>
): UseActionResult<T, X> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const runAction = useCallback(
    async (arg: T) => {
      setIsLoading(true);

      const data = await action(arg);

      if ((data as AppError).error) setError((data as AppError).error);

      return data;
    },
    [action]
  );

  return { runAction, isLoading, setIsLoading, error, setError };
}
