"use client";

import { useCallback, useState } from "react";
import { AppError } from "@/types/types";

type ActionType<X, Y> = (arg: X) => Promise<[Y | null, AppError | null]>;

interface UseActionResult<X, Y> {
  runAction: ActionType<X, Y>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
}
export default function useAction<X, Y>(
  action: ActionType<X, Y>
): UseActionResult<X, Y> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const runAction = useCallback(
    async (arg: X) => {
      setIsLoading(true);

      return await action(arg);
    },
    [action]
  );

  return { runAction, isLoading, setIsLoading, error, setError };
}
