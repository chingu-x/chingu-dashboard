"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import TechStackCard from "./TechStackCard";
import FinalizedTechStackCard from "./FinalizedTechStackCard";
import Button from "@/components/Button";
import type { TechStackData } from "@/store/features/techStack/techStackSlice";
import routePaths from "@/utils/routePaths";
import { getSelectedTechItems } from "../finalize/utils/getSelectedTechItems";

interface TechStackContainerProps {
  data: TechStackData[];
}

export default function TechStackContainer({ data }: TechStackContainerProps) {
  const { teamId } = useParams<{ teamId: string }>();

  const techCardData = data.map((item) => ({
    id: item.id,
    title: item.name,
    techItems: item.teamTechStackItems,
  }));

  const selectedTechItems = getSelectedTechItems(techCardData);
  const isFinalized = selectedTechItems.length > 0;

  return (
    <div className="w-full">
      <div className="mb-10 grid grid-cols-2 place-items-center min-[1920px]:grid-cols-3">
        <div className="col-start-2 flex min-w-[420px] flex-row-reverse sm:w-96 min-[1920px]:col-start-3">
          <Link href={routePaths.finalizeTechStackPage(teamId)}>
            <Button variant="secondary">
              {isFinalized ? "Edit Final Selection" : "Finalize Selection"}
            </Button>
          </Link>
        </div>
      </div>
      <ul className="grid grid-cols-2 place-items-center gap-y-10 min-[1920px]:grid-cols-3">
        {!isFinalized &&
          techCardData.map((item) => (
            <li key={item.id}>
              <TechStackCard title={item.title} data={item.techItems} />
            </li>
          ))}

        {isFinalized &&
          selectedTechItems.map((item) => (
            <FinalizedTechStackCard title={item.title} data={item} />
          ))}
      </ul>
    </div>
  );
}
