import { techStack } from "./fixtures/TechStack";
import styles from "./TechStackContainer.module.css";
import { TechStackCard } from ".";

export default function TechStackContainer() {
  return (
    <div
      className={`card bg-primary-content p-10 ${styles["tech-container-width"]}`}
    >
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-20 justify-items-stretch">
        {Object.keys(techStack).map((cardType, index) => (
          <li
            key={cardType}
            className={`mx-auto xl:mx-0 ${
              index % 3 === 0
                ? "justify-self-start"
                : index % 3 === 1
                ? "justify-self-center" // eslint-disable-line
                : "justify-self-end" // eslint-disable-line
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
