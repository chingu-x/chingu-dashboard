import { frontend } from "./fixtures/TechStackCard";

export default function TechStackCard() {
  return (
    <div className="card w-96 text-primary-content bg-neutral-50 rounded-lg">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-semibold text-neutral-900 mt-5 ml-5">
          Frontend
        </h2>
        <button type="button" className="btn mt-5 mr-5">
          Edit
        </button>
      </div>
      <div className="h-40 overflow-y-auto ml-5 mr-5 mt-6 mb-5">
        <ul className="text-neutral-900">
          {frontend.map(element => 
            <li className="text-base mb-5" key={element}>{element}</li>
            )}
        </ul>
      </div>
    </div>
  );
}
