/* eslint-disable */

"use client";

import { SerializedError, AsyncThunkAction } from "@reduxjs/toolkit";
import { SetStateAction, useCallback, useState, Dispatch } from "react";
import { useAppDispatch } from "@/store/hooks";
import { editIdeation } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";

type AsyncThunkActionCreator<R, T> = (
  args: T,
) => AsyncThunkAction<R, T, object>;

type ThunkHookResult<R, T> = {
  runThunk: AsyncThunkActionCreator<R, T>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string | undefined;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

export default function useAction(action: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const runAction = useCallback(
    async (arg: any) => {
      setIsLoading(true);

      const data = await action(arg);

      if (data.error) setError(data.error);
    },
    [action],
  );

  return { runAction, isLoading, setIsLoading, error, setError };
}
