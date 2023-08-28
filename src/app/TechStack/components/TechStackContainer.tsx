import { techStack } from "./fixtures/TechStack";
import { TechStackCard } from ".";

export default function TechStackContainer() {
  return (
    <div className="card max-w-tech-card-container bg-primary-100 p-10">
      <ul className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-y-20 justify-items-stretch">
        {Object.keys(techStack).map((cardType, index) => (
          <li
            key={cardType}
            className={`mx-auto xl:mx-0 ${
              index % 3 === 0
                ? "justify-self-start"
                : index % 3 === 1
                  ? "justify-self-center"
                  : "justify-self-end"
            }`}
          >
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
