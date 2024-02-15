"use client";

import { useAppDispatch } from "@/store/hooks";
import Button from "@/components/Button";
import { onOpen } from "@/store/features/modal/modalSlice";

export default function TempModalControls() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col p-6 gap-y-4">
      <Button
        size="lg"
        type="button"
        onClick={() => dispatch(onOpen({ type: "example1", content: "error" }))}
      >
        Modal 1
      </Button>
      <Button
        size="lg"
        type="button"
        onClick={() =>
          dispatch(onOpen({ type: "example2", content: "example" }))
        }
      >
        Modal 2
      </Button>
    </div>
  );
}
