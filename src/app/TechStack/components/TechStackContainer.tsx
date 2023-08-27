import { cards } from "./fixtures/TechStack";
import { TechStackCard } from ".";

export default function TechStackContainer() {
  return (
    <div className="card w-tech-card-container bg-primary p-10">
      <ul className="grid grid-cols-3 gap-y-20">
        {cards.map((element) => (
          <li className="mx-auto" key={element}>
            <TechStackCard title={element} />
          </li>
        ))}
      </ul>
    </div>
  );
}
