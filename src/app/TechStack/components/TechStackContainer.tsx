import { techStack } from "./fixtures/TechStack";
import { TechStackCard } from ".";

export default function TechStackContainer() {
  return (
    <div className="card max-w-tech-card-container bg-primary p-10">
      <ul className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-y-20">
        {Object.keys(techStack).map((cardType) => (
          <li className="mx-auto xl:mx-none" key={cardType}>
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
