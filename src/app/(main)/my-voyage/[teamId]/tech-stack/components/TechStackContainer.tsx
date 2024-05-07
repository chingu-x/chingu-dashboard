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
    <div className="card bg-secondary-content p-10 w-full">
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
