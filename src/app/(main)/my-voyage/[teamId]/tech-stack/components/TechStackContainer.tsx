"use client";

import Link from "next/link";
import TechStackCard from "./TechStackCard";
import Button from "@/components/Button";
import type { TechStackData } from "@/store/features/techStack/techStackSlice";
import routePaths from "@/utils/routePaths";
import { useParams } from "next/navigation";

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

  return (
    <div className="w-full">
      <div className="mb-10 grid grid-cols-2 place-items-center min-[1920px]:grid-cols-3">
        <div className="col-start-2 flex min-w-[420px] flex-row-reverse sm:w-96 min-[1920px]:col-start-3">
          <Link href={routePaths.finalizeTechStackPage(teamId)}>
            <Button variant="secondary">Finalize Selection</Button>
          </Link>
        </div>
      </div>
      <ul className="grid grid-cols-2 place-items-center gap-y-10 min-[1920px]:grid-cols-3">
        {techCardData.map((item) => (
          <li key={item.id}>
            <TechStackCard title={item.title} data={item.techItems} />
          </li>
        ))}
      </ul>
    </div>
  );
}
