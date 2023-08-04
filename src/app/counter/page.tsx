// test, remove later

"use client";

import {
  selectCount,
  useAppDispatch,
  useAppSelector,
  increment,
  decrement,
} from "@/store";

function CounterPage() {
  const counter = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const { value } = counter;

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex my-4 space-x-2">
        <button className="btn btn-primary w-1/2" onClick={handleIncrement}>
          +
        </button>
        <button className="btn btn-primary w-1/2" onClick={handleDecrement}>
          -
        </button>
      </div>
      {value}
    </div>
  );
}

export default CounterPage;
