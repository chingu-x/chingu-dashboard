import { techStack } from "./fixtures/TechStack";
import { TechStackCard } from ".";

export default function TechStackContainer() {
  return (
    <div className="card w-tech-card-container bg-primary p-10">
      <ul className="grid grid-cols-3 gap-y-20">
        {Object.keys(techStack).map((cardType) => (
          <li className="mx-auto" key={cardType}>
            <TechStackCard
              title={cardType}
              data={techStack[cardType as keyof typeof techStack]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
