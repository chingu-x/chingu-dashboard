import TechStackCard from "./TechStackCard";
import Button from "@/components/Button";
import type { TechStackData } from "@/store/features/techStack/techStackSlice";

interface TechStackContainerProps {
  data: TechStackData[];
}

export default function TechStackContainer({ data }: TechStackContainerProps) {
  const techCardData = data.map((item) => ({
    id: item.id,
    title: item.name,
    techItems: item.teamTechStackItems,
  }));

  return (
    <div className="w-full p-10">
      <div className="mb-10 grid grid-cols-2 place-items-center min-[1920px]:grid-cols-3">
        <div className="col-start-2 flex min-w-[420px] flex-row-reverse sm:w-96 min-[1920px]:col-start-3">
          <Button variant="secondary">Finalize Selection</Button>
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
