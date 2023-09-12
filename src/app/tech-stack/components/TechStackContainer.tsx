import { techStack } from "./fixtures/TechStack";
import styles from "./TechStackContainer.module.css";
import { TechStackCard } from ".";

export default function TechStackContainer() {
  function getJustifyClass(index: number) {
    if (index % 3 === 0) {
      return "justify-self-start";
    } else if (index % 3 === 1) {
      return "justify-self-center";
    } else {
      return "justify-self-end";
    }
  }
  return (
    <div
      className={`card bg-primary-content p-10 ${styles["tech-container-width"]}`}
    >
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-20 justify-items-stretch">
        {Object.keys(techStack).map((cardType, index) => (
          <li
            key={cardType}
            className={`mx-auto xl:mx-0 ${getJustifyClass(index)}`}
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
