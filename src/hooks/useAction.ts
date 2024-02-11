/* eslint-disable */

"use client";

import { useCallback, useState } from "react";

export default function useAction(action: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  console.log(error);

  const runAction = useCallback(
    async (arg: any) => {
      setIsLoading(true);

      const data = await action(arg);

      if (data.error) setError(data.error);
    },
    [action]
  );

  return { runAction, isLoading, setIsLoading, error, setError };
}
