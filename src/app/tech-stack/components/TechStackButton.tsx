"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";

interface TechStackButtonProps {
  title: string;
}

export default function TechStackButton({ title }: TechStackButtonProps) {
  const dispatch = useAppDispatch();

  return (
    <Button
      title={`add ${title}`}
      customClassName="mt-6 capitalize w-full h-[42px] p-0 min-h-full text-xs font-medium text-base-300 bg-secondary border-transparent flex justify-start pl-5 items-center hover:bg-secondary hover:border-transparent"
      onClick={() => dispatch(onOpen({ type: "TechStackModal" }))}
    >
      <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
      Add Tech Stack
    </Button>
  );
}
