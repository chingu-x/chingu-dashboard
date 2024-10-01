"use client";

import { useCallback, useState } from "react";
import { type AsyncActionResponse } from "@/modules/shared/types";

type ActionType<X, Y> = (arg: X) => Promise<AsyncActionResponse<Y>>;

interface UseServerActionResult<X, Y> {
  runAction: ActionType<X, Y>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
export default function useServerAction<X, Y>(
  action: ActionType<X, Y>,
): UseServerActionResult<X, Y> {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const runAction = useCallback(
    async (arg: X) => {
      setIsLoading(true);

      return await action(arg);
    },
    [action],
  );

  return { runAction, isLoading, setIsLoading };
}
