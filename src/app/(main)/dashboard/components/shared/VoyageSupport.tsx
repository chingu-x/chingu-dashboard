import React from "react";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

function VoyageSupport() {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-base-200 rounded-2xl p-6 flex flex-col gap-y-4">
      <p className="text-center font-medium	text-base">
        Need support? Let’s get you back on track!
      </p>
      <Button
        className="self-center text-base font-semibold"
        variant="outline"
        onClick={() => dispatch(onOpenModal({ type: "gettingHelp" }))}
      >
        Get Help
      </Button>
    </div>
  );
}

export default VoyageSupport;
