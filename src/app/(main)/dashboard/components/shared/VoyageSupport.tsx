"use client";

import React from "react";
import { Button } from "@chingu-x/components/button";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

function VoyageSupport() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-y-4 rounded-2xl border-2 border-base-100 bg-base-200 p-6">
      <p className="text-center text-base font-medium">
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
