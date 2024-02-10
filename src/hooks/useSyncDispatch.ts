import { useEffect } from "react";
import { ActionCreatorWithoutPayload, AnyAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/store/hooks";

type ActionWithoutPayload = () => AnyAction;
type ActionWithPayload<T> = (
  payload: T,
) => AnyAction | { payload: T; type: string };

type HasPayload<X> = X extends ActionWithPayload<infer Y> ? Y : null;

type UseSyncDispatchPropsWithoutPayload<X extends ActionWithoutPayload> = {
  action: X;
  payload?: null;
  loadAction?: ActionCreatorWithoutPayload;
};

type UseSyncDispatchPropsWithPayload<X extends ActionWithPayload<Y>, Y> = {
  action: X;
  payload: Y;
  loadAction?: ActionCreatorWithoutPayload;
};

type UseSyncDispatchProps<X, Y> = X extends ActionWithoutPayload
  ? UseSyncDispatchPropsWithoutPayload<X>
  : X extends ActionWithPayload<Y>
    ? UseSyncDispatchPropsWithPayload<X, Y>
    : never;

export default function useSyncDispatch<
  X extends ActionWithoutPayload | ActionWithPayload<Y>,
  Y = HasPayload<X>,
>({ action, payload, loadAction }: UseSyncDispatchProps<X, Y>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (payload !== undefined && payload !== null) {
      dispatch(action(payload));

      if (loadAction) {
        dispatch(loadAction());
      }
    } else {
      dispatch((action as ActionWithoutPayload)());
    }
  }, [dispatch, action, payload, loadAction]);

  return null;
}
