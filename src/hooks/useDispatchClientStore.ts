import { useEffect, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/store/hooks";

type ActionWithoutPayload = () => AnyAction;
type ActionWithPayload<T> = (
  payload: T
) => AnyAction | { payload: T; type: string };

type HasPayload<X> = X extends ActionWithPayload<infer Y> ? Y : null;

interface UseDispatchClientStorePropsWithoutPayload<
  X extends ActionWithoutPayload,
> {
  action: X;
  payload?: null;
}

interface UseDispatchClientStorePropsWithPayload<
  X extends ActionWithPayload<Y>,
  Y,
> {
  action: X;
  payload: Y;
}

type UseDispatchClientStoreProps<X, Y> = X extends ActionWithoutPayload
  ? UseDispatchClientStorePropsWithoutPayload<X>
  : X extends ActionWithPayload<Y>
    ? UseDispatchClientStorePropsWithPayload<X, Y>
    : never;

export default function useDispatchClientStore<
  X extends ActionWithoutPayload | ActionWithPayload<Y>,
  Y = HasPayload<X>,
>({ action, payload }: UseDispatchClientStoreProps<X, Y>) {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (payload !== undefined && payload !== null) {
      dispatch(action(payload));
    } else {
      dispatch((action as ActionWithoutPayload)());
    }

    setIsMounted(true);
  }, [dispatch, action, payload]);

  if (!isMounted) return null;

  return null;
}
