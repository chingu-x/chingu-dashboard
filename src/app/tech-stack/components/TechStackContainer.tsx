import { TechStackCard, techStack } from ".";

export default function TechStackContainer() {
  return (
    <div className="card bg-secondary-content p-10 max-w-[1353px]">
      <ul className="grid grid-cols-2 min-[1920px]:grid-cols-3 gap-10 place-items-center">
        {Object.keys(techStack).map((cardType) => (
          <li key={cardType}>
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
