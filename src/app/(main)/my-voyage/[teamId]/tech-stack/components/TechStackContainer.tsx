import Button from "@/components/Button";
import TechStackCard from "./TechStackCard";
import { TechStackData } from "@/store/features/techStack/techStackSlice";

interface TechStackContainerProps {
  data: TechStackData[];
}

export default function TechStackContainer({ data }: TechStackContainerProps) {
  const techCardData = data.map((item) => {
    return { title: item.name, techItems: item.teamTechStackItems };
  });

  return (
    <div className="card p-10 w-full">
      <div className="w-full flex justify-end mb-10">
        <Button variant="secondary">Finalize Selection</Button>
      </div>
      <ul className="grid grid-cols-2 min-[1920px]:grid-cols-3 gap-10 place-items-center">
        {techCardData.map((item, index) => (
          <li key={index}>
            <TechStackCard title={item.title} data={item.techItems} />
          </li>
        ))}
      </ul>
    </div>
  );
}
