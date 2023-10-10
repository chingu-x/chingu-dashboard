"use client";

import { useAppDispatch } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";

export default function TempModalControls() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col p-6 gap-y-4">
      <button
        type="button"
        onClick={() => dispatch(onOpen({ type: "example1" }))}
        className="border-none btn bg-primary"
      >
        Modal 1
      </button>
      <button
        type="button"
        onClick={() => dispatch(onOpen({ type: "example2" }))}
        className="border-none btn bg-primary"
      >
        Modal 2
      </button>
    </div>
  );
}
