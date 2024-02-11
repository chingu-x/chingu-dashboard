"use client";

import { SerializedError, AsyncThunkAction } from "@reduxjs/toolkit";
import { SetStateAction, useCallback, useState, Dispatch } from "react";
import { useAppDispatch } from "@/store/hooks";

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

export default function useThunk<R, T>(
  thunk: AsyncThunkActionCreator<R, T>,
): ThunkHookResult<R, T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const runThunk = useCallback(
    (arg: T) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: SerializedError) => {
          console.log(err.message);
          setError(err.message);
        })
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk],
  ) as unknown as AsyncThunkActionCreator<R, T>;

  return { runThunk, isLoading, setIsLoading, error, setError };
}
