import { useEffect, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/store/hooks";

type ActionWithoutPayload = () => AnyAction;
type ActionWithPayload<T> = (
  payload: T
) => AnyAction | { payload: T; type: string };

interface UseDispatchClientStorePropsWithoutPayload<
  X extends ActionWithoutPayload,
> {
  action: X;
}

interface UseDispatchClientStorePropsWithPayload<
  X extends ActionWithPayload<Y>,
  Y,
> {
  action: X;
  payload: Y;
}

type UseDispatchClientStoreProps<
  X extends ActionWithoutPayload | ActionWithPayload<Y>,
  Y,
> = X extends ActionWithPayload<Y>
  ? UseDispatchClientStorePropsWithPayload<X, Y>
  : UseDispatchClientStorePropsWithoutPayload<X>;

export default function useDispatchClientStore<
  X extends ActionWithoutPayload | ActionWithPayload<Y>,
  Y = null,
>({ action, payload }: UseDispatchClientStoreProps<X, Y>) {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (payload !== undefined) {
      dispatch(action(payload));
    } else {
      dispatch((action as ActionWithoutPayload)());
    }

    setIsMounted(true);
  }, [dispatch, action, payload]);

  if (!isMounted) return null;

  return null;
}
