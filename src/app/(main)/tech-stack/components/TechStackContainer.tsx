import TechStackCard from "./TechStackCard";
import { getTechStack } from "@/api/techStackService/techStackService";

export const currentUser = {
  id: "3eca1a73-01aa-448c-8410-dce17ff08938",
  teamId: 17,
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
