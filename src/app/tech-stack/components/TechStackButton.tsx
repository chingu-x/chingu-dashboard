"use client";

import { useMemo } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { TeamTechStackItems } from "./types/types";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";
import { setCurrentStackId, setTechNames } from "@/store/features/techStack/techStackSlice";

interface TechStackButtonProps {
  title: string;
  id: number;
  data: TeamTechStackItems[];
}

export default function TechStackButton({ title, id, data }: TechStackButtonProps) {
  const dispatch = useAppDispatch();

  const techNamesArray = useMemo(() => data.map((item) => item.name), [data]);

  const onClick = () => {
    dispatch(onOpen({ type: "TechStackModal" }));
    dispatch(setCurrentStackId(id));
    dispatch(setTechNames(techNamesArray));
  };

  return (
    <Button
      title={`add ${title}`}
      customClassName="mt-6 capitalize w-full h-[42px] p-0 min-h-full text-xs font-medium text-base-300 bg-secondary border-transparent flex justify-start pl-5 items-center hover:bg-secondary hover:border-transparent"
      onClick={onClick}
    >
      <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
      Add Tech Stack
    </Button>
  );
}
