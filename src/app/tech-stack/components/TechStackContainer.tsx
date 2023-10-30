import TechStackCard from "./TechStackCard";
import { getTechStack } from "@/api/routes";

export const currentUser = {
  id: "e7a6262d-c596-44ac-9a50-373bcff1e155",
  teamId: 5,
};

export default async function TechStackContainer() {
  // Get data on the server
  const data = await getTechStack(currentUser.teamId);

  return (
    <div className="card bg-secondary-content p-10 w-full">
      <ul className="grid grid-cols-2 min-[1920px]:grid-cols-3 gap-10 place-items-center">
        {data.map((techObject) => (
          <li key={techObject.name}>
            <TechStackCard
              title={techObject.name}
              data={techObject.teamTechStackItems}
              id={techObject.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
