// test, remove later

"use client";

import {
  decrement,
  increment,
  selectCount,
  useAppDispatch,
  useAppSelector,
} from "@/store";

function CounterPage() {
  const counter = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  function incrementClick() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex my-4 space-x-2">
        <button
          type="button"
          className="btn btn-primary w-1/2"
          onClick={incrementClick}
        >
          +
        </button>
        <button
          type="button"
          className="btn btn-secondary w-1/2"
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
      {counter.value}
    </div>
  );
}

export default CounterPage;
