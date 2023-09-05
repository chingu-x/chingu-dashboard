import { VoteDescriptionCard } from ".";

function CreateIdeationContainer() {
  return (
    <div className="card w-[1280px] h-[190px] bg-base-100 text-neutral-content flex flex-row items-center">
      <div className="card-body items-center text-center">
        <VoteDescriptionCard />
      </div>
    </div>
  );
}

export default CreateIdeationContainer;
